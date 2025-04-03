import dotenv from "dotenv";
import userModel from "../model/user.schema.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

dotenv.config();


const userController = {
    getUsers: async (req, res) => {
        try {
            const listUser = await userModel.find({ status: "Active" });
            res.status(200).send(listUser);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },

    register: async (req, res) => {
        try {
            const { email, password, username, phone } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 10);
            const saveuser = await userModel.create({
                username,
                email,
                phone,
                password: hashedPassword,
            })
            res.status(201).send(saveuser)
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
    
            // Check if user exists
            if (!user) {
                throw new Error('Email or password is invalid!');
            }
    
            // Compare passwords
            const compare = bcrypt.compareSync(password, user.password);
            if (!compare) {
                throw new Error('Email or password is invalid!');
            }
    
            // Generate JWT token
            const token = jwt.sign(
                {
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                },
                process.env.SECRETKEY,
                { expiresIn: '1h' }
            );
    
            res.status(200).send({
                message: "Login successful",
                accessToken: token,
            });
        } catch (error) {
            res.status(400).send({
                message: error.message,
            });
        }
    },


    updateUser: async (req, res) => {
        const { email, userUpdates } = req.body;
        const updatedUser = await userModel.findOneAndUpdate(
            { email: email },
            userUpdates,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).send({ message: "Người dùng không tìm thấy" });
        }
        res.status(200).send(updatedUser);
    },

    updateUserById: async (req, res) => {
        let user = req.body;
        let userId = req.params.id;
        let rs = await userModel.findByIdAndUpdate(
            { _id: userId },
            user,
            { new: true }
        )
        res.status(200).send(rs)
    },


    getUserById: async (req, res) => {
        const userId = req.user.userId;
        const user = await userModel.findById(userId);
        res.status(200).send(user)
    },

    delUser: async (req, res) => {
        try {
            let userId = req.params.id;
            let rs = await userModel.findByIdAndUpdate(
                { _id: userId },
                { status: "Inactive" },
                { new: true }
            );
            if (!rs) {
                return res.status(404).send({ message: "User not found" });
            }
            res.status(200).send(rs);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },

}

export default userController;