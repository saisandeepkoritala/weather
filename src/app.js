const path=require("path");
const express=require("express");
const hbs=require("hbs")
const geoCode =require("./utils/geoCode");
const foreCast=require("./utils/foreCast");

const app=express();
const port=process.env.PORT || 3000;

//Define path for Express config
const publicDirectoryPath=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partials")

//Setup handlebars engine and view location
app.set("view engine","hbs")

app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather Page",
        name:"Weather"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        name:"About",
        title:"About Page"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help Page",
        name:"Help"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        res.send({
            error:"You must provide a address"
        })
    }
    else{
        geoCode(req.query.address,(err,data)=>{
            if(err){
                res.send({error:"Cant find that address"})
            }
            else{
                foreCast(data.latitude,data.longitude,data.location,(error,response)=>{
                    if(error){
                        res.send({error})
                    }
                    else{
                        res.send({
                            weather:response.Weather,
                            Temperature:response.Temperature,
                            Location:response
                        })
                    }
                })
            }
            
        })
    }
})

app.get("/products",(req,res)=>{
    if(!req.query.search){
        res.send({
            error:"You must provide a search term"
        })
    }
    else{
        res.send({
            products:[]
        })
    }
})


app.get("/help/*",(req,res)=>{
    res.render("404",{
        errmsg:"Help article not found",
        title:"404"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        errmsg:"Page not found",
        title:"404"
    })
})

app.listen(port,()=>{
    console.log("Server Listening and up on ", port)
})

