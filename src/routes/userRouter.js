import { Router } from "express";
import { createUser, getAllUsers, deleteUser, handleUserLogin } from "../controllers/userController.js";
import { createAgent, getAllAgents, deleteAgent } from "../controllers/agentController.js";
import { createSupp, getAllSupp, deleteSupp } from "../controllers/suppController.js";
import { createDest, getAllDest, deleteDest } from "../controllers/destController.js";
import { createTrip, getAllTrip } from "../controllers/tripController.js";
import { createBooking, getAllBooking, deleteBooking } from "../controllers/bookingController.js";
import { upload } from "../middlewares/multer.js";
import uploadOnCloudinary from "../middlewares/cloudinary.js";

const router = Router();

// ! user
router.post("/createUser", createUser);
router.get('/getAllUsers', getAllUsers);
router.delete('/deleteUser/:id', deleteUser);

// ! login
router.post('/login', handleUserLogin);

// ! destination
router.post("/createDestination", createDest);
router.get('/getAllDestinations', getAllDest);
router.delete('/deleteDestination/:id', deleteDest);

// ! trip
router.post("/createTrip",uploadOnCloudinary(upload.fields([{ name: req.body.documents.catagory , maxCount: 10 }])), createTrip);
router.get('/getAllTrips', getAllTrip);

// ! booking
router.post("/createBooking",uploadOnCloudinary(upload.fields([{ name: 'documents', maxCount: 10 }])), createBooking);
router.get('/getAllBookings', getAllBooking);
router.delete('/deleteBooking/:id', deleteBooking);

// ! agent
router.post("/createAgent", createAgent);
router.get('/getAllAgents', getAllAgents);
router.delete('/deleteAgent/:id', deleteAgent);

// ! supplier 
router.post("/createSupplier", createSupp);
router.get('/getAllSuppliers', getAllSupp);
router.delete('/deleteSupplier/:id', deleteSupp);

export default router;