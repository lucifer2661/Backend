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
 server ko crate krna
 */

 module.exports=app;