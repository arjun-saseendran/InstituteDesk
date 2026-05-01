import jwt from 'jsonwebtoken';


export const generateToken = (user , role, res) =>{
      
    try {
        const token = jwt.sign({id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
         return token;
        
    } catch (error) {

        res.status(error.status || 500).json({error:error.message || "internal server Error"}); 
        
    }
}
