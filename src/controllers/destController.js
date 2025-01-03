import asyncHandler from "express-async-handler";
import { destModel } from "../models/destModel.js";
import { v4 as uuidv4 } from "uuid";

export const getAllDest = asyncHandler(async (req, res) => {
    console.log('getAllDest');
   try { const dest = await destModel.findAll();
    console.log(dest, 'dest');
    res.status(200).json({
        STATUS: 'SUCCESS',
        MESSAGE: 'Destinations fetched successfully',
        OUTPUT: dest
    });}
    catch (error) {
        console.log(error);
        res.status(500).json({
            STATUS: 'FAIL',
            MESSAGE: 'Error fetching destinations',
            OUTPUT: null
        });
    }
});

export const createDest = asyncHandler(async (req, res) => {
    const {destination, currency} = req.body;
    const id = req?.query?.id;
    console.log(destination, 'destData');
    
    try {
        if(req.query.hasOwnProperty('id')) {
        console.log('update dest', req.params)
        const dest = await destModel.update({destination: destination, currency: currency}, {
            where: {
                destination_id: id
            }
        })
        if(!dest) {
            res.status(400);
            throw new Error('Invalid destination data');
        } else {
            res.status(200).json({
                STATUS: 'SUCCESS',
                MESSAGE: 'Destination updated successfully',
                OUTPUT: dest
            });
        }
    }else {
        console.log('create dest')
        const dest = await destModel.create({destination_id: uuidv4(), destination: destination, currency: currency});
    if (!dest) {
        res.status(400);
        throw new Error('Invalid destination data');
    } else {
        res.status(200).json({
            STATUS: 'SUCCESS',
            MESSAGE: 'Destination created successfully',
            OUTPUT: dest
        });
    }}}
    catch (error) {
        console.log(error);
        res.status(500).json({
            STATUS: 'FAIL',
            MESSAGE: 'Error creating destination',
            OUTPUT: null
        });
    }
});

export const deleteDest = asyncHandler(async (req, res) => {
    const id = req?.params?.id;
    console.log(id, 'id');
    try {
        const dest = await destModel.destroy({
        where: {
            destination_id: id
        }
    });
    res.status(200).json({
        STATUS: 'SUCCESS',
        MESSAGE: 'Destination deleted successfully',
        OUTPUT: dest
    });} catch (error) {
        console.log(error);
        res.status(500).json({
            STATUS: 'FAIL',
            MESSAGE: 'Error deleting destination',
            OUTPUT: null
        });
    }
});