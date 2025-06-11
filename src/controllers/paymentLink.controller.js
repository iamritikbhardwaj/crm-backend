import asyncHandler from "express-async-handler";
import payLinkModel from "../models/payLink.model.js";
import { v4 as uuidv4 } from "uuid";

export const getAllPayLinks = asyncHandler(async (req, res) => {
     console.log(req.body, req.query, 'getAllPayLink');
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

export const createPayLink = asyncHandler(async (req, res ) => {
    const tripId = req.query.tripId
    const agentId = req.body.agent_name.split(" ")[0];
    const name = req.body.agent_name.split(" ").slice(1).join(" ");  
    const { commision } = req.body;
    try {
        const paylink = await payLinkModel.create({
            agent_name: name,
            link_id: uuidv4(),
            source: parseFloat(commision) === 1.5 ? "flyremit" : "stripe",
            agent_id: agentId,
            tripId: tripId,
            link: req.paymentLink,
            ...req.body
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
                METHOD: "stripe",
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