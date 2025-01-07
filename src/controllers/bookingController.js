import asyncHandler from "express-async-handler";
import { bookingModel } from "../models/bookingModel.js";
import { v4 as uuidv4 } from "uuid";

export const getAllBooking = asyncHandler(async (req, res) => {
     console.log('getAllBooking');
    try { const booking = await bookingModel.findAll();
     console.log(booking, 'booking');
     res.status(200).json({
          STATUS: 'SUCCESS',
          MESSAGE: 'Bookings fetched successfully',
          OUTPUT: booking
     });}
     catch (error) {
          console.log(error);
          res.status(500).json({
                STATUS: 'FAIL',
                MESSAGE: 'Error fetching bookings',
                OUTPUT: null
          });
     }
});

export const uploadDocument = asyncHandler(async (req, res) => {
     const files = req.files;
     const id = req?.params?.id;
     console.log(id, 'id');
     console.log(files, 'files');
     const file = bookingModel.create({
          document: files,
          where: {
               booking_id: id
          }
     })
     console.log(file, 'files');
     res.status(200).json({
          STATUS: 'SUCCESS',
          MESSAGE: 'Documents uploaded successfully',
          OUTPUT: files
     });
});

export const deleteBooking = asyncHandler(async (req, res) => {
     const id = req?.params?.id;
     console.log(id, 'id');
     try {
          const booking = await bookingModel.destroy({
               where: {
                    id: id
               }
          });
          res.status(200).json({
               STATUS: 'SUCCESS',
               MESSAGE: 'Booking deleted successfully',
               OUTPUT: booking
          });
     } catch (error) {
          console.log(error);
          res.status(500).json({
               STATUS: 'FAIL',
               MESSAGE: 'Error deleting booking',
               OUTPUT: null
          });
     }
});

export const createBooking = asyncHandler(async (req, res) => {
     const { destination, salesSpoc, agent, customerName, arrivalDate,
     departureDate,
     pax,
     orderValue,
     countryCode,
     whatsappNumber} = req.body;
     const id = req?.query?.id
     console.log(id, 'id');
     
     try {
          if(req.query.hasOwnProperty('id') && id !== undefined && id !== null) {
          log('update booking')
          const booking = await bookingModel.update({destination: destination, 
               salesSpoc: salesSpoc, 
               agent: agent, customerName: customerName, arrivalDate: arrivalDate,
               departureDate: departureDate,
               pax: pax,
               orderValue: orderValue,
               countryCode: countryCode,
               whatsappNumber: whatsappNumber}, {
               where: {
                    id: id
               }
          })
          if(!booking) {
               res.status(400);
               throw new Error('Invalid booking data');
          } else {
               res.status(200).json({
                    STATUS: 'SUCCESS',
                    MESSAGE: 'Booking updated successfully',
                    OUTPUT: booking
               });
          }
     }
     else{const booking = await bookingModel.create({booking_id: uuidv4(), destination: destination, 
          salesSpoc: salesSpoc, 
          agent: agent, customerName: customerName, arrivalDate: arrivalDate,
          departureDate: departureDate,
          pax: pax,
          orderValue: orderValue,
          countryCode: countryCode,
          whatsappNumber: whatsappNumber});
     if (!booking) {
          res.status(400);
          throw new Error('Invalid booking data');
     } else {
          res.status(200).json({
               STATUS: 'SUCCESS',
               MESSAGE: 'Booking created successfully',
               OUTPUT: booking
          });
     }}} catch (error) {
          console.log(error);
          res.status(500).json({
                STATUS: 'FAIL',
                MESSAGE: 'Error creating booking',
                OUTPUT: null
          });
     }
});