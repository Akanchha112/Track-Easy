const express=require('express');
const {Userzod, createtodozod, updatetodo} =require('./types');
const {User,todo}= require('./db');
const app=express();
app.use(express.json);


app.post('/signup',()=>{
    const username=req.body.username;
    const password=req.body.password;
    const parse=Userzod.parse(username,password);
    if(!parse.success) return res.status(411).json(parse.error);
    //add user to database
    User.create({
        username,
        password
    })
    res.json({msg:'User created Successfully'});
})


app.post('signin',()=>{

})


app.post('/todo',()=>{
    const title=req.body.title;
    const description=req.body.description;
    const parse=Userzod.parse(title,description);
    if(!parse.success) return res.status(411).json(parse.error);
    //add todo to database
    todo.create({
        title,
        description
    })
    res.json({msg:'User created Successfully'});
})


app.get('/todos',()=>{

})


app.delete('/delete',()=>{

})


app.listen(3000,()=>{console.log("Server is running")});