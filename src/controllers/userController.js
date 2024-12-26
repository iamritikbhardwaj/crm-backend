import asyncHandler from "express-async-handler"
import { userModel } from "../models/userModel.js";

export const createUser = asyncHandler(async (req, res) => {
    const userData = req.body;
    console.log(userData, 'userData');
    const user = null;
    if(req.params.id) {
        log('update user')
        user = await userModel.update(userData, {
            where: {
                id: userData.id
            }
        })
    } else {
        user = await userModel.create(userData);
    if (!user) {
        res.status(400);
        throw new Error('Invalid user data');
    } else {
        console.log(user);
        res.status(200).json({
            STATUS: 'SUCCESS',
            MESSAGE: 'User created successfully',
            OUTPUT: user
        });
    }
    }
});

export const getAllUsers = asyncHandler(async (req, res) => {
    console.log('getAllUsers');
    const users = await userModel.findAll();
    res.status(200).json({
        STATUS: 'SUCCESS',
        MESSAGE: 'Users fetched successfully',
        OUTPUT: users
    });
});

export const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    console.log(userId, 'userId');
    const user = await userModel.destroy({
        where: {
            id: userId
        }
    });
    res.status(200).json({
        STATUS: 'SUCCESS',
        MESSAGE: 'User deleted successfully',
        OUTPUT: user
    });
});

export const login = asyncHandler(async (req, res) => {
    const userData = req.body;
    console.log(userData, 'userData');
    const user = await userModel.findOne({
        where: {
            email: userData.email
        }
    });
    if(user) {
        if(user.password === userData.password) {
            res.status(200).json({
                STATUS: 'SUCCESS',
                MESSAGE: 'User logged in successfully',
                OUTPUT: user
            });
        } else {
            res.status(400).json({
                STATUS: 'FAIL',
                MESSAGE: 'Invalid password',
                OUTPUT: null
            });
        }
    } else {
        res.status(400).json({
            STATUS: 'FAIL',
            MESSAGE: 'User not found',
            OUTPUT: null
        });
    }
});