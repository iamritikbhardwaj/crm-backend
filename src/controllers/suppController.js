import asyncHandler from "express-async-handler";
import { supModel } from "../models/supModel.js";
import { v4 as uuidv4 } from "uuid";

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
    const id = req?.params?.id;
    console.log(id, 'id');
    try {
         const supp = await supModel.destroy({
              where: {
                supplier_id: id
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
    const { name, status, destination_id } = suppData;
    const id = req?.query?.id
    console.log(id, 'suppData');
    
    try {
        if(req.query.hasOwnProperty('id')) {
        console.log('update supp')
        const supp = await supModel.update(suppData, {
            where: {
                supplier_id: id
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
        console.log('create supp')
        const supp = await supModel.create({supplier_id: uuidv4(), name: name, status: status, destination_id: destination_id});
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