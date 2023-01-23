const express = require('express')
const bcrypt = require('bcrypt')
const pool =require('../db');
const {authenticateToken} =require('../middleware/authorization');
const { CommandCompleteMessage } = require('pg-protocol/dist/messages');

const user = express.Router();


//get all active user
user.get('/',authenticateToken,async(req,res)=>{
    try{
        const newUser = await pool.query("SELECT * FROM users ORDER BY user_id;");
        res.json(newUser.rows);
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
//gets the users in delete_user database
user.get('/deleteUser',authenticateToken,async(req,res)=>{
    try{
        const newUser = await pool.query("SELECT * FROM delete_users ORDER BY user_id;");
        res.json(newUser.rows);
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
//returns the user_name and count of tasks
user.get('/list',authenticateToken,async(req,res)=>{
    try{
        const newUser = await pool.query("select count(t.todo_id),u.user_name from todo as t right join users as u on u.user_id=t.user_id group by u.user_id order by count(t.todo_id);");
        res.json(newUser.rows);
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
//creates user
user.post('/',async(req,res)=>{
    try{
        const {user_id,user_name,user_password}=req.body;
        
        
        const users = await pool.query("SELECT user_id FROM users WHERE user_id=$1 ;",
        [user_id]);
        if(users.rows.length!==0) return res.status(400).json({error:"Id Already Exists"});
        const hashedPassword = await bcrypt.hash(user_password,10);
        const newUser = await pool.query(
            "insert into users (user_id,user_name,user_password,user_type) values ($1,$2,$3,2) RETURNING *;",
            [user_id,user_name,hashedPassword]
        )
        res.json(newUser.rows[0]);
    }catch(error){
        res.status(500).json({error:error.message});

    }
})

//get user by user_id
user.get('/:id',authenticateToken,async(req,res)=>{
    try{
        
        const newUser = await pool.query("SELECT * FROM users WHERE user_id=$1 ;",
        [req.params.id]);
        
        res.json(newUser.rows[0]);
    }catch(error){
        res.status(500).json({error:error.message});
    }
})

//updates user
user.put('/:id',async(req,res)=>{
    try{
        const {user_name,user_password}=req.body;
        let data= '';
        let s=[]
        if(user_name!=null && user_password!=null)
        {
            const hashedPassword = await bcrypt.hash(user_password,10);
            data="UPDATE users SET user_name = $1,user_password=$2 where user_id= $3"
            s=[user_name,hashedPassword,req.params.id]

        } 
        else if(user_name!=null){
            data="UPDATE users SET user_name = $1 where user_id= $2"
            s=[user_name,req.params.id]
            
        }else if(user_password!=null){
            const hashedPassword = await bcrypt.hash(user_password,10);
            s=[hashedPassword,req.params.id]
            data="UPDATE users SET user_password=$1 where user_id= $2"
            
        }
        const updateuser =await pool.query(data,s);
        
        res.send();
    }catch(err){
        console.log("Id NOT Found")
    }
    })

//deletes user from the users database and adds to the delete_users database
user.delete('/:id',authenticateToken,async(req,res)=>{
    
    try{
        
        await pool.query("insert into delete_users select * from users where user_id=$1;",
        [req.params.id]);
        const newUser = await pool.query("DELETE FROM users where user_id=$1 ;",
        [req.params.id]);
        await pool.query("DELETE FROM todo where user_id=$1 ;",
        [req.params.id]);
        
        res.json(newUser.rows);
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
//makes inactive user active
user.delete('/deleteUser/:id',authenticateToken,async(req,res)=>{
    try{
        await pool.query("insert into users (select * from delete_users where user_id=$1);",
        [req.params.id]);
        const newUser = await pool.query("DELETE FROM delete_users where user_id=$1 ;",
        [req.params.id]);
        
        res.json(newUser.rows);
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
module.exports=user;