const {nanoid}=require("nanoid");
const URL=require("../models/url")

async function handelGenerateShortURL(req,res) {
    const body=req.body;
    if(!body.url) return res.status(400).render("home",{
        msg:"URL is required!!",
    });
    const shortID=nanoid(8);
    URL.create(
        {
            shortId:shortID,
            redirectURL:body.url,
            visitHistory:[],
            createdBy:req.user._id,
        }
    );
    return res.render("home",{
        id:shortID,
    });
}
    

async function handelGetAnalytics(req,res) {
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory});
    
}



module.exports={
    handelGenerateShortURL,
    handelGetAnalytics,
}