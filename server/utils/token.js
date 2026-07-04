import jwt from 'jsonwebtoken';


export const generateToken = (admin , role, res) =>{
      
    try {
        const token = jwt.sign({id: admin._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
         return token;
        
    } catch (error) {

        res.status(500).json({message: error.message || "Internal server error!"}); 
        
    }
}
