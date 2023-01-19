const express = require('express');
const cors =require('cors')

const pool =require('./db');
const app= express();

app.use(express.json());   //req.body

var corsOptions = {
    origin: "http://localhost:5173"
  };

app.use(cors(corsOptions));

//Routes

//get all todos

app.get('/get',async(req,res)=>{
    try{
        const allTodo = await pool.query("SELECT * FROM todo");
        res.json(allTodo.rows);
    }catch{
        console.err(err.message);
    }
})

//get a todo

app.get('/get/:id',async(req,res)=>{
    try{
        const findTodo = await pool.query("SELECT * FROM todo WHERE todo_id=$1",
        [req.params.id]);
        res.json(findTodo.rows[0]);
    }catch(err){
        console.log("Not Found the todo")
    }
})

//create a todo

app.post('/create',async(req,res)=>{
try{
    const {description,priority }=req.body;
    const newTodo = await pool.query(
        "INSERT INTO todo (description,priority) VALUES ($1,$2) RETURNING *",
        [description,priority]
    )
    res.json(newTodo.rows[0]);
}catch(err){
    console.error(err.message);
}

})

//update a todo

app.put('/update/:id',async(req,res)=>{
try{
    const updatetodo =await pool.query(
        "UPDATE todo SET description = $1 where todo_id= $2",
        [req.body.description, req.params.id]
    );
    let data ={
        "id":req.params.id,
        "description":req.body.description,
        "priority":req.body.priority
    }
    res.json(data);
}catch(err){
    console.log("Id NOT Found")
}
})

//delete a todo

app.delete('/delete/:id',async(req,res)=>{
    try{
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1",
        [req.params.id]);
        res.json(req.params.id);
    }catch(err){
        console.log("Id Not Found");
    }
})

app.listen(3000,()=>{
    console.log("Server running on port 3000");
})