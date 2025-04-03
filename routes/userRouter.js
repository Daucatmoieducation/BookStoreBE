import express from 'express'
import userController from '../controller/userController.js';
import userMiddleware from '../middleware/userMiddleware.js';

const userRouter = express.Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/infor', userMiddleware.verifyToken, userController.getUserById)
userRouter.post('/register', userMiddleware.checkValidUser, userController.register);
userRouter.post('/login', userController.login);
userRouter.put('/update-user', userController.updateUser)
userRouter.put('/:id', userMiddleware.verifyToken, userMiddleware.checkRole('Admin'), userController.updateUserById);
userRouter.delete('/:id', userMiddleware.verifyToken, userMiddleware.checkRole('Admin'), userController.delUser)

export default userRouter