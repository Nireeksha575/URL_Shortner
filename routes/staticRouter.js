const express=require("express");
const router=express.Router();
const URL=require("../models/url")

router.get("/",async(req,res)=>{
    return res.render("home");
});

router.get('/signup',async(req,res)=>{
    return res.render('signup');
});
router.get('/login',async(req,res)=>{
    return res.render('login');
})

router.get("/list",async(req,res)=>{
    if(!req.user) return res.redirect('/login');    
    const urls=await URL.find({createdBy:req.user._id});
    return res.render("history",{
        urls,
    })
});



module.exports=router;