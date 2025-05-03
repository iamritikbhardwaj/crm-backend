import asyncHandler from "express-async-handler";
import payLinkModel from "../models/payLink.model.js";
import { v4 as uuidv4 } from "uuid";
import { link } from "fs";

export const getAllPayLinks = asyncHandler(async (req, res, paymentLink) => {
     console.log(req.body, req.query, paymentLink, 'getAllPayLink');
    try { const paylink = await payLinkModel.findAll({where: {
        tripId: req.query.tripId
    }});
     console.log(paylink, 'paylink');
     if (paylink) {
        res.status(200).json({
             STATUS: 'SUCCESS',
             MESSAGE: 'Paylinks fetched successfully',
             OUTPUT: paylink
        });
     } else {
        res.status(404).json({
            STATUS: 'FAILED',
            MESSAGE: 'Paylinks not fetched',
            OUTPUT: paylink
       });
     }}
     catch (error) {
          console.log(error);
          res.status(500).json({
                STATUS: 'FAIL',
                MESSAGE: 'Error fetching paylinks',
                OUTPUT: null
          });
     }
});

export const createPayLink = asyncHandler(async (req, res, paymentLink) => {
    // const {tripId} = req.body;
    console.log(req.body, req.query, paymentLink, 'createPayLink');
    try {
        const paylink = await payLinkModel.create({
            id: uuidv4(),
            Trips: tripId,
            link: paymentLink,
        });
        if (!paylink) {
            res.status(400).json({
                STATUS: "FAIL",
                MESSAGE: "Paylink storage failed",
                OUTPUT: paylink,
            });
        } else {
            res.status(200).json({
                STATUS: "SUCCESS",
                MESSAGE: "Paylink stored successfully",
                OUTPUT: paylink,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            STATUS: "FAIL",
            MESSAGE: "Error creating paylink",
            OUTPUT: null,
        });
    }
});