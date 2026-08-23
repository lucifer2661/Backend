const express = require("express");
const cors = require("cors");
const noteModel = require("./models/Note.models");

const app = express(); 

app.use(cors()); 
app.use(express.json());



/**
 * -post/api/notes
 * 
 * 
 * 
 */

app.post('/api/notes', async (req, res) => {


    const{title,description}=req.body



  const note = await noteModel.create({
        title, description
    })
   

    res.status(201).json({
        message: "note created succesfully",
        note
    })




})
/**
 * fetch all the notes from databse and show them
 * 
 * 
 */


app.get('/api/notes',async (req,res)=>{
 const notes =await noteModel.find()

 res.status(200).json({
    message:"Notes fetched",
    notes
 })

})

/***
 * -delete notes 
 * unique id for deletion
 * delete note with the id from req-params
 * 
 */
app.delete('/api/notes/:id',async(req,res)=>{
const id=req.params.id;
await noteModel.findByIdAndDelete(id)

console.log(id);

res.status(200).json({
    message:"deleted succesfully"
})



})

/***
 * patch method
 * /api/notes/id
 * update the description of the note by id
 * req.body={description}
 */
app.patch('/api/notes/:id',async (req,res)=>{
    const id = req.params.id;
    const{description}=req.body;


   await noteModel.findByIdAndUpdate(id,{description})
   res.status(200).json({
    message:"note created succesfully"
   })


})



module.exports=app