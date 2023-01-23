const express = require('express');
const cors =require('cors')
const dotenv =require('dotenv')
const cookieParser = require('cookie-parser')
const task = require('./routers/task')
const user = require('./routers/user')
const auth = require('./routers/auth')

const app= express();
dotenv.config();

app.use(express.json());   //req.body

var corsOptions = {
    credentials:true,
    origin: "http://localhost:5173"
  };

app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/auth',auth);
app.use('/task',task);
app.use('/user',user);


app.listen(3000,()=>{
    console.log("Server running on port 3000");
})