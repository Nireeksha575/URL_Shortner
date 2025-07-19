const express=require("express");
const {handelGenerateShortURL,handelGetAnalytics}=require("../controllers/url");
const router=express.Router();


router.post('/',handelGenerateShortURL);

router.get('/analytics/:shortId',handelGetAnalytics);
 


module.exports=router;