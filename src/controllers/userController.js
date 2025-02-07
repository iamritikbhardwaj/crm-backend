import asyncHandler from "express-async-handler"
import { userModel } from "../models/userModel.js";
import { generateToken } from "../middlewares/auth.js";
import { v4 as uuidv4 } from "uuid";

export const handleUserLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({
        where: {
            email: email
        }
    })
    if(!user) {
        res.status(201).json({
            STATUS: 'FAIL',
            MESSAGE: 'User not found',
            OUTPUT: null
        });
    } else {
       if(user.password === password) {
        const token = await generateToken(user.dataValues); // to create a jwt token
        const options = {
            maxAge: 8 * 60 * 60 * 1000,
            sameSite: 'Strict'
        }
        res.status(200).cookie('token', token, user, options).json({
            STATUS: 'SUCCESS',
            MESSAGE: 'User logged in successfully',
            OUTPUT: user
        });
    } else {
        res.status(201).json({
            STATUS: 'FAIL',
            MESSAGE: 'Invalid password',
            OUTPUT: null
        });
    }
    }
})

export const createUser = asyncHandler(async (req, res) => {
    const { userName: name, email, password, phoneNumber: phone, profile, status} = req.body;
    console.log(name, 'userData');
    const userData = {name, phone, profile, email, password, status};
    const id = req.query;
    try {if(req.query.hasOwnProperty('id')) {
        console.log('update user')
        const resp = await userModel.update(
            userData, {
            where: id
        })
        if(resp) {
            res.status(200).json({
                STATUS: 'SUCCESS',
                MESSAGE: 'User updated successfully',
                OUTPUT: resp
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } else {
        console.log("creatingUser");
        const user = await userModel.create({id: uuidv4(), name: name, email: email, password: password, phone: phone, profile: profile, status: status});
        console.log(user, 'user');
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
    }} catch (error) {
        if (error.name === "SequelizeValidationError") {
          console.error("Validation Error:", error.errors);
        } else {
          console.error("Unexpected Error:", error.errors);
          
        }
        res.status(201).json({
            STATUS: "FAIL",
            MESSAGE: "Error creating user",
            OUTPUT: error
          })
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