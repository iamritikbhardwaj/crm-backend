import asyncHandler from "express-async-handler";
import { bookingModel } from "../models/bookingModel.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

export const getAllBooking = asyncHandler(async (req, res) => {
  console.log("getAllBooking");
  try {
    const booking = await bookingModel.findAll();
    console.log(booking, "booking");
    if (booking.length !== 0) {
      res.status(200).json({
        STATUS: "SUCCESS",
        MESSAGE: "Bookings fetched successfully",
        OUTPUT: booking,
      });
    } else {
      res.status(404).json({
        STATUS: "FAIL",
        MESSAGE: "No bookings found",
        OUTPUT: null,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      STATUS: "FAIL",
      MESSAGE: "Error fetching bookings",
      OUTPUT: null,
    });
  }
});

export const deleteBooking = asyncHandler(async (req, res) => {
  const id = req?.params?.id;
  console.log(req.params, "id");
  try {
    const response = await bookingModel.findOne({
      where: {
        booking_id: id,
      },
    })
    if(response.status === 200) {
     response.data.OUTPUT.documents.array.forEach(element => {
          let path = element.path;
          fs.unlinkSync(path);
     });
    }
    const booking = await bookingModel.destroy({
      where: {
        booking_id: id,
      },
    });

    console.log(booking, "booking");

    if (booking !== 1) {
      res.status(404).json({
        STATUS: "FAIL",
        MESSAGE: "Booking not found",
        OUTPUT: null,
      });
    } else {
      res.status(200).json({
        STATUS: "SUCCESS",
        MESSAGE: "Booking deleted successfully",
        OUTPUT: booking,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      STATUS: "FAIL",
      MESSAGE: "Error deleting booking",
      OUTPUT: null,
    });
  }
});

export const createBooking = asyncHandler(async (req, res, url) => {
  const data = req.body.data;
  const bookingData = JSON.parse(data);
  const documents = url;
  console.log(documents, bookingData, "tripData");
  const {
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
    opsSpoc,
  } = bookingData;
  console.log(bookingData, req.files, "tripData");
  const id = req?.query?.id;
  console.log(url, "id");

  try {
    if (req.query.hasOwnProperty("id") && id !== undefined && id !== null) {
      console.log("update booking");
      const booking = await bookingModel.update(
        {
          ...bookingData,
          opsSpoc: opsSpoc,
          documents: documents,
          status: "confirmed",
        },
        {
          where: {
            booking_id: id,
          },
        }
      );
      if (!booking) {
        res.status(400);
        throw new Error("Invalid booking data");
      } else {
        res.status(200).json({
          STATUS: "SUCCESS",
          MESSAGE: "Booking updated successfully",
          OUTPUT: booking,
        });
      }
    } else {
      const booking = await bookingModel.create({
        booking_id: uuidv4(),
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
        documents,
        opsSpoc,
      });
      if (!booking) {
        res.status(400);
        throw new Error("Invalid booking data");
      } else {
        res.status(200).json({
          STATUS: "SUCCESS",
          MESSAGE: "Booking created successfully",
          OUTPUT: booking,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      STATUS: "FAIL",
      MESSAGE: "Error creating booking",
      OUTPUT: null,
    });
  }
});

export const getDoc = asyncHandler(async (req, res) => {
     console.log('getDoc');
     const pathh = req.query?.path;
     const filePath = path.resolve(pathh)

     fs.exists(filePath, (exists) => {
      if (exists) {
        // If the file exists, send it as a response
        res.download(filePath, (err) => {
          if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Error sending file');
          }
        });
      } else {
        res.status(404).send('File not found');
      }
    });
});