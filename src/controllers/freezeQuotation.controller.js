import asyncHandler from "express-async-handler";
import {
  freezequotationModel,
  ActivityFreezeQuotationModel,
  HotelFreezeQuotationModel
} from "../models/freezequotation.model.js";
import { v4 as uuidv4 } from "uuid";

// Get all freeze quotations
export const getFreezeQuotations = asyncHandler(async (req, res) => {
  const freezequotations = await freezequotationModel.findAll({
    include: [
      { model: ActivityFreezeQuotationModel, as: "freezequotation_products" },
      { model: HotelFreezeQuotationModel, as: "freezequotation_hotels" }
    ],
    order: [["created_at", "DESC"]]
  });
  res.status(200).json(freezequotations);
});

// Get single freeze quotation with activities/hotels
export const getFreezeQuotationByTripId = asyncHandler(async (req, res) => {
  const id = req.params.tripId;
  const freezequotation = await freezequotationModel.findAll({
    where: { tripId: id },
    include: [
      { model: ActivityFreezeQuotationModel, as: "freezequotation_products" },
      { model: HotelFreezeQuotationModel, as: "freezequotation_hotels" }
    ]
  });

  if (!freezequotation) {
    res.status(404).json({ message: "Freeze quotation not found" });
    return;
  }

  res.status(200).json(freezequotation);
});

// Create a freeze quotation with activities
export const createFreezeQuotationActivities = asyncHandler(async (req, res) => {
  const body = req.body;
  const tripId = req.params.tripId;

  const freezequotation_id = uuidv4();
  const activity_freezequotation_id = uuidv4(); // Ensure child has its own unique ID

  try {
    const finalfq = await freezequotationModel.create({
      freezequotation_id,
      tripId,
      freezequotation_products: [
        {
          ...body,
          activity_freezequotation_id,
          freezequotation_id
        }
      ]
    }, {
      include: [
        { model: ActivityFreezeQuotationModel, as: "freezequotation_products" }
      ]
    });

    res.status(200).json({
      STATUS: "SUCCESS",
      MESSAGE: "Freeze quotation with activities created successfully",
      OUTPUT: finalfq,
    });
  } catch (error) {
    res.status(500).json({
      STATUS: "ERROR",
      MESSAGE: error.message,
      OUTPUT: []
    });
  }
});

// Create a freeze quotation with hotels
export const createFreezeQuotationHotels = asyncHandler(async (req, res) => {
  const body = req.body;

  const freezequotation_id = uuidv4();
  const hotel_freezequotation_id = uuidv4();

  try {
    const finalfq = await freezequotationModel.create({
      freezequotation_id,
      freezequotation_hotels: [
        {
          ...body,
          hotel_freezequotation_id,
          freezequotation_id
        }
      ]
    }, {
      include: [
        { model: HotelFreezeQuotationModel, as: "freezequotation_hotels" }
      ]
    });

    res.status(200).json({
      STATUS: "SUCCESS",
      MESSAGE: "Freeze quotation with hotels created successfully",
      OUTPUT: finalfq,
    });
  } catch (error) {
    res.status(500).json({
      STATUS: "ERROR",
      MESSAGE: error.message,
      OUTPUT: []
    });
  }
});

// Update freeze quotation (parent only)
export const updateFreezeQuotationActivities = asyncHandler(async (req, res) => {
  const body = req.body;

  const freezequotation_id = req.params.id;

  try {
    const finalfq = await freezequotationModel.update({
      freezequotation_products: [
        {
          ...body,
        }
      ]
    }, {
      include: [
        { model: ActivityFreezeQuotationModel, as: "freezequotation_products" }
      ]
    },
      {
        where: {
          freezequotation_id
        }
      });

    res.status(200).json({
      STATUS: "SUCCESS",
      MESSAGE: "Freeze quotation with activities updated successfully",
      OUTPUT: finalfq,
    });
  } catch (error) {
    res.status(500).json({
      STATUS: "ERROR",
      MESSAGE: error.message,
      OUTPUT: []
    });
  }
});

// Create a freeze quotation with hotels
export const updateFreezeQuotationHotels = asyncHandler(async (req, res) => {
  const body = req.body;

  const freezequotation_id = req.params.id;

  try {
    const finalfq = await freezequotationModel.update({
      freezequotation_hotels: [
        {
          ...body,
        }
      ]
    }, {
      include: [
        { model: HotelFreezeQuotationModel, as: "freezequotation_hotels" }
      ]
    }, {
      where: {
        freezequotation_id
      }
    });

    res.status(200).json({
      STATUS: "SUCCESS",
      MESSAGE: "Freeze quotation with hotels updated successfully",
      OUTPUT: finalfq,
    });
  } catch (error) {
    res.status(500).json({
      STATUS: "ERROR",
      MESSAGE: error.message,
      OUTPUT: []
    });
  }
});

export const deleteFreezeQuotation = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const freezequotation = await freezequotationModel.findByPk(id);

    if (!freezequotation) {
      res.status(404).json({ message: "Freeze quotation not found" });
      return;
    }

    await freezequotation.destroy();
    res.status(200).json({ message: "Freeze quotation deleted" });
  } catch (error) {
    res.status(500).json({
      STATUS: "ERROR",
      MESSAGE: error.message,
      OUTPUT: []
    });
  }
});

