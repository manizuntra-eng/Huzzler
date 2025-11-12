import mongoose  from "mongoose";

const ProfileSchema = new mongoose.Schema({

ProfileName:{
    type:String,
    required:true,
},
About:{
    type:String,
    required:true,
},
Skill:{
    type:[String],
    required:true,
},
Tools:{
    type:[String],
    required:true,
},
AddLinks:{
    type:[String],
    required:true
},
portfolio_ProjectTitle:{
    type:String,
    required:true
},
ProjectDescription:{
     type:String,
    required:true
},
Upload_ProjectURL:{
    type:[String],
    required:true
}
})

const profileModel = mongoose.model("Profilemodel",ProfileSchema);

export default profileModel;