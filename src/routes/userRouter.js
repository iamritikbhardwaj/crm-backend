import { Router } from "express";
import { createUser, getAllUsers, deleteUser, login } from "../controllers/userController.js";

const router = Router();

router.post("/createUser", createUser);
router.get('/getAllUsers', getAllUsers);
router.delete('/deleteUser/:id', deleteUser);
router.post('/login', login);


export default router;