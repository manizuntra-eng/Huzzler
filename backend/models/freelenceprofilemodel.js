import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  ProfileName: {
    type: String,
    required: true,
    trim: true,
  },

  About: {
    type: String,
    required: true,
  },

  Skill: {
    type: [String],
    required: true,
  },

  Tools: {
    type: [String],
    required: true,
  },

  AddLinks: {
    type: [String],
    required: false,
  },

  portfolio_ProjectTitle: {
    type: String,
    required: true,
  },

  ProjectDescription: {
    type: String,
    required: true,
  },

  Upload_ProjectURL: {
    type: [String],
    required: true,
  },
},
{ timestamps: true }
);

const freelanceProfilemodel = mongoose.model("freelanceProfile", profileSchema);
export default freelanceProfilemodel
