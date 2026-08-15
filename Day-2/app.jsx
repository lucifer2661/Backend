const express=require{"express"};

const app=express();


app.get("/",(req,res)=>{
    res.send("hello world ");
});

app.get("/about",(res,req)=>{
    res.send("this is about page ");

})


app.listen(3000,()=>{
    console.log("Server is running ");
})

