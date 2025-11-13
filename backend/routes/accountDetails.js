

import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/accountDetails.js";

const router = express.Router();

router.post("/createaccount", createUser);
router.get("/getuser", getUsers);
router.get("/getuserbyid/:id", getUserById);
router.put("/updateuseraccount/:id", updateUser);
router.delete("/deleteaccount/:id", deleteUser);

export default router;
