const express = require('express')
const pool =require('../db');
const task = express.Router();
const {authenticateToken} =require('../middleware/authorization')
//tasks

//get all todos of a user

task.get('/get/:id',authenticateToken,async(req,res)=>{
    try{
        const allTodo = await pool.query("SELECT * FROM todo where user_id=$1",[req.params.id]);

        res.json(allTodo.rows);
    }catch(error){
        console.error(error.message);
    }
})

// get a todo

task.get('/all',authenticateToken,async(req,res)=>{
    try{
        const findTodo = await pool.query("SELECT todo_id,description,priority,(select user_name from users where user_id=t.user_id) FROM todo as t order by user_id, priority;");
        res.json(findTodo.rows);
    }catch(err){
        console.log("Not Found the todo")
    }
})

//create a todo

task.post('/create',async(req,res)=>{
try{
    const {description, priority, user_id }=req.body;
    const newTodo = await pool.query(
        "INSERT INTO todo (description,priority,user_id) VALUES ($1,$2,$3) RETURNING *",
        [description,priority,user_id ]
    )
    res.json(newTodo.rows[0]);
}catch(err){
    console.error(err.message);
}

})

//update a todo

task.put('/update/:id',async(req,res)=>{
try{
    const updatetodo =await pool.query(
        "UPDATE todo SET description = $1 where todo_id= $2",
        [req.body.description, req.params.id]
    );
    
    let data ={
        "todo_id":req.body.todo_id,
        "description":req.body.description,
        "priority":req.body.priority,
        "user_id":req.body.user_id
    }
    res.json(data);
}catch(err){
    console.log("Id NOT Found")
}
})

//delete a todo

task.delete('/delete/:id',authenticateToken,async(req,res)=>{
    try{
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1",
        [req.params.id]);
        res.json(req.params.id);
    }catch(err){
        console.log("Id Not Found");
    }
})

module.exports=task;