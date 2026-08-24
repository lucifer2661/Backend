const express= require('express')
const noteModal=require("./Models/Notes.model")



const app =express()
app.use(express.json()); // ✅ CORRECT (invoked with brackets)



/**
 post/notes
 re,body-title ,description 
 */
app.post("/notes", async (req, res) => {
  const { title, description,age } = req.body;

  const note = await noteModal.create({
    title,
    description,
    age
  });

  res.status(201).json({
    message: "Note created successfully",
    note
  });
});

/**
 get/notes
 read the notes 
 use find() method 
 */


 app.get("/notes",async(req,res)=>{
     
 const notes= await noteModal.find()

 res.status(200).json({
    message: "Notes fetched succesfully",
    notes
 })


 })




/**
 server ko crate krna
 */

 module.exports=app;