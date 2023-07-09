const express=require('express')
const app=express()
const PORT=process.env.PORT  || 8000;
const cors=require('cors')
const bodyParser=require('body-parser')
const router=require('./router/Router')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/',
limits: { fieldSize: 2 * 1024 * 1024 } })
require('./connection/connection')
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/api',router);

app.get('/test',(req,res)=>{
    res.send('hhi this is apis');

})

app.listen(PORT,console.log(`server is running on ${PORT}`))
