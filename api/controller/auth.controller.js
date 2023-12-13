import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
export const signup = async (req,res,next)=>{
   const {username , email , password} = req.body;
   const hashedPassord = bcryptjs.hashSync(password,10);  //to encrypt password
   const newUser = new User({username , email , password:hashedPassord}); //if key and value has same value then we can omit one thing
   try{
       await newUser.save();
       res.status(201).json({message : "User created successfully!"});
   }
   catch(error){
       next(error);
   }

};

export const signin = async(req,res,next) =>{
    const{email,password} = req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404,'User not found'));
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,'Wrong Credentials'));
        const token  = jwt.sign({id:validUser._id} , process.env.JWT_SECRET);  
        const {password:hashedPassord , ...rest} = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        res.cookie('access_token' ,token , {httpOnly : true , expires:expiryDate} )
        .status(200).json(rest); //3rd parameter prevent 3rd party to modify this cookie
    }catch(error){
        next(error);
    }
};