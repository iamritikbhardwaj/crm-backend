import { Router } from "express";
import {
  createUser,
  getAllUsers,
  deleteUser,
  handleUserLogin,
} from "../controllers/userController.js";
import {
  createAgent,
  getAllAgents,
  deleteAgent,
} from "../controllers/agentController.js";
import {
  createSupp,
  getAllSupp,
  deleteSupp,
} from "../controllers/suppController.js";
import {
  createDest,
  getAllDest,
  deleteDest,
} from "../controllers/destController.js";
import {
  createTrip,
  getAllTrip,
  updateOps,
  updateTripStatus,
} from "../controllers/tripController.js";
import {
  createBooking,
  getAllBooking,
  deleteBooking,
  getDoc,
} from "../controllers/bookingController.js";
import {
  createPayment,
  getAllPayments,
  deletePayment,
} from "../controllers/paymentController.js";
import {
  createRecon,
  getAllRecon,
  deleteRecon,
} from "../controllers/reconController.js";
import {
  createSuppPay,
  deleteSuppPay,
  getAllSuppPay,
} from "../controllers/supPayCont.js";
import { upload } from "../middlewares/multer.js";
import expressAsyncHandler from "express-async-handler";
import path from "path";
import { uploadOnS3 } from "../middlewares/s3.js";

const router = Router();

// ! user
router.post("/createUser", createUser);
router.get("/getAllUsers", getAllUsers);
router.delete("/deleteUser/:id", deleteUser);

// ! login
router.post("/login", handleUserLogin);

// ! destination
router.post("/createDestination", createDest);
router.get("/getAllDestinations", getAllDest);
router.delete("/deleteDestination/:id", deleteDest);

// ! trip
router.post(
  "/createTrip",
  upload,
  expressAsyncHandler(async (req, res, next) => {
    const files = req.files; // Multer stores files in req.files
    console.log(files, "Files uploaded");

    if (!files) {
      return next();
    }

    let url = [];

    for (const field in files) {
      for (const file of files[field]) {
        const filePath = path.resolve(file.path);
        const fileName = new String(file.filename + file.originalname).replace(/^a-zA-Z0-9_-/, "");

        // Upload to Cloudinary
        const fileUrl = await uploadOnS3(filePath, fileName);
        console.log("Uploaded file URL:", fileUrl);
        url.push(fileUrl); // Collect the uploaded file URLs
      }
    }
    createTrip(req, res, url);
  }),
  createTrip
);
router.get("/getAllTrips", getAllTrip);
router.post("/updateStatus", updateTripStatus);
router.post("/updateOps", updateOps);

// ! booking
router.post(
  "/createBooking",
  upload,
  expressAsyncHandler(async (req, res) => {
    const files = req.files; // Multer stores files in req.files
    console.log(files, "Files uploaded");

    if (!files) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    let url = [];

    for (const field in files) {
      for (const file of files[field]) {
        const filePath = path.resolve(file.path);
        const fileName = file.filename + file.fieldname;

        // Upload to Cloudinary
        const fileUrl = await uploadOnS3(filePath, fileName);
        console.log("Uploaded file URL:", fileUrl);
        url.push(fileUrl); // Collect the uploaded file URLs
      }
    }
    createBooking(req, res, url);
  })
);
router.get("/getAllBookings", getAllBooking);
router.delete("/deleteBooking/:id", deleteBooking);

// ! agent
router.post("/createAgent", createAgent);
router.get("/getAllAgents", getAllAgents);
router.delete("/deleteAgent/:id", deleteAgent);

// ! supplier
router.post("/createSupplier", createSupp);
router.get("/getAllSuppliers", getAllSupp);
router.delete("/deleteSupplier/:id", deleteSupp);

// ! payment
router.post("/createPayment", createPayment);
router.get("/getAllPayments", getAllPayments);
router.delete("/deletePayment/:id", deletePayment);

// ! recon
router.post("/createRecon", createRecon);
router.get("/getAllRecons", getAllRecon);
router.delete("/deleteRecon/:id", deleteRecon);

// ! supPay
router.post("/createVendor", createSuppPay);
router.get("/getAllVendors", getAllSuppPay);
router.delete("/deleteVendor/:id", deleteSuppPay);

export default router;
