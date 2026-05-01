import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLenght: 3,
    maxLenght:50,

  },
   address :{
       type : String,
          
   },
   mobile :{
      type : String,
      unique : true,
   },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,


  },
  password: {
    type: String,
    required: true,
    minLenght: 6,
  },
   isActive : {
     type : Boolean,
     default : null,
   },
   roll :{
     type : String,
      enum : ["admin", "limited" ]
   } 
}, {
  timestamps: true,
});


export const User = model("User", userSchema);

