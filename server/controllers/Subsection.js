const SubSection =require("../models/SubSection");
const Section = require("../models/Section");
const {uploadImageToCloudinary}= require("../utils/imageUploader");


exports.createSubSection = async(req,res)=>{

    try{
        const{title, description, timeDuration,sectionId}= req.body;

        const video= req.files.videoFile;

        if(!sectionId||!title||!description||!timeDuration ||!video){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            });
        }

        const uploadVideoDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        const newSubSection = await SubSection.create({
            title:title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadVideoDetails.secure_url,
        });

        const updatedSection = await Section.findByIdAndUpdate(
                                                            {_id:sectionId},
                                                            {
                                                                $push:{
                                                                    subSection: newSubSection._id
                                                                }
                                                            },
                                                            {new:true}
                                                            ).populate({
                                                                path: "subSection",
                                                            })
                                                            .exec();
        return res.status(200).json({
                    success:true,
                    message:"SubSection created & Section updated successfully",
                    data:updatedSection,
        })
        }
    catch(err){

        return res.status(500).json({
            success:false,
            message:"Unable to create subsection, please try again later",
            error: err.message,
        });

    }

}




exports.updateSubSection = async(req,res)=>{

    try{
        
        const { sectionId, subSectionId, title, description } = req.body
        const subSection = await SubSection.findById(subSectionId)

        if (!subSection) {
        return res.status(404).json({
            success: false,
            message: "SubSection not found",
        })
        }

        if (title !== undefined) {
        subSection.title = title
        }

        if (description !== undefined) {
        subSection.description = description
        }
        if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
        }

        await subSection.save()

        // find updated section and return it
        const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
        )

        console.log("updated section", updatedSection)

        return res.json({
        success: true,
        message: "Section updated successfully",
        data: updatedSection,
        })
    

    }
    catch(err){

        return res.status(500).json({
            success:false,
            message:"Unable to update subSection, please try again later",
            error: err.message,
        });

    }

}


exports.deleteSubSection = async(req,res)=>{

    try{
        const {subsectionId}= req.params;
        
        if(!subsectionId){
            return res.status(401).json({
                success:false,
                message:"Missing Properties"
            });
        }

        await SubSection.findByIdAndDelete(subSectionId);

            return res.status(200).json({
                success:true,
                message:"subSection delete successfully",
            });
    

    }
    catch(err){

        return res.status(500).json({
            success:false,
            message:"Unable to delete subSection, please try again later",
            error: err.message,
        });

    }

}