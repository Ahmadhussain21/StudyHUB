const Profile = require("../models/Profile");
const User = require("../models/User");

exports.UpdateProfile= async(req,res)=>{
    try{
            const {dateOfBirth="", about="", contactNumber, gender}= req.body;

            const id= req.user.id;

            if(!contactNumber||!gender||!id){
                return res.status(400).json({
                    success:false,
                    message:"All fields are required",
                })
            }

            const userDetails= await User.findById(id);
            const profileId= userDetails.additionalDetails;
            const profileDetails= await Profile.findById(profileId);

            profileDetails.dateOfBirth=dateOfBirth;
            profileDetails.about=about;
            profileDetails.contactNumber=contactNumber;
            profileDetails.gender=gender;

            await profileDetails.save();

            return res.status(200).json({
                success:true,
                message:"Profile Updated successfully",
                profileDetails,
            })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"something went wrong while updating profile"
        })
    }
};

exports.deleteAccount= async (req,res) => {
        try{

            const id=req.user.id;

            const userDetails= await User.findById(id);
            if(!userDetails){
                return res.status(400).json({
                    success:false,
                    message:"User not found",
                });
            }

            await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

            //Todo: remove userId from course Student enrolled;

            await User.findByIdAndDelete({_id:id});

            return res.status(200).json({
                success:true,
                message:"user Account deleted Successfully"
            })
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:'User cannot be deleted, Please try again later'
            })
        }
}


exports.getAllUserDetails= async(req, res)=>{
    try{
          const id= req.user.id;

          const userDetails = await User.findById(id).populate("additionalDetails").exec();

          return res.status(200).json({
            success: true,
            message: "User Details fectched Successfully",
            data: userDetails
        })


    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "something went wrong while fetching User Details",
        })
    }
}