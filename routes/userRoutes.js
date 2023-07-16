import express from "express";
import {
  getAllUsers,
  registerController,
  loginController,
  getUserById
} from "../controller/userController.js";

//router object
const router = express.Router();

// GET ALL USERS || GET
router.get("/all-users", getAllUsers);
router.get("/get-user/:id", getUserById);

// CREATE USER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

// module.exports = router;
export default router;
