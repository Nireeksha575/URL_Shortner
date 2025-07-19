const express=require('express');
const app=express();
const port=8000;
const path=require("path");
// const ejs=require("ejs");
const url=require("./models/url")
const cookieParser=require("cookie-parser");
const {rescritToLoggedUserOnly,checkAuth}=require("./middlewares/auth");

const URLroute=require("./routes/url");
const StaticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user");

const {ConnectToMOngoDB}=require("./connnection")
ConnectToMOngoDB('mongodb://127.0.0.1:27017/short-URL').then(()=>{
    console.log("MongoDB connected");
})
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

//routes
app.use('/url',rescritToLoggedUserOnly,URLroute);
app.use('/',checkAuth,StaticRoute);
app.use('/user',userRoute)

// app.get('/test',async (req,res)=>{
//     const allUrls=await url.find({});
//     return res.render('home',{
//         urls:allUrls,
//     });
// })

app.get("/url/:shortId",async (req,res)=>{
    const shortId=req.params.shortId;
   const entry=await url.findOneAndUpdate({
       shortId,
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            },
        }
    });
    res.redirect(entry.redirectURL);
})



app.listen(8000,()=>{
    console.log("Server Started at port:"+port);
})