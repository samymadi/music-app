const express = require('express');
const axios = require('axios');
const { nextTick } = require('process');
const app = express();



app.use((req,res)=>{

    const rand= Math.random()*100;
    req.body = {rand}; 
    res.setHeader("Access-Control-Allow-Origin","*")
    
    axios.get('https://api.deezer.com/artist/27').
    then(result=> res.send(result.data))
    .catch(err=>res.status(500).send(err));
    
})




app.listen(4000,()=>console.log("server started"))