const jwt= require("jsonwebtoken");
require("dotenv").config();
const User= require("../models/User");




exports.auth= async(req, res, next)=>{
    try{
        const token = req.cookies.token||req.body.token||req.header("Authorisation").replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token missing"
            })
        }

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET); 
            console.log(decode);
            req.user=decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
        }
        next();
    }
    catch{error}{
        return res.status(401).json({
            success:false,
            message:"something went wrong while validating token",
        })
    }
}

exports.isStudent = async (req, res, next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Students only"
            })
        }
        next();
    }
    catch(error){
        return res.status(404).json({
            success:false,
            message:"User role cannot be verified, please try again later"
        })
    }
}

exports.isInstructor= async (req, res, next)=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Instructor only"
            })
        }
        next();
    }
    catch(error){
        return res.status(404).json({
            success:false,
            message:"User role cannot be verified, please try again later"
        })
    }
}