import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const generateToken = asyncHandler(async (user) => {
    try {

        // Generate token (jwt.sign is synchronous, no callback needed)
        const token = jwt.sign(
            { id: user.id, name: user.name }, // Payload (you can customize this)
            process.env.JWT_SECRET,            // Secret key
            { expiresIn: '8h' }               // Token expiration time
        );

        return token; // Return the generated token

    } catch (error) {
        console.error('Error generating token:', error); // Log error for debugging
        throw new Error('Error generating token'); // Rethrow to let asyncHandler handle it
    }
});

export const verifyToken = asyncHandler( async(req, res, next) => {
    try {
        console.log(req.cookies.token);
        if(!req.cookies.token) {
            return res.status(401).json({
                STATUS: 'FAIL',
                MESSAGE: 'Unauthorized',
                OUTPUT: null
            })
        }
        const user = await jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        if(!user) {
            return res.status(401).json({
                STATUS: 'FAIL',
                MESSAGE: 'Unauthorized',
                OUTPUT: null
            });
        }else {
            next();
        }
    } catch (error) {
        console.log(error);
        return null;
     }
});