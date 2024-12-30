import asyncHandler from "express-async-handler";
import { supModel } from "../models/supModel.js";

export const getAllSupp = asyncHandler(async (req, res) => {
    console.log('getAllSupp');
   try { const supp = await supModel.findAll();
    console.log(supp, 'supp');
    res.status(200).json({
        STATUS: 'SUCCESS',
        MESSAGE: 'Suppliers fetched successfully',
        OUTPUT: supp
    });}
    catch (error) {
        console.log(error);
        res.status(500).json({
            STATUS: 'FAIL',
            MESSAGE: 'Error fetching suppliers',
            OUTPUT: null
        });
    }
});

export const deleteSupp = asyncHandler(async (req, res) => {
    const id = req?.query?.id;
    console.log(id, 'id');
    try {
         const supp = await supModel.destroy({
              where: {
                   id: id
              }
         });
         res.status(200).json({
              STATUS: 'SUCCESS',
              MESSAGE: 'Supplier deleted successfully',
              OUTPUT: supp
         });
    } catch (error) {
         console.log(error);
         res.status(500).json({
              STATUS: 'FAIL',
              MESSAGE: 'Error deleting supplier',
              OUTPUT: null
         });
    }
});

export const createSupp = asyncHandler(async (req, res) => {
    const suppData = req.body;
    const id = req?.query?.id
    console.log(suppData, 'suppData');
    
    try {
        if(req.query.hasOwnProperty('id')) {
        log('update supp')
        const supp = await supModel.update(suppData, {
            where: {
                id: id
            }
        })
        if(!supp) {
            res.status(400);
            throw new Error('Invalid supplier data');
        } else {
            res.status(200).json({
                STATUS: 'SUCCESS',
                MESSAGE: 'Supplier updated successfully',
                OUTPUT: supp
            });
        }
    }else {
        const supp = await supModel.create(suppData);
    if (!supp) {
        res.status(400);
        throw new Error('Invalid supplier data');
    } else {
        res.status(200).json({
            STATUS: 'SUCCESS',
            MESSAGE: 'Supplier created successfully',
            OUTPUT: supp
        });
    }
    }
} 
catch (error) {
        console.log(error);
        res.status(500).json({
            STATUS: 'FAIL',
            MESSAGE: 'Error creating supplier',
            OUTPUT: null
        });
    }
});