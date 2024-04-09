const express=require('express');
const {Userzod, createtodozod, updatetodo} =require('./types');
const {User,Todo}= require('./db');
const jwt=require('jsonwebtoken');
const app=express();
const usermiddleware=require ('./middleware/user');
app.use(express.json());
// app.use(bodyParser.json());

app.post('/signup',(req, res)=>{
    const username = req.headers.username;
    const password = req.headers.password;
    console.log(`Signup request received with username=${username} and password=${password}`);
    // const parse = Userzod.parse(username, password);
    // if (!parse.success) {
    //     console.log(`Signup failed: ${JSON.stringify(parse.error)}`);
    //     return res.status(411).json(parse.error);
    //   }
    //add user to database
    User.create({
        username,
        password
    })
    .then(() => {
        console.log('Signup successful');
        res.json({msg: 'User created Successfully'});
      })
      .catch((err) => {
        console.log(`Signup failed: ${err.message}`);
        res.status(500).send('Internal Server Error');
      });
})


app.post('/signin',async (req, res)=>{
    const username=req.headers.username;
    const password= req.headers.password;
    const userjwt={username:req.headers.username};
    const response= await User.find({
        username:username,
        password:password
    });
    if(response){
        const token=jwt.sign(userjwt,'secretkey');
        res.header('authorizaton',token).json({
            token:token
        })
    }else{
        res.json({
            message:'invalid credentials'
        })
    }
})


app.post('/todo',usermiddleware,(req, res)=>{
    const title=req.body.title;
    const description=req.body.description;
    // const parse=Userzod.parse(title,description);
    // if (!parse.success) {
    //     console.log(`Signup failed: ${JSON.stringify(parse.error)}`);
    //     return res.status(411).json(parse.error);
    //   }
    //add todo to database
    Todo.create({
        title,
        description
    })
    res.json({msg:'User created Successfully'});
})


app.get('/todos',usermiddleware,async (req, res)=>{
    const todos=await Todo.find({});
    res.json({
        todos:todos
    })
})


app.delete('/delete',usermiddleware,async (req, res)=>{
    const id = req.body.id;
    try {
        const result = await Todo.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).send('To-do item not found');
        }
        res.send('To-do item deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})


app.listen(3000,()=>{console.log("Server is running")});