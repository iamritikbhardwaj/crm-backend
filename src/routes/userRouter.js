import { Router } from "express";
import { createUser, getAllUsers, deleteUser, handleUserLogin } from "../controllers/userController.js";
import { createAgent, getAllAgents, deleteAgent } from "../controllers/agentController.js";
import { createSupp, getAllSupp, deleteSupp } from "../controllers/suppController.js";
import { createDest, getAllDest, deleteDest } from "../controllers/destController.js";
import { createTrip, getAllTrip } from "../controllers/tripController.js";
import { createBooking, getAllBooking, deleteBooking } from "../controllers/bookingController.js";
import { createPayment, getAllPayments, deletePayment } from "../controllers/paymentController.js";
import { createRecon, getAllRecon, deleteRecon } from "../controllers/reconController.js";
import { createSuppPay, deleteSuppPay, getAllSuppPay } from "../controllers/supPayCont.js";


const router = Router();

// ! user
router.post('/createUser', createUser);
router.get('/getAllUsers', getAllUsers);
router.delete('/deleteUser/:id', deleteUser);

// ! login
router.post('/login', handleUserLogin);

// ! destination
router.post('/createDestination', createDest);
router.get('/getAllDestinations', getAllDest);
router.delete('/deleteDestination/:id', deleteDest);

// ! trip
router.post("/createTrip", createTrip);
router.get('/getAllTrips', getAllTrip);
// router.post("/uploadDocuments", upload.array("file"), () => {console.log("file uploaded")});

// ! booking
router.post('/createBooking', createBooking);
router.get('/getAllBookings', getAllBooking);
router.delete('/deleteBooking/:id', deleteBooking);

// ! agent
router.post('/createAgent', createAgent);
router.get('/getAllAgents', getAllAgents);
router.delete('/deleteAgent/:id', deleteAgent);

// ! supplier 
router.post('/createSupplier', createSupp);
router.get('/getAllSuppliers', getAllSupp);
router.delete('/deleteSupplier/:id', deleteSupp);

// ! payment 
router.post('/createPayment', createPayment);
router.get('/getAllPayments', getAllPayments);
router.delete('/deletePayment/:id', deletePayment);

// ! recon
router.post('/createRecon', createRecon);
router.get('/getAllRecons', getAllRecon);
router.delete('/deleteRecon/:id', deleteRecon);

// ! supPay
router.post('/createVendor', createSuppPay);
router.get('/getAllVendors', getAllSuppPay);
router.delete('/deleteVendor/:id', deleteSuppPay);

export default router;