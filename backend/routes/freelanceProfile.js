
// freelanceProfile.js
import express from "express";
import { createfreelenceProfile, deletefreelenceProfile, getfreelenceProfileById, getfreelenceProfiles, updatefreelenceProfile } from "../controllers/freelanceprofilecontroller.js";

const freelanceProfilerouter = express.Router();

// Routes
freelanceProfilerouter.post("/createfreelenceProfiles",createfreelenceProfile );
freelanceProfilerouter.get("/getfreelenceProfiles", getfreelenceProfiles);
freelanceProfilerouter.get("/getfreelenceProfileById/:id",getfreelenceProfileById);
freelanceProfilerouter.put("/updatefreelenceProfile/:id", updatefreelenceProfile);
freelanceProfilerouter.delete("/deletefreelenceProfile/:id",deletefreelenceProfile);

export default freelanceProfilerouter;