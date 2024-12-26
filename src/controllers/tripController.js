import { asyncHandler } from "express-async-handler";
import { tripModel } from "../models/tripModel.js";

export const getAllTrip = asyncHandler(async (req, res) => {
    console.log('getAllTrip');
   try { 
    const trip = await tripModel.findAll();
    console.log(trip, 'trip');
    res.status(200).json({
        STATUS: 'SUCCESS',
        MESSAGE: 'Trips fetched successfully',
        OUTPUT: trip
    });}
    catch (error) {
        console.log(error);
        res.status(500).json({
            STATUS: 'FAIL',
            MESSAGE: error.message,
            OUTPUT: null
        });
    }
})

export const createTrip = asyncHandler(async (req, res) => {
    const tripData = req.body;
    const id = req?.params?.id
    console.log(tripData, 'tripData');
    try {
        if(id) {
            log('update trip')
            const trip = await tripModel.update(tripData, {
                where: {
                    id: id
                }
            })
            if(!trip) {
                res.status(400);
                throw new Error('Invalid trip data');
            } else {
                res.status(200).json({
                    STATUS: 'SUCCESS',
                    MESSAGE: 'Trip updated successfully',
                    OUTPUT: trip
                });
            }
        }
        else {
            const trip = await tripModel.create(tripData);
        if (!trip) {
            res.status(400);
            throw new Error('Invalid trip data');
        } else {
            res.status(200).json({
                STATUS: 'SUCCESS',
                MESSAGE: 'Trip created successfully',
                OUTPUT: trip
            });
        }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            STATUS: 'FAIL',
            MESSAGE: error.message,
            OUTPUT: null
        });
    }
})