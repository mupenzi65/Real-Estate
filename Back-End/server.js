const express=require('express')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const userRoutes=require('./routes/userRoute')
const residencyRoute=require('./routes/residencyRoute')
require('dotenv').config()
const app=express()
app.use(express.json())
const port=process.env.port || 3500

app.use(cors())



app.listen(port ,()=>{
    console.log(`server is listenig on port ${port}....`)
})
app.use('/api/user/',userRoutes)
app.use('/api/residency',residencyRoute)