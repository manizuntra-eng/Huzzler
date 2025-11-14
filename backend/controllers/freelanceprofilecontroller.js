import freelanceProfilemodel from "../models/freelenceprofilemodel.js";


// Create freelenceProfile
export const createfreelenceProfile = async (req, res) => {
  try {
    const freelenceprofile = await freelanceProfilemodel.create(req.body);

    res.status(201).json({
      success: true,
      message: "freelenceProfile created successfully",
      data: freelenceprofile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create freelenceprofile",
      error: error.message,
    });
  }
};

// Get All freelenceProfiles
export const getfreelenceProfiles = async (req, res) => {
  try {
    const freelenceprofiles = await freelanceProfilemodel.find();

    res.status(200).json({
      success: true,
      data: freelenceprofiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch freelenceprofiles",
      error: error.message,
    });
  }
};

// Get Single freelenceProfile
export const getfreelenceProfileById = async (req, res) => {
  try {
    const freelenceprofile = await freelanceProfilemodel.findById(req.params.id);

    if (!freelenceprofile) {
      return res.status(404).json({
        success: false,
        message: "freelenceProfile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: freelenceprofile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch freelenceprofile",
      error: error.message,
    });
  }
};

// Update freelenceProfile
export const updatefreelenceProfile = async (req, res) => {
  try {
    const freelenceprofile = await freelanceProfilemodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!freelenceprofile) {
      return res.status(404).json({
        success: false,
        message: "freelenceProfile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "freelenceProfile updated successfully",
      data: freelenceprofile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update freelenceprofile",
      error: error.message,
    });
  }
};

// Delete freelenceProfile
export const deletefreelenceProfile = async (req, res) => {
  try {
    const freelenceprofile = await freelanceProfilemodel.findByIdAndDelete(req.params.id);

    if (!freelenceprofile) {
      return res.status(404).json({
        success: false,
        message: "freelenceProfile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "freelenceProfile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete freelenceprofile",
      error: error.message,
    });
  }
};
