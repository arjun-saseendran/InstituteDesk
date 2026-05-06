import { Schema ,model } from "mongoose";

const studentSchema = new Schema({

  name :{
    type: String,
    required: true,
    minLenght: 3,
    maxLenght:50,

  },
     address :{
         type  : String,
         required : true,
         minLenght : 5,

     },
     mobile: {
        type: String,
        required: true,
        unique: true,
        minLenght: 10,
        maxLenght: 15,
     },
    email : {
        type: String,
        
        unique: true,

    },
    educationQualification :{
        type : String,

    },
    age:{
        type : Number,
    },
    DateOfBirth :{
            type: Date,
    },
    nameOfather :{
          type : String,
          required : true,
          minLenght : 3,
    },
nameOfGardian : {
       type : String,
       required : true,
       minLenght :3
},
relationWithGardian :{
      type : String,
},
occupationOfGardian : {
       type :String,

},
towhichClass : {
        type : Schema.Types.ObjectId,
        ref :"Class",
        require: true,
        index: true
},
previousexpirience :{
     type: String ,
     enum :["YES", "NO"]
},
remark:{
   type: String,

},
termsandconditions:{
    type: Boolean,
    required: true,



},
dateofAdmission:{
    type: Date,
    required: true,

},
admissionNo: {
   type: String,
   required: true,

},
  
}, {timestamps: true}, );

export const Studens = model("Students" ,studentSchema)
