const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');
const errorResponse = require('../utils/errorResponse');
const { query } = require('express');
const path = require('path');

// @desc Get all getBootcamps
// @route GET /api/v1/bootcamps
// @access Public

exports.getBootcamps =  asyncHandler(async(req,res,next)=>{         


        res.status(200).json(res.advancedResults); 
    
})

// @desc Get single getBootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public

exports.getBootcamp = asyncHandler(async (req,res,next)=>{   

       const bootcamp = await Bootcamp.findById(req.params.id)
       if(!bootcamp)
       {
          return   next(new ErrorResponse(`Bootcamp not found with an id of ${req.params.id}`,404))
       }
       res.status(200).json({success:true,data:bootcamp})
    })

// @desc  Create new bootcamp
// @route POST /api/v1/bootcamps
// @access Private

exports.createBootcamp = asyncHandler(async (req,res,next)=>{


    // Check for published bootcamps
    const publishedBootcamp = await Bootcamp.findOne({ user:req.user.id });

    // If the user is not an admin, they can only add one bootcamp
    
    if(publishedBootcamp && req.user.role !=='admin')
    {
         return next(new ErrorResponse(`The user with ID ${req.user.id} has already published a bootcamp`, 400))
    }


      // Add User
       req.body.user=req.user.id;
    
        const bootcamp = await Bootcamp.create(req.body)
        res.status(200).json({success:true,data:bootcamp}) 
    
})
// @desc  Update new bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private

exports.updateBootcamp = asyncHandler(async (req,res,next)=>{

        let bootcamp = await Bootcamp.findById(req.params.id); 
       
        if(!bootcamp)
        {
            return   next(new ErrorResponse(`Bootcamp not found with an id of ${req.params.id}`,404))
        }

        // Make sure user is a bootcamp owner
        if(bootcamp.user.toString()!==req.user.id && req.user.role!=='admin')
        {
            return next(new ErrorResponse(`User ${req.params.id} is not authorized to update this bootcamp`,401))
        }
        bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        res.status(200).json({success:true,data:bootcamp})     
})

// @desc  Delete bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private

exports.deleteBootcamp = asyncHandler(async (req,res,next)=>{

    
        const bootcamp = await Bootcamp.findById(req.params.id)
        if(!bootcamp)
        {
            return   next(new ErrorResponse(`Bootcamp not found with an id of ${req.params.id}`,404));
        }
        // Make sure user is a bootcamp owner
        if(bootcamp.user.toString()!==req.user.id && req.user.role!=='admin')
        {
            return next(new ErrorResponse(`User ${req.params.id} is not authorized to delete this bootcamp`,401))
        }

        bootcamp.remove();
        res.status(200).json({success:true,data:{}})    
})
// @desc  Get bootcamp within a radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private

exports.getBootcampsInRadius = asyncHandler(async (req,res,next)=>{

    const {zipcode,distance} = req.params;
     
    // get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide dist by radius of earth
    // Earth radius = 3,963 mi / 6,378 km

    const radius = distance / 3963 ;

    const bootcamps = await Bootcamp.find({
            location: { $geoWithin: { $centerSphere : [[lng,lat], radius  ] }  }
    });

    res.status(200).json({

        success:true,
        count:bootcamps.length,
        data:bootcamps
    });
           
})

// @desc Get single getBootcamp
// @route GET /api/v1/bootcamps/bootcamp/:slug
// @access Public

exports.getBootcampBySlug = asyncHandler(async (req,res,next)=>{   

    const bootcamp = await Bootcamp.findOne({slug:req.params.slug}).populate('courses')
    if(!bootcamp)
    {
       return   next(new ErrorResponse(`Bootcamp not found with an id of ${req.params.id}`,404))
    }
    res.status(200).json({success:true,data:bootcamp})
 })

 // @desc Get publisher bootcamp
// @route GET /api/v1/bootcamps/publisher/bootcamp
// @access private

exports.getPublisherBootcamp = asyncHandler(async (req,res,next)=>{ 
    
    
    if(req.user.role!=='publisher')
    {
        return   next(new ErrorResponse(`user ${req.user.id} is not a bootcamp publisher`,401))
    }
    else
    {
    const bootcamp = await Bootcamp.findOne({user:req.user.id}).populate('courses')
    if(!bootcamp)
    {
       return   next(new ErrorResponse(`Bootcamp not found with an id of ${req.params.id}`,404))
    }
    res.status(200).json({success:true,data:bootcamp})
    }
 })

 // @desc  Upload photo for bootcamp
// @route  PUT /api/v1/bootcamps/:id/photo
// @access Private

exports.bootcampPhotoUpload = asyncHandler(async (req,res,next)=>{

    
    const bootcamp = await Bootcamp.findById(req.params.id)
    if(!bootcamp)
    {
        return   next(new ErrorResponse(`Bootcamp not found with an id of ${req.params.id}`,404));
    }

    // Make sure user is a bootcamp owner
    if(bootcamp.user.toString()!==req.user.id && req.user.role!=='admin')
    {
        return next(new ErrorResponse(`User ${req.params.id} is not authorized to update this bootcamp`,401))
    }

    if(!req.files)
    {
        return   next(new ErrorResponse(`Please upload a file`,400));
    }

    const file = req.files.file;
    
    if(!file.mimetype.startsWith('image'))
    {
        return   next(new ErrorResponse(`Please upload an image file`,400));
    }

    if(file.size>process.env.MAX_FILE_UPLOAD)
    {
        return   next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,400));
    }
    // create custom filename

    file.name=`photo_${bootcamp._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err=>{

        if(err)
        {
            console.log(err)
            return next(new ErrorResponse(`Problem with file upload`,500))
        }
    });
    await Bootcamp.findByIdAndUpdate(req.params.id,{photo: file.name})
    res.status(200).json({success:true,data:file.name})    
})
