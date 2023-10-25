const express = require('express');
const connection  = require('./connection');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
app.use(express.json())
connection();



app.use('/',cartRoutes);

app.listen(1234,(error)=>{
    if(error){
        console.log("Error Occured!",error);
        // console.log(value) same as system.out.println(value)
    }
    else{
        console.log("server started");
    }
})