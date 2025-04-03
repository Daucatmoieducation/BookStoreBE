import userModel from '../model/user.schema.js';
import jwt from 'jsonwebtoken'

const userMiddleware = {
    checkValidUser: async (req, res, next) => {
        const { email } = req.body;
        const existEmail = await userModel.findOne({ email })
        if (existEmail) {
            return res.status(400).send("Email đã tồn tại!")
        }
        else {
            next()
        }
    },
    verifyToken: async (req, res, next) => {
        try {
            const auth = req.headers['authorization'];
            if (!auth || !auth.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Access token is missing or invalid' });
            }

            const token = auth.split(' ')[1];
            jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Access token is invalid' });
                }

                req.user = decoded; // Đưa user vào request để các middleware sau sử dụng
                next();
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error when verifying token' });
        }
    },


    checkRole: (role) => (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
    }
}

export default userMiddleware;