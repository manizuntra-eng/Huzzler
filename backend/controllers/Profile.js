import profileModel from "../models/ProfileModel.js";

export const createProfile = async (req, res) => {

  try {
    const profile = new profileModel(req.body);
    await profile.save();
    res.status(200).json({ message: "profile created successfully", profile });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json(
      {
       message: "Server error", 
       error: error.message
       });
  }
};


export const getAllprofile = async (req, res) => {
  try {
    const profile = await profileModel.find();
    res.status(200).json({
      profile:profile
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getProfileById = async (req, res) => {
  try {
    const profile = await profileModel.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: "profile not found" });
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profle:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateprofile = async (req, res) => {
  try {
    const profile = await profileModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!profile) return res.status(404).json({ message: "profile not found" });
    res.status(200).json({ message: "profile updated successfully",profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteProfile = async (req, res) => {
  try {
    const profile = await profileModel.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).json({ message: "profile not found" });
    res.status(200).json({ message: "profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

