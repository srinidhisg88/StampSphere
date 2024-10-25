const express=require('express')
const app=express()
const connectDb=require('./config/db')
const cors=require('cors')
connectDb()
app.use(express.json())

require('dotenv').config()
const PORT=process.env.PORT||5000

app.use(cors({origin:[`http://localhost:${PORT}`],credentials:true}))


app.listen(PORT,()=>{console.log(`server running on port ${PORT} `)})
app.get('/',(req,res)=>{
    // console.log('index route')
    res.send('index route')
})
