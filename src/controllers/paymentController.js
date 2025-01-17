import asyncHandler from "express-async-handler";
import { paymentModel } from "../models/paymentModel.js";
import { v4 as uuidv4 } from "uuid";

export const getAllPayments = asyncHandler(async (req, res) => {
     console.log('getAllPayment');
    try { const payment = await paymentModel.findAll();
     console.log(payment, 'payment');
     res.status(200).json({
          STATUS: 'SUCCESS',
          MESSAGE: 'Payments fetched successfully',
          OUTPUT: payment
     });}
     catch (error) {
          console.log(error);
          res.status(500).json({
                STATUS: 'FAIL',
                MESSAGE: 'Error fetching payments',
                OUTPUT: null
          });
     }
});

export const createPayment = asyncHandler(async (req, res) => {
     console.log('createPayment');
     const paymentData = req.body;
     // const { date, amount, paymentMode, status, remarks, validatedBy } = paymentData;
     console.log(paymentData, 'paymentData');
     const id = req?.query?.id;
     console.log(id, 'id');
     try {
        if(req.query.hasOwnProperty('id')) {
        console.log('update payment')
        const payment = await paymentModel.update(paymentData, {
            where: {
                payment_id: id
            }
        })
        if(!payment) {
            res.status(400);
            throw new Error('Invalid payment data');
        } else {
            res.status(200).json({
                STATUS: 'SUCCESS',
                MESSAGE: 'Payment updated successfully',
                OUTPUT: payment
            });
        }
    }else {
        console.log('create payment')
        const payment = await paymentModel.create({payment_id: uuidv4(), ...paymentData});
        if(!payment) {
            res.status(400);
            throw new Error('Invalid payment data');
        } else {
            res.status(200).json({
                STATUS: 'SUCCESS',
                MESSAGE: 'Payment created successfully',
                OUTPUT: payment
            });
    }
     
}} catch (error) {
     console.log(error);
     res.status(500).json({
           STATUS: 'FAIL',
           MESSAGE: 'Error creating payment',
           OUTPUT: null
     });
}
});

export const deletePayment = asyncHandler(async (req, res) => {
     const id = req?.params?.id;
     console.log(id, 'id');
     try {
          const payment = await paymentModel.destroy({
               where: {
                    payment_id: id
               }
          });
          console.log(payment, 'payment');
          if(!payment)
          {
               res.status(404).json({
                    STATUS: 'FAIL',
                    MESSAGE: 'Payment not found',
                    OUTPUT: null
               });
          } else {
               res.status(200).json({
                    STATUS: 'SUCCESS',
                    MESSAGE: 'Payment deleted successfully',
                    OUTPUT: payment
               });
          }
     } catch (error) {
          console.log(error);
          res.status(500).json({
               STATUS: 'FAIL',
               MESSAGE: 'Error deleting payment',
               OUTPUT: null
          });
     }
});