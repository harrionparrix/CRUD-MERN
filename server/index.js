const express = require('express');
const app=express();
const mongoose = require('mongoose');
const cors=require('cors');

const ClientModel=require('./models/Client');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://crudapp123:crudapp123@cluster0.csjhy.mongodb.net/client?retryWrites=true&w=majority',{
    useNewUrlParser: true,
});

app.post("/insert/",async(req,res)=>{
    const gotname = req.body.sentname;
    const gotage=req.body.sentage;
    const gotgender = req.body.sentgender;
const obj=new ClientModel({name: gotname, age: gotage, gender: gotgender});
try{
    await obj.save();
res.send("Hey, data has been saved successfully")}
catch(err){
    console.log(err);
}
});

app.get("/read/",async(req,res)=>{
    ClientModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    });
});


app.put("/update/",async(req,res)=>{
    const newname = req.body.sentnewname;
    const id=req.body.sentid;
  
try{
    await ClientModel.findById(id,(err,updated)=>{
        updated.name=newname;
        updated.save();
        res.send("updated!")
    })}
catch(err){
    console.log(err);
}
});

app.delete("/delete/:todeleteid",async(req,res)=>{
const id=req.params.todeleteid;
await ClientModel.findByIdAndRemove(id).exec();
res.send("deleted");
});

app.listen(3001,()=>{
    console.log('server is running on 3001');
});
