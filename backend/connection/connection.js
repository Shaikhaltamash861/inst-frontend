const mongoose =require('mongoose')

const URL='mongodb+srv://altamash2c2:instakilogram@cluster0.ejaunc0.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(URL)
.then(()=>{
    console.log('database is connected')
})
.catch((err)=>{
    console.log(err)
})