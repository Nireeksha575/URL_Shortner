const express=require('express');
const {handelUserSignUp,handelUserlogin}=require("../controllers/user");
const router=express.Router();

router.post('/',handelUserSignUp)
router.post('/login',handelUserlogin)

module.exports=router;