const Course=require("../models/Course");
const Tags=require("../models/Tags");
const User= require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader")


exports.createCourse = async (req, res) =>{
    
    try{
        const {courseName, courseDescription, whatYouWillLearn, Price, tag}= req.body;

        const thumbnail = req.files.thumbnailImage;

        if(!courseName|| !courseDescription|| !whatYouWillLearn || !Price || !tag|| !thumbnail ){
            return res.status(401).json({
                success: false,
                message: "Please fill all course details",
            })
        }
        

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("instructor Details: ", instructorDetails);

        if(!instructorDetails){
            return res.status(401).json({
                success: false,
                message: "Instructor details not found",
            })
        }

        const tagDetails = await Tags.findById({tag});
        if(!tagDetails){
            return res.status(404).json({
                success:false,
                message: "tag Details not found"
            })
        }

        const thumbnailImage= await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse= await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })

        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses: newCourse._id,
                }
            },
            {new:true},
            )
        await Tags.findByIdAndUpdate(
            {_id:newCourse.tag},
            {
                $push:{
                    courses: newCourse._id,
                },
            },
            {new:true},
        );
        return res.status(200).json({
            success:success,
            message: "course created successfully",
            data:newCourse
        });
        
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message: "something went wrong while creating course"
        })
    
    }
}

exports.getAllCourses= async(req, res)=>{
    try{
           const allCourses= await Course.find({},{courseName:true, 
                                                    price:true,
                                                    thumbnail:true,
                                                    instructor:true,
                                                    ratingAndReviews:true,
                                                    studentsEnrolled:true,}) 
                                                    .populate("instructor")
                                                    .exec();
            return res.status(200).json({
                success: true,
                message: "All tags returned successfully",
                data:allCourses,
            })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "something went wrong while fetching courses",
        })
    }
}