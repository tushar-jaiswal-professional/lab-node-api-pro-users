const express = require('express')
const app = express()
const mongoose = require('mongoose')
const DBSchema = require('./schema')

app.use(express.json())

const url = 'mongodb+srv://guddu1777:guddu1777@cluster0.10xk0lk.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(url)
.then(()=>console.log('Db connected'))
.catch((err)=>console.log(err))

app.get('/api/users',async function(req,res){

    try{
        const result = await DBSchema.find()
        res.send(result)
    }
    catch(err){
        console.log(err)
    }

})
app.post('/api/users',async function(req,res){

    try{
        const result = await DBSchema.create(req.body)
        res.send('Data Inserted')
    }
    catch(err){
        console.log(err)
    }

})
app.get('/api/users/:id',async function(req,res){

    try{
        const ID = parseInt(req.params.id)
        const result = await DBSchema.findOne({prograd_id:ID})
        res.send(result)
    }
    catch(err){
        console.log(err)
    }

})
app.put('/api/users/:id', async function(req,res){
    
    const ID = parseInt(req.params.id)
    try{
       
        const user = await DBSchema.findOne({prograd_id:ID})
        if(user){
            let updatedUser = await DBSchema.updateMany({prograd_id:ID},{$set:{name:req.body.name}})
            res.json({
                message: 'Record Updated',
                
            })
        }
        else{
            res.json({
                message: 'Record not found',
            })
        }
    }
    catch(err)
    {
        console.log(err)
    }
})

app.delete('/api/users/:id', async function(req,res){
    
    const ID = parseInt(req.params.id)
    try{
       
        const user = await DBSchema.findOne({prograd_id:ID})
        if(user){
            let updatedUser = await DBSchema.deleteOne({prograd_id:ID})
            res.json({
                message: 'Record Deleted',
                
            })
        }
        else{
            res.json({
                message: 'Record not found',
            })
        }
    }
    catch(err)
    {
        console.log(err)
    }
})

app.listen(3001,()=>console.log('Server is running on port 3001'))