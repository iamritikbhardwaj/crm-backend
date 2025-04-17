import asyncHandler from "express-async-handler";
import { bookingModel } from "../models/bookingModel.js";
import { v4 as uuidv4 } from "uuid";
import { cancelBookingMail, createBookingMail, rejectBookingMail } from "../middlewares/resend.js";
import { userModel } from "../models/userModel.js";
import { where } from "sequelize";

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
      res.status(201).json({
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
  const { id, reject } = req.query;
  try {
    if (reject === true) {
      const data = await bookingModel.findOne({
        where: {
          booking_id: id,
        },
      })
      const sales = await userModel.findOne({
        where: {
          name: data.salesSpoc,
        },
      })
      await rejectBookingMail(sales.email, sales.name, data.booking_id, data.customerName, data.arrivalDate, data.departureDate, data.pax, data.salesSpoc, "better luck next time");
    }
    const booking = await bookingModel.destroy({
      where: {
        booking_id: id,
      },
    });

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
  console.log(documents, bookingData, "bookingData");
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
  console.log(bookingData, req.files, "booking data");
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
        const sales = await userModel.findOne({
          where: {
            name: salesSpoc,
          },
        })
        const ops = await userModel.findAll({
          where: { profile: "Operations" },
        });
        const cc = ops.map((item) => item.email);
        createBookingMail(sales.email, salesSpoc, booking.booking_id, customerName, arrivalDate, departureDate, pax, cc);
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

export const cancelBooking = asyncHandler(async (req, res) => {
  const { id, remarks } = req.query;
  try {
    const booking = await bookingModel.findOne({
      where: {
        booking_id: id
      }
   });
    const sales = await userModel.findOne({
      where: {
        name: booking.salesSpoc,
      },
    });
    await rejectBookingMail(sales.email, sales.name, booking.booking_id, booking.customerName, booking.arrivalDate, booking.departureDate, booking.pax, remarks);
    const response = await bookingModel.destroy({
      where: {
        booking_id: id,
      },
    });
    if (response !== 1) {
      res.status(404).json({
        STATUS: "FAIL",
        MESSAGE: "Booking not found",
        OUTPUT: null,
      });
    } else {
      res.status(200).json({
        STATUS: "SUCCESS",
        MESSAGE: "Booking cancelled successfully",
        OUTPUT: booking,
      });
    }
  } catch (error) {
    console.log(error);
  }
});
