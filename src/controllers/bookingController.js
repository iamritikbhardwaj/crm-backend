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

export const deleteBooking = asyncHandler(async (req, res) => {
     const id = req?.params?.id;
     console.log(req.params, 'id');
     try {
          const booking = await bookingModel.destroy({
               where: {
                    booking_id: id
               }
          });

          console.log(booking, 'booking');

          if(booking !== 1)
          {
               res.status(404).json({
                    STATUS: 'FAIL',
                    MESSAGE: 'Booking not found',
                    OUTPUT: null
               });
          } else {res.status(200).json({
               STATUS: 'SUCCESS',
               MESSAGE: 'Booking deleted successfully',
               OUTPUT: booking
          });
          }

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
     whatsappNumber, documents, opsSpoc} = req.body;
     const id = req?.query?.id
     console.log(id, 'id');
     console.log(documents, 'id');
     
     try {
          if(req.query.hasOwnProperty('id') && id !== undefined && id !== null) {
          console.log('update booking')
          const booking = await bookingModel.update({opsSpoc: opsSpoc, documents: documents, status: "confirmed"}, {
               where: {
                    booking_id: id
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
          whatsappNumber: whatsappNumber, documents: documents});
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