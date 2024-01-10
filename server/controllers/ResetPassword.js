const User = require("../models/User");
const mailSender= require("../utils/mailSender");

exports.resetPasswordToken = async(req, res) => { 

    try{
        const email = req.body.email;

        const user =await User.findOne({email: email});

        if(!user){
            return res.status(402).json({
                success: false,
                message: "User doesnot exists",
            })
        }

        const token = crypto.randomUUID();

        const updatedDetails= await User.findOneAndUpdate({email: email},
                                                        {
                                                            token: token,
                                                            resetPasswordExpires: Date.now()+5*60*1000,
                                                        },
                                                        { new:true }); 

        const url= `https://localhost:3000/update-password/${token}`

        await mailSender(email, "Password reset link", `Click on link to reset password : ${url} `)

        return res.status(401).json({
            success: true,
            message: "email sent successfully",
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending reset password mail",
        })
    }   
}


exports.resetPassword = async(req, res) => {
   try{
    const {password, confirmPassword, token} = req.body;

    if (password!==confirmPassword){
        return res.status(401).json({
            success: false,
            message: "Please enter correct confirmPassword",
        });
    }

    const userDetails = await user.findOne({token: token});

    if(!userDetails){
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        })
    }
    if(userDetails.resetPasswordExpires < Date.now()){
        return res.status(401).json({
            success: false,
            message: "token Expired, Please regenerate your token",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const updatedUser= await User.findOneAndUpdate(
        { token:token}, 
        { password:hashedPassword },
        { new: true });
    
    return res.status(401).json({
        success: true,
        message: "Password reset successful",
    })
   }
   catch(err){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong while, reset password",
        })
   }
}