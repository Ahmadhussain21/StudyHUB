const Tag = require("../models/tags");


exports.createTag= async(req, res)=>{
    try{
            const {name, description}= req.body;

            if(!name||!description){
                return res.status(401).json({
                    success: false,
                    message: "All fields are mandatory",
                })
            }

            const tagDetails = await Tag.create({
                name:name,
                description:description,
            })
            console.log(tagDetails);

            return res.status(200).json({
                success: true,
                message: "tag created successfully",
            })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "something went wrong while creating tags",
        })
    }

}

exports.showAllTags= async(req, res)=>{
    try{
           const allTags= await Tag.find({},{name:true, description:true});

            return res.status(200).json({
                success: true,
                message: "All tags returned successfully",
                allTags,
            })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "something went wrong while fetching tags",
        })
    }

}