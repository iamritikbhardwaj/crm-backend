import { Router } from "express";
import { createFreezeQuotationActivities, createFreezeQuotationHotels, getFreezeQuotationByTripId, updateFreezeQuotationActivities, updateFreezeQuotationHotels } from "../controllers/freezeQuotation.controller.js";


const router = Router();

router.post("/prods/{tripId}", createFreezeQuotationActivities);
router.post("/hotels/{tripId}", createFreezeQuotationHotels);
router.get("/freezeQuotations/{tripId}", getFreezeQuotationByTripId);
router.post("/prods/update/{freezequotation_id}", updateFreezeQuotationActivities);
router.post("/hotels/update/{freezequotation_id}", updateFreezeQuotationHotels);


export default router