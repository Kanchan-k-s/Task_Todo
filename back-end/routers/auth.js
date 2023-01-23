const express = require('express')
const bcrypt = require('bcrypt')
const pool =require('../db');
const jwt = require('jsonwebtoken')

const jwtTokens = require ('../utils/jwt-helper')

const auth = express.Router();

//for login

auth.post('/login',async(req,res)=>{
    try{
        const {id,password} = req.body;
        const users = await pool.query('SELECT * FROM users WHERE user_id=$1 ;',[id]);
        if(users.rows.length===0) return res.status(404).json({error:"Id or Password is incorrect"});

        const validPassword = await bcrypt.compare(password,users.rows[0].user_password);
        if(!validPassword) return res.status(404).json({error:'Id or Password is incorrect'});
        //JWT
        let tokens= jwtTokens(users.rows[0]);
        res.cookie('refresh_token',tokens.refreshtoken,{httpOnly:true});
        res.json({tokens,users});

    }catch(error){
        res.status(401).json()
    }
})

//for logout

auth.delete('/logout',(req,res)=>{
    try{
        res.clearCookie('refresh_token');
        return res.status(200).json({message:'Logout'})

    }catch(error){
        res.status(401).json({error:error.message})
    }
})

module.exports=auth;