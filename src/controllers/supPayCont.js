import asyncHandler from "express-async-handler";
import vendorPayModel from "../models/supPayModel.js";
import { v4 as uuidv4 } from "uuid";
import tripModel from "../models/tripModel.js";

export const getAllSuppPay = asyncHandler(async (req, res) => {
     console.log('getAllSuppPay');
     const { id } = req.query;
     console.log(id, "id")
    try { 
     const supp = await vendorPayModel.findAll({
     where: {
          tripId: id
     }
    });
     console.log(supp, 'supp');
     if(!supp) {
        res.status(400);
        return res.status(400).json('Invalid supplier data');
    } else {
        res.status(200).json({
            STATUS: 'SUCCESS',
            MESSAGE: 'Suppliers fetched successfully',
            OUTPUT: supp
        });
    }}
     catch (error) {
          console.log(error);
          res.status(500).json({
                STATUS: 'FAIL',
                MESSAGE: 'Error fetching suppliers',
                OUTPUT: null
          });
     }
});

export const createSuppPay = asyncHandler(async (req, res) => {
     const suppData = req.body;
     const { id } = req.query;
     console.log(id,suppData, 'suppData');
     
     try {
          if(req.query.hasOwnProperty('id')) {
          console.log('update supp')
          const supp = await vendorPayModel.update(suppData, {
               where: {
                    vendor_pay_id: id
               }
          })
          if(!supp) {
               res.status(400);
               throw new Error('Invalid supplier data');
          } else {
               const vendor = await vendorPayModel.findAll({
                    where: {
                         tripId: suppData.tripId
                    }
               })
               const pay = vendor.filter((item) => item.payment_status !== "PAID").length;
               if(pay === 0) {
                    await tripModel.update({ paymentStatus: "PAID"},{where: {tripId: suppData.tripId}});
               }
               const book = vendor.filter((item) => item.booking_status !== "COMPLETED").length;
               if(book === 0) {
                    await tripModel.update({ opsStatus: "COMPLETED" }, {where: {tripId: suppData.tripId}});
               }
               res.status(200).json({
                    STATUS: 'SUCCESS',
                    MESSAGE: 'Supplier updated successfully',
                    OUTPUT: supp
               });
          }
     }else {
          console.log('create supp')
          const supp = await vendorPayModel.create({vendor_pay_id: uuidv4(), ...suppData});
     if (!supp) {
          res.status(400);
          throw new Error('Invalid supplier data');
     } else {
          await tripModel.update({ paymentStatus: "UNPAID", opsStatus: "PENDING" },{where: {tripId: suppData.tripId}});
          res.status(200).json({
               STATUS: 'SUCCESS',
               MESSAGE: 'Supplier created successfully',
               OUTPUT: supp
          });
     }
     }
     } catch (error) {
          console.log(error);
          res.status(500).json({
               STATUS: 'FAIL',
               MESSAGE: 'Error creating supplier',
               OUTPUT: null
          });
     }
});

export const deleteSuppPay = asyncHandler(async (req, res) => {
     const id = req?.params?.id;
     console.log(id, 'id');
     try {
          const supp = await vendorPayModel.destroy({
               where: {
                    vendor_pay_id: id
               }
          });
          if(!supp)
          {
               res.status(404).json({
                    STATUS: 'FAIL',
                    MESSAGE: 'Supplier not found',
                    OUTPUT: null
               });
          } else {
               res.status(200).json({
                    STATUS: 'SUCCESS',
                    MESSAGE: 'Supplier deleted successfully',
                    OUTPUT: supp
               });
          }
     } catch (error) {
          console.log(error);
          res.status(500).json({
               STATUS: 'FAIL',
               MESSAGE: 'Error deleting supplier',
               OUTPUT: null
          });
     }
});