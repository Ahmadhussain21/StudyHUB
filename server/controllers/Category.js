const Category = require("../models/Category");


exports.createCategory= async(req, res)=>{
    try{
            const {name, description}= req.body;

            if(!name||!description){
                return res.status(401).json({
                    success: false,
                    message: "All fields are mandatory",
                })
            }

            const categoryDetails = await Category.create({
                name:name,
                description:description,
            })
            console.log(categoryDetails);

            return res.status(200).json({
                success: true,
                message: "category created successfully",
            })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "something went wrong while creating category",
        })
    }

}

exports.showAllcategorys= async(req, res)=>{
    try{
           const allcategorys= await Category.find({},{name:true, description:true});

            return res.status(200).json({
                success: true,
                message: "All category returned successfully",
                allcategorys,
            })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "something went wrong while fetching category",
        })
    }

}