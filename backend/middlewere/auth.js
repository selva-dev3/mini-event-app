import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const authMiddlewere = async(req,res,next)=>{
    const token = req.headers.token;
    if(!token){
         return res.json({success: false , message: "Not Authorized Login Again"})
    }

    try{

        const token_decode = jwt.verify(token,process.env.JWT_SECRET,{complete: true})

        const id =token_decode.payload.id;
        req.body ={...req.body,userId:  id}
        next()
    }catch(error){
        res.json({success: false, message: error})

    }
}

export default authMiddlewere;