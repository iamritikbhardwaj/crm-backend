import asyncHandler from "express-async-handler";
import payLinkModel from "../models/payLink.model.js";
import { v4 as uuidv4 } from "uuid";
import flyremitModel from "../models/flyremitModel.js";

export const getAllPayLinks = asyncHandler(async (req, res) => {
    console.log(req.body, req.query, 'getAllPayLink');
    try {
        const paylink = await payLinkModel.findAll({
            where: {
                tripId: req.query.tripId
            }
        });
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
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            STATUS: 'FAIL',
            MESSAGE: 'Error fetching paylinks',
            OUTPUT: null
        });
    }
});

export const createPayLink = asyncHandler(async (req, res) => {
    const tripId = req.query.tripId
    const agentId = req.body.agent_name.split(" ")[0];
    const name = req.body.agent_name.split(" ").slice(1).join(" ");
    const { commision, amount } = req.body;
    console.log(req.body, tripId, agentId, name, 'createPayLink');
    try {
        const agent = await flyremitModel.findOne({
            where: {
                agent_id: agentId
            }
        })
        if (!agent) {
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
        } else {
            res.status(200).redirect(`https://v5agent.flyremit.com/Activitybeds/abagent/result?AgentId=${agentId}&BookingId=${tripId}&Amount=${amount}`);
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