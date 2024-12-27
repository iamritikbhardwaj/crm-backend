import { Router } from "express";
import { createUser, getAllUsers, deleteUser, login } from "../controllers/userController.js";

const router = Router();

// ! user
router.post("/createUser", createUser);
router.get('/getAllUsers', getAllUsers);
router.delete('/deleteUser/:id', deleteUser);

// ! login
router.post('/login', login);

// ! destination
router.post("/createDestination", createUser);
router.get('/getAllDestinations', getAllUsers);
router.delete('/deleteDestination/:id', deleteUser);

// ! trip
router.post("/createTrip", createUser);
router.get('/getAllTrips', getAllUsers);
router.delete('/deleteTrip/:id', deleteUser);

// ! booking
router.post("/createBooking", createUser);
router.get('/getAllBookings', getAllUsers);
router.delete('/deleteBooking/:id', deleteUser);

// ! agent
router.post("/createAgent", createUser);
router.get('/getAllAgents', getAllUsers);
router.delete('/deleteAgent/:id', deleteUser);

// ! supplier 
router.post("/createSupplier", createUser);
router.get('/getAllSuppliers', getAllUsers);
router.delete('/deleteSupplier/:id', deleteUser);

export default router;