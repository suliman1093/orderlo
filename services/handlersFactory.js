const {asyncHandler}=require('../middlewares/asyncHandler');
const GlobalErrorHandler = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');

exports.DeleteOne= (Model)=>
    asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        const Doc = await Model.findById(id);
        if(!Doc)
                return next(new GlobalErrorHandler("Doc not found",404));
        await Doc.deleteOne();
        res.status(200).json({status:"SUCCESS",msg:"deleted"});
    });

exports.UpdateOne= (Model)=>
    asyncHandler(async(req,res,next)=>{

        const newDoc = await Model.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!newDoc)
                return next(new GlobalErrorHandler("Doc not found",404));
        newDoc.save();
        res.status(200).json({status:"SUCCESS",data:{newDoc}});
    });

exports.CreateOne= (Model)=>
    asyncHandler(async(req,res,next)=>{
        const newDoc = new Model(req.body)
        await newDoc.save();
        res.status(201).json({status:"SUCCESS",data:{newDoc}})
    });

exports.GetOne= (Model,populationOps)=>
    asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        let query = Model.findById(id);

        if(populationOps) query=query.populate(populationOps);
        const Doc = await query;
        if(!Doc)
                return next(new GlobalErrorHandler("Doc not found",404));
        res.status(200).json({status:"SUCCESS",data:{Doc}});
    });

exports.GetAll= (Model, modelName)=>
    asyncHandler(async(req,res,next)=>{
        let filterObj = {};
        if(req.filteration){
            filterObj = req.filteration;
        };
        const countDocs = await Model.countDocuments();
        const apiFeatures = new ApiFeatures(Model.find(filterObj), req.query)
        .search(modelName)
        .filter()
        .sort()
        .limitFields()
        .paginate(countDocs)
        .buildQuery();
        const {paginateResult , mongooseQuery} = apiFeatures;
        const Docs = await mongooseQuery;
        if(!Docs)
                return next(new GlobalErrorHandler("there is no Docs yet",404));
        res.status(200).json({status:"SUCCESS",result:paginateResult,data:{Docs}});
    });


