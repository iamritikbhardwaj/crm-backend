import asyncHanler from "express-async-handler";
import { reconModel } from "../models/reconModel.js";
import { v4 as uuidv4 } from "uuid";

export const getAllRecon = asyncHanler(async (req, res) => {
     console.log('getAllRecon');
    try { const recon = await reconModel.findAll();
     console.log(recon, 'recon');
     if(recon) {
          res.status(200).json({
               STATUS: 'SUCCESS',
               MESSAGE: 'Recon fetched successfully',
               OUTPUT: recon
          });
     }else {
          res.status(400)
          .json({
               STATUS: 'FAIL',
               MESSAGE: 'Error fetching recon',
               OUTPUT: null
          });
     }
     }
     catch (error) {
          console.log(error);
          res.status(500).json({
                STATUS: 'FAIL',
                MESSAGE: 'Error fetching recon',
                OUTPUT: null
          });
     }
});

export const createRecon = asyncHanler(async (req, res) => {
     const reconData = req.body;
     const id = req.query;
     console.log(reconData, 'reconData');
     try {
          if(req.query.hasOwnProperty("id") && id !== undefined && id !== null) {
               console.log('update recon')
            const recon = await reconModel.update(reconData, {
                 where: {
                      recon_id: id
                 }
            })
            if(recon[0] === 0) {
                 res.status(400);
                 throw new Error('Invalid recon data');
            } else {
                 res.status(200).json({
                      STATUS: 'SUCCESS',
                      MESSAGE: 'Recon updated successfully',
                      OUTPUT: recon
                 });
            }
          } else {
            console.log('create recon')
            const recon = await reconModel.create({recon_id: uuidv4(), ...reconData});
          if(!recon) {
               res.status(400);
               throw new Error('Invalid recon data');
          } else {
               res.status(200).json({
                    STATUS: 'SUCCESS',
                    MESSAGE: 'Recon created successfully',
                    OUTPUT: recon
               });
          }}
     } catch (error) {
          console.log(error);
          res.status(500).json({
                STATUS: 'FAIL',
                MESSAGE: 'Error creating recon',
                OUTPUT: null
          });
     }
});

export const deleteRecon = asyncHanler(async (req, res) => {
     const id = req?.params?.id;
     console.log(id, 'id');
     try {
          const recon = await reconModel.destroy({
               where: {
                    recon_id: id
               }
          });
          console.log(recon, 'recon');
          if(recon[0] === 0)
          {
               res.status(404).json({
                    STATUS: 'FAIL',
                    MESSAGE: 'Recon not found',
                    OUTPUT: null
               });
          } else {
               res.status(200).json({
                    STATUS: 'SUCCESS',  
                    MESSAGE: 'Recon deleted successfully',
                    OUTPUT: recon
               });
          }
     } catch (error) {
          console.log(error);
          res.status(500).json({
               STATUS: 'FAIL',
               MESSAGE: 'Error deleting recon',
               OUTPUT: null
          });
     }
});
