const Section=require("../models/Section")
const Course=require("../models/Course")

exports.createSection = async(req,res)=>{

    try{
        const{sectionName,courseId}= req.body;

        if(!sectionName||!courseId){
            return res.status(401).json({
                success:false,
                message:"Missing Properties"
            });
        }

        const newSection = await Section.create({sectionName});

        const updatedCourse = await Course.findByIdAndUpdate(
                                                            courseId,
                                                            {
                                                                $push:{
                                                                    courseContent: newSection._id
                                                                }
                                                            },
                                                            {new:true}
                                                            ).populate({
                                                                path: "courseContent",
                                                                populate: {
                                                                    path: "subSection",
                                                                },
                                                            })
                                                            .exec();
    return res.status(200).json({
                success:true,
                message:"Section updated successfully",
                data:updatedCourse,
    })

    }
    catch(err){

        return res.status(500).json({
            success:false,
            message:"Unable to create section, please try again later",
            error: err.message,
        });

    }

}


exports.updateSection = async(req,res)=>{

    try{
        const {sectionName, sectionId}= req.body;
        
        if(!sectionName||!sectionId){
            return res.status(401).json({
                success:false,
                message:"Missing Properties"
            });
        }

        const updatedSection = await Section.findByIdAndUpdate(
            sectionId, {sectionName}, {new:true});

            return res.status(200).json({
                success:true,
                message:"section updated successfully",
                data:updatedSection,
            });
    

    }
    catch(err){

        return res.status(500).json({
            success:false,
            message:"Unable to update section, please try again later",
            error: err.message,
        });

    }

}


exports.deleteSection = async(req,res)=>{

    try{
        const {sectionId}= req.params;
        
        if(!sectionId){
            return res.status(401).json({
                success:false,
                message:"Missing Properties"
            });
        }

        await Section.findByIdAndDelete(sectionId);

            return res.status(200).json({
                success:true,
                message:"section delete successfully",
            });
    

    }
    catch(err){

        return res.status(500).json({
            success:false,
            message:"Unable to delete section, please try again later",
            error: err.message,
        });

    }

}