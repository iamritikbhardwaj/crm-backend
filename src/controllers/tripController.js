import asyncHandler from "express-async-handler";
import { tripModel } from "../models/tripModel.js";

const generateUniqueTripId = async () => {
  try {
    const currentYear = new Date().getFullYear().toString().slice(2);

    let uniqueTripId = null;

    while (!uniqueTripId) {
      //   Fetch the latest invoice number
      const lastTrip = await tripModel.findOne({
        order: [["created_at", "DESC"]], // Sort by creation date, latest first
        attributes: ["tripId"], // Only fetch the tripId field
      });

      let newInvoiceNumber = 1; // Default to 1 if no trips exist

      if (lastTrip) {
        const lastInvoiceNumber = parseInt(
          lastTrip.tripId.slice(6),
          10
          // Extract and convert the last 4 digits to a number
        );
        newInvoiceNumber = lastInvoiceNumber + 1;
        console.log(newInvoiceNumber, "newInvoiceNumber");
      }

      // Format the new trip ID
      const formattedInvoice = String(newInvoiceNumber).padStart(4, "0"); // Ensure 4 digits
      const generatedId = `TRP${currentYear}${formattedInvoice}`;

      // Check uniqueness
      const existingTrip = await tripModel.findOne({
        where: { tripId: generatedId },
      });
      if (!existingTrip) {
        uniqueTripId = generatedId; // Set the unique trip ID
      }
    }
    return uniqueTripId;
  } catch (error) {
    console.error("Error generating unique trip ID:", error);
    throw error;
  }
};

export const getAllTrip = asyncHandler(async (req, res) => {
  const {id} = req.query;
  console.log("getAllTrip");
  try {
    if(req.query.hasOwnProperty('id') && id !== undefined && id !== null) {
      console.log('fetch one trip')
      const trip = await tripModel.findOne({
        where: {
          tripId: id
        }
      })
      if(!trip) {
        res.status(400);
        throw new Error("Invalid trip data");
      } else {
        res.status(200).json({
          STATUS: "SUCCESS",
          MESSAGE: "Trip fetched successfully",
          OUTPUT: trip,
        });
      }
    } else {
      const trip = await tripModel.findAll();
    console.log(trip, "trip");
    res.status(200).json({
      STATUS: "SUCCESS",
      MESSAGE: "Trips fetched successfully",
      OUTPUT: trip,
    });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      STATUS: "FAIL",
      MESSAGE: error.message,
      OUTPUT: null,
    });
  }
});

export const createTrip = asyncHandler(async (req, res, url) => {
  const data = req.body.data;
  const tripData = JSON.parse(data);
  const {
    bookingDate,
    destination,
    salesSpoc,
    agent,
    customerName,
    arrivalDate,
    departureDate,
    pax,
    orderValue,
    countryCode,
    whatsappNumber,
    documents: docs,
    opsSpoc,
  } = tripData;
  const documents = [...docs, ...url]
  console.log(documents, "tripData");
  const id = req?.query?.id;
  console.log(tripData, "tripData");

  try {
    if (req.query.hasOwnProperty("id") && id !== undefined && id !== null) {
      console.log("update trip");
      const trip = await tripModel.update(tripData, {
        where: {
          tripId: id,
        },
      });
      if (!trip) {
        res.status(400);
        throw new Error("Invalid trip data");
      } else {
        res.status(200).json({
          STATUS: "SUCCESS",
          MESSAGE: "Trip updated successfully",
          OUTPUT: trip,
        });
      }
    } else {
      const trip = await tripModel.create({
        tripId: await generateUniqueTripId(),
        bookingDate: bookingDate,
        destination: destination,
        salesSpoc: salesSpoc,
        agent: agent,
        customerName: customerName,
        arrivalDate: arrivalDate,
        departureDate: departureDate,
        pax: pax,
        orderValue: orderValue,
        countryCode: countryCode,
        whatsappNumber: whatsappNumber,
        documents: documents,
        opsSpoc: opsSpoc,
      });
      if (!trip) {
        res.status(400);
        throw new Error("Invalid trip data");
      } else {
        res.status(200).json({
          STATUS: "SUCCESS",
          MESSAGE: "Trip created successfully",
          OUTPUT: trip,
        });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      STATUS: "FAIL",
      MESSAGE: error.message,
      OUTPUT: null,
    });
  }
});

export const updateTripStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const id = req.query?.id;

  console.log(id, "id");

  try {
    const response = await tripModel.update(
      { status },
      {
        where: {
          tripId: id,
        },
      }
    );
    if (!response) {
      res.status(400).json({ MESSAGE: "Some erro occured", STATUS: "Failed" });
    } else {
      res.status(200).json({
        STATUS: "SUCCESS",
        MESSAGE: "Trip updated successfully",
        OUTPUT: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      STATUS: "FAIL",
      MESSAGE: error.message,
      OUTPUT: null,
    });
  }
});

export const updateOps = asyncHandler(async (req, res) => {
    const { opsSpoc } = req.body;
  
    const id = req.query?.id;
  
    console.log(id, "id");
  
    try {
      const response = await tripModel.update({opsSpoc}, {
        where: {
          tripId: id,
        },
      });
      console.log(response, "response");
      if (!response) {
        res.status(400).json({ MESSAGE: "Some error occured", STATUS: "Failed" });
      } else {
        res.status(200).json({
          STATUS: "SUCCESS",
          MESSAGE: "Trip updated successfully",
          OUTPUT: response,
        });
      }
    } catch (error) {
      res.status(500).json({
        STATUS: "FAIL",
        MESSAGE: error.message,
        OUTPUT: null,
      });
    }
  });

export const updateDocs = asyncHandler(async (req, res, url) => {
    const {docs} = req.body;
    const documents = []
    if(Array.isArray(docs) && Array.isArray(url)) {
      documents.push(...docs, ...url)
    }else if(!Array.isArray(docs) && Array.isArray(url)) {
      documents.push(docs,...url);
    }else if(Array.isArray(docs) && !Array.isArray(url)) {
      documents.push(...docs, url);
    }else {
      documents.push(docs, url);
    }
    const id = req.query?.id;
    try {
      console.log(id, documents, "id");
      const response = await tripModel.update({documents}, {
        where: {
          tripId: id,
        },
      });
      if (response[0] === 0) {
        res.status(400).json({ MESSAGE: "Some error occured", STATUS: "Failed" });
      } else {
        console.log(response, "response");
        res.status(200).json({
          STATUS: "SUCCESS",
          MESSAGE: "Trip updated successfully",
          OUTPUT: response,
        });
      }
    } catch (error) {
      res.status(201).json({
        STATUS: "FAIL",
        MESSAGE: error.message,
        OUTPUT: null,
      });
    }
})

export const fetchDocs = asyncHandler(async (req, res) => {
    const id = req.query?.id;
  
    console.log(id, "id");
  
    try {
      const response = await tripModel.findOne({
        where: {
          tripId: id,
        },
      });
      if (!response) {
        res.status(400).json({ MESSAGE: "Some error occured", STATUS: "Failed" });
      } else {
        const docs = response?.documents.filter(doc => new String(doc).includes('freeze') )
        res.status(200).json({
          STATUS: "SUCCESS",
          MESSAGE: "Trip updated successfully",
          OUTPUT: docs,
        });
      }
    } catch (error) {
      console.log(error);
    }
})

// this is for agent payment
export const updatePayment = asyncHandler(async(req, res) => {
  const { id } = req.query;
  const {payment} = req.body;
  try {
    const response = tripModel.update({payment},{
      where: {
        tripId: id
      }
    });
    if(response[0] === 1) {
      res.status(200).json({
        MESSAGE: "Payment Updated Successfully",
        STATUS: "SUCCESS",
        OUTPUT: []
      })
    }else{
      res.status(201).json({
        MESSAGE: "Payment Update FAILED",
        STATUS: "FAIL",
        OUTPUT: []
      })
    }
  } catch (error) {
    console.log(error);
  }
});

export const updatePayStatus = asyncHandler(async(req, res) => {
  const { id } = req.query;
  const {paymentStatus, opsStatus} = req.body;
  try {
    const response = tripModel.update({paymentStatus, opsStatus},{
      where: {
        tripId: id
      }
    });
    if(response[0] === 1) {
      res.status(200).json({
        MESSAGE: "Payment status Updated Successfully",
        STATUS: "SUCCESS",
        OUTPUT: []
      })
    } else if(response[0] === 0){
      res.status(200).json({
        MESSAGE: "Payment status and Booking status already exists",
        STATUS: "SUCCESS",
        OUTPUT: []
      })
    } else{
      res.status(201).json({
        MESSAGE: "Failed to update data",
        STATUS: "SUCCESS",
        OUTPUT: []
      })
    }
  } catch (error) {
    console.log(error, "errorssss");
  }
});

export const updateOrderValue = asyncHandler(async(req, res) => {
  const { id } = req.query;
  const { orderValue } = req.body;
  try {
    const response = tripModel.update({orderValue},{
      where: {
        tripId: id
      }
    });
    if(response[0] === 1) {
      res.status(200).json({
        MESSAGE: "Payment status Updated Successfully",
        STATUS: "SUCCESS",
        OUTPUT: []
      })
    }
  } catch (error) {
    console.log(error);
  }
});