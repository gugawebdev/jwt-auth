require('dotenv').config()
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = mongoose.connect(process.env.DB_HOST, {useMongoClient:true}).then(()=>{
    console.log('Database connected succesfully!')
}).catch(err =>{
    console.log(`Error: ${err}`)
})


module.exports = db