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
                    _id: user._id, // Use _id instead of userId
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
        try{
            const { id } = req.params;
            const updatedData = req.body;
            const updateUser = await userModel.findByIdAndUpdate(
                id,
                updatedData,
                { new: true }
            );
            if (!updateUser) {
                return res.status(404).send({ message: "User not found" });
            }
            res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
        }
        
        
        catch (error) {
            res.status(500).json({ message: 'Error updating book', error: error.message });
        }
    },


    getUserById: async (req, res) => {
        try {
            const userId = req.user._id; // Use _id from the token payload
            const user = await userModel.findById(userId);
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },

    delUser: async (req, res) => {
        try {
            let userId = req.params.id;
            let rs = await userModel.findByIdAndUpdate(
                userId,
                {
                    status: "Inactive",
                    username: null,
                    email: null,
                    phone: null,
                    password: null
                },
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