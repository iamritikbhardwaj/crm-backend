import { Router } from "express";
import { createUser, getAllUsers, deleteUser, handleUserLogin } from "../controllers/userController.js";
import { createAgent, getAllAgents, deleteAgent } from "../controllers/agentController.js";
import { createSupp, getAllSupp, deleteSupp } from "../controllers/suppController.js";
import { createDest, getAllDest, deleteDest } from "../controllers/destController.js";
import { createTrip, getAllTrip } from "../controllers/tripController.js";
import { createBooking, getAllBooking, deleteBooking } from "../controllers/bookingController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

// ! user
router.post("/createUser", verifyToken, createUser);
router.get('/getAllUsers', verifyToken, getAllUsers);
router.delete('/deleteUser/:id', verifyToken, deleteUser);

// ! login
router.post('/login', handleUserLogin);

// ! destination
router.post("/createDestination", verifyToken, createDest);
router.get('/getAllDestinations', verifyToken, getAllDest);
router.delete('/deleteDestination/:id', verifyToken, deleteDest);

// ! trip
router.post("/createTrip", verifyToken, createTrip);
router.get('/getAllTrips', verifyToken, getAllTrip);

// ! booking
router.post("/createBooking", createBooking);
router.get('/getAllBookings', verifyToken, getAllBooking);
router.delete('/deleteBooking/:id', verifyToken, deleteBooking);

// ! agent
router.post("/createAgent", verifyToken, createAgent);
router.get('/getAllAgents', verifyToken, getAllAgents);
router.delete('/deleteAgent/:id', verifyToken, deleteAgent);

// ! supplier 
router.post("/createSupplier", verifyToken, createSupp);
router.get('/getAllSuppliers', verifyToken, getAllSupp);
router.delete('/deleteSupplier/:id', verifyToken, deleteSupp);

export default router;