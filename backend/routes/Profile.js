import express from 'express';
import { createProfile, deleteProfile, getAllprofile, getProfileById, updateprofile } from '../controllers/Profile.js';

const profileRouter = express.Router();

profileRouter.post("/createprofile",createProfile);
profileRouter.get("/getprofile",getAllprofile);
profileRouter.get("/getprofileupdatebyid/:id",getProfileById);
profileRouter.put("/getprofileupdate/:id",updateprofile);
profileRouter.delete("/deleteprofilebyid/:id",deleteProfile)

export default profileRouter;