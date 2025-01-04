import asyncHandler from "express-async-handler";
import { bookingModel } from "../models/bookingModel.js";
import { where } from "sequelize";

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
     const bookingData = req.body;
     console.log(bookingData, 'bookingData');
     const id = req?.query?.id
     console.log(id, 'id');
     try {if(id) {
          log('update booking')
          const booking = await bookingModel.update(bookingData, {
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
     else{const booking = await bookingModel.create({booking_id: uuidv4(), bookingData});
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