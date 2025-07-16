const mongoose = require('mongoose')

connectionString = process.env.CONNECTIONSTRING

mongoose.connect(connectionString).then((res)=>{
    console.log("MongoDB Connected Successfully");
    
}).catch(err=>{ 
    console.log("MongoDB Connection Failed");
    console.log(err);
})