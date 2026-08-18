const express = require('express');

const app = express(); // 1. Create app first!
app.use(express.json()); // 2. Then use the middleware!

const notes = [];

app.get("/", (req, res) => {
    res.send("hello world");
});

app.post("/notes", (req, res) => {
  
    notes.push(req.body);
    res.send("note created");  
     console.log(notes);
  });

app.get("/notes",(req,res)=>{

  res.send(notes);
});
app.delete("/notes/:index", (req, res) => {
 
  delete notes[ req.params.index ];
   res.send("deleted succesfully");      
});

app.patch("/notes/:index",(req,res)=>{

  notes[req.params.index].description=req.body.description;


res.send("Note updated Succesfully")
})






module.exports = app;