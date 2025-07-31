const express=require("express");
const router=express.Router();
const URL=require("../models/url");
const { restrictTo } = require("../middlewares/auth");

router.get("/",async(req,res)=>{
    return res.render("home");
});

router.get('/signup',async(req,res)=>{
    return res.render('signup');
});
router.get('/login',async(req,res)=>{
    return res.render('login');
})

router.get('/admin/urls',restrictTo(["ADMIN"]),async(req,res)=>{
    const urls=await URL.find({});
    return res.render("history",{
        urls,
    })
})

router.get("/list",restrictTo(["NORMAL","ADMIN"]),async(req,res)=>{
    const urls=await URL.find({createdBy:req.user._id});
    return res.render("history",{
        urls,
    })
});



module.exports=router;