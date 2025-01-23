import asyncHandler from "express-async-handler";
import { tripModel } from "../models/tripModel.js";
  
  const generateUniqueTripId = async () => {
    try {
        const currentYear = new Date().getFullYear().toString().slice(2);
      
        let uniqueTripId = null;
      
        while (!uniqueTripId) {
      
        //   Fetch the latest invoice number
          const lastTrip = await tripModel.findOne({
            order: [['created_at', 'DESC']], // Sort by creation date, latest first
            attributes: ['tripId'], // Only fetch the tripId field
          });
      
          let newInvoiceNumber = 1; // Default to 1 if no trips exist
      
          if (lastTrip) {
            const lastInvoiceNumber = parseInt(
              lastTrip.tripId.slice(4),
              // Extract and convert the last 4 digits to a number
            );
            newInvoiceNumber = lastInvoiceNumber + 1;
          }
      
          // Format the new trip ID
          const formattedInvoice = String(newInvoiceNumber).padStart(4, '0'); // Ensure 4 digits
          const generatedId = `TRP${currentYear}${formattedInvoice}`;
      
          // Check uniqueness
          const existingTrip = await tripModel.findOne({ where: { tripId: generatedId } });
          if (!existingTrip) {
            uniqueTripId = generatedId; // Set the unique trip ID
          }
        }
        return uniqueTripId;
    } catch (error) {
        console.error('Error generating unique trip ID:', error);
        throw error;
    }
  };

export const getAllTrip = asyncHandler(async (req, res) => {
    console.log('getAllTrip');
   try { 
    const trip = await tripModel.findAll();
    console.log(trip, 'trip');
    res.status(200).json({
        STATUS: 'SUCCESS',
        MESSAGE: 'Trips fetched successfully',
        OUTPUT: trip
    });}
    catch (error) {
        console.log(error);
        res.status(500).json({
            STATUS: 'FAIL',
            MESSAGE: error.message,
            OUTPUT: null
        });
    }
})

export const createTrip = asyncHandler(async (req, res) => {
    const { bookingDate, destination, salesSpoc, agent, customerName, arrivalDate, 
        departureDate, pax, orderValue, countryCode, whatsappNumber, documents,
        opsSpoc} = req.body;
        const tripData = req.body;
    const id = req?.query?.id
    console.log(id, 'tripData');
    try {
        if(req.query.hasOwnProperty('id') && id !== undefined && id !== null) {
            console.log('update trip')
            const trip = await tripModel.update(tripData, {
                where: {
                    tripId: id
                }
            })
            if(!trip) {
                res.status(400);
                throw new Error('Invalid trip data');f
            } else {
                res.status(200).json({
                    STATUS: 'SUCCESS',
                    MESSAGE: 'Trip updated successfully',
                    OUTPUT: trip
                });
            }
        }
        else {
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
                opsSpoc: opsSpoc
            });
        if (!trip) {
            res.status(400);
            throw new Error('Invalid trip data');
        } else {
            res.status(200).json({
                STATUS: 'SUCCESS',
                MESSAGE: 'Trip created successfully',
                OUTPUT: trip
            });
        }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            STATUS: 'FAIL',
            MESSAGE: error.message,
            OUTPUT: null
        });
    }
})

export const uploadDocs = asyncHandler(async (req, res) => {
    const url = req.body.url
    const id = req?.query?.id
    console.log(id, 'tripData');
    return
    try {
        if(req.query.hasOwnProperty('id') && id !== undefined && id !== null) {
            console.log('update trip')
            const trip = await tripModel.update({documents: url}, {
                where: {
                    tripId: id
                }
            })
            if(!trip) {
                res.status(400);
                throw new Error('Invalid trip data');f
            } else {
                res.status(200).json({
                    STATUS: 'SUCCESS',
                    MESSAGE: 'Trip updated successfully',
                    OUTPUT: trip
                });
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            STATUS: 'FAIL',
            MESSAGE: error.message,
            OUTPUT: null
        });
    }
})  