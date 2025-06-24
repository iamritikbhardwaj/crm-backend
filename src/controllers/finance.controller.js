import asyncHandler from "express-async-handler";

import { agentLedgerModel, cancellationModel, refundModel } from "../models/finance.models.js";

export const getAllCancellations = asyncHandler(async (req, res) => {
    try {
        const cancellations = await cancellationModel.findAll();
        if (cancellations) {
            res.status(200).json({
                STATUS: "SUCCESS",
                MESSAGE: "Cancellations fetched successfully",
                OUTPUT: cancellations,
            });
        } else {
            res.status(404).json({
                STATUS: "FAIL",
                MESSAGE: "Error fetching cancellations",
                OUTPUT: null,
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            STATUS: "FAIL",
            MESSAGE: "Error fetching cancellations",
            OUTPUT: null,
        });
    }
});

export const cancelBooking = asyncHandler(async (req, res) => {
    try {
        const cancellation = await cancellationModel.create(req.body, {
            where: { booking_id: req.params.id },
        });
        if (cancellation) {
            res.status(200).json({
                STATUS: "SUCCESS",
                MESSAGE: "Cancellation created successfully",
                OUTPUT: cancellation,
            })
        } else {
            res.status(400).json({
                STATUS: "FAIL",
                MESSAGE: "Error creating cancellation",
                OUTPUT: null,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            STATUS: "FAIL",
            MESSAGE: "Error creating cancellation",
            OUTPUT: null,
        });
    }
});

export const getAllRefunds = asyncHandler(async (req, res) => {
    try {
        const refunds = await refundModel.findAll();
        if (refunds) {
            res.status(200).json({
                STATUS: "SUCCESS",
                MESSAGE: "Refunds fetched successfully",
                OUTPUT: refunds,
            });
        } else {
            res.status(404).json({
                STATUS: "FAIL",
                MESSAGE: "Error fetching refunds",
                OUTPUT: null,
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            STATUS: "FAIL",
            MESSAGE: "Error fetching refunds",
            OUTPUT: null,
        });
    }
});

export const createRefund = asyncHandler(async (req, res) => {
    try {
        const refund = await refundModel.create(req.body, {
            where: { booking_id: req.params.id },
        });
        if (refund) {
            res.status(200).json({
                STATUS: "SUCCESS",
                MESSAGE: "Refund created successfully",
                OUTPUT: refund,
            })
        } else {
            res.status(400).json({
                STATUS: "FAIL",
                MESSAGE: "Error creating refund",
                OUTPUT: null,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            STATUS: "FAIL",
            MESSAGE: "Error creating refund",
            OUTPUT: null,
        });
    }
});