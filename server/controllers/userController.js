import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

// Create a new User

export const createUser = async (req, res) => {
  try {
    // get data from boady
    const { name, address, mobile, email, password, isActive, roll } = req.body;

    // validate user input
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    // chek if user already exist

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    // hash paddword

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const userdata = new User({
      name,
      address,
      mobile,
      email,
      password: hashedPassword,
      isActive,
      roll,
    });

    // save user to databse
    const saveUser = await userdata.save();
    const { password: _, ...userWithoutPassword } = saveUser.toObject();
      
    // respond with success message and user data
      res.status(201).json({
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) =>  {
    try {
      // get user id from params and data from body
      const userId = req.params.userid;
      
      //console.log("params" , req.params);
      

     // console.log("==========User id" , userId);
      
      
      const { name, address, mobile, email, password, isActive, roll } = req.body;

      //  handle valide fileld 
        if(!name || !email || !password) {

          return res.status(400).json({ message: "Name, email and password are required" });
        }

      // find user by id
       const user = await User.findById(userId)

       if(!user)
        {
          return res.status(404).json({ message: "User not found" });
        }

        // update uder data

        user.name = name;
        user.address = address;
        user.mobile = mobile;
        user.email = email;
        // hash password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        user.password = hashedPassword;
        user.isActive = isActive;
        user.roll = roll;

        // save updated user to database
        const updatedUser = await user.save();

        const { password: _, ...userWithoutPassword } = updatedUser.toObject();
        // respond with success message and updated user data
        res.status(200).json({ message: "User updated successfully", user: userWithoutPassword });

    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
}




// get all user

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

   // respond with success message and user data
   res.status(200).json({ message: "Users retrieved successfully", users });

  } catch (error) {

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// get user by id

export const getUserbyId = async (req , res) =>{
  
   try {
       const userid =  req.params.id;

       console.log("user id", userid);
       

       const user = await User.findById(userid).select("-password");

        if(!user)
          {
            return res.status(404).json({ message: "User not found" });
          }

          // resonse with success message and user data
          res.status(200).json({ message : "User retrieved succesdfully" ,user});
           

     
   } catch (error) {

     return res.status(500).json({ error: "Internal Server Error" });
   }

};
 
  export const loginUser = async (req , res) => {
      try {

        
           // get data from  body
        const { email , password } = req.body;
          
        // validate user input
        if(!email || !password)
          {
            return res.status(400).json({ message: "Email and password are required" });
          }

        // check if user exist
        const user = await User.findOne({ email});

          // console.log("User", user);
          
        if(!user)
        {
            return res.status(404).json({ message: "User not found" });
        }
        
        // compare password
        const isMatch = await bcrypt.compare(password , user.password);

          //  console.log("  reach " ,isMatch);

          // console.log(user.password);
          
           
         if(!isMatch) {

            return res.status(400).json({ message: "Invalid Password" });
         }

         // user status check
           if(!user.isActive) {

             return res.status(403).json({ message: "User account is inactive. Please contact administrator." });
           }

           // generate token 
           
           
           const token = generateToken(user , user.roll , res);
         
            // respond with success message and token
              res.cookie("token",token);
            
              const{ password:_, ...userWithoutPassword} = user.toObject();
              
               // response with success message and token
              res.status(200).json({ message: "Login successful", token, user: userWithoutPassword });
        

      } catch (error) {

           return res.status(500).json({ error: "Internal Server Error" });
      }
  };

  export const logoutUser = async (req , res) => {
      try {
         
        // clear the token cookie
         res.clearCookie("token");

         res.status(200).json({message: "Logout Successfully"})



      } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      
  };

  // user varify middleware

  export const verifyUser = async(req , res, )=>{
     try {
      // get token from cookie
      const token = req.cookies.token;
      if(!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
     
      // send response 
      res.status(200).json({ message: "User is authenticated" });

      
     } catch (error) {

       return res.status(500).json({ error: "Internal Server Error" });
     }
  };

  // delete user

  export const deleteUser = async (req , res) => {
      try {

        const { _id } = req.body;

      //console.log("user" , _id);
        

        // find user by id and delete
        const user = await User.findByIdAndDelete(_id);

            
               

        if(!user)
        {
           return res.status(400).json({message: "User not found"})
        }
        
        res.status(200).json({ message: "User deleted successfully" });
        
      } catch (error) {
          
       return res.status(500).json({ error: "Internal Server Error" }); 
      }
  }
  