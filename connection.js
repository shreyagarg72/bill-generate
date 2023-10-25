const { default: mongoose } = require("mongoose")

const URL = "mongodb+srv://shreyaggarg72:sg07022003@cluster0.vffsifl.mongodb.net/billAppDatabase?retryWrites=true&w=majority  "
const connection = ()=>{
    mongoose.connect(URL).then(()=>{
        console.log("Database Connected Successfully");
    }).catch(()=>{
        console.log("Database Not Connected");
    })
}

module.exports = connection;