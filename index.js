const express = require('express');
const mongoose = require('mongoose')
// const mongoURL = 'mongodb://localhost:27017/market'

const Myrouter = require('./routes/Route')

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const app = express();
app.use(express.json())

const port = 44444
app.use('/api',Myrouter)
app.get('/',(rea,res)=>{
    res.send('test')
})
app.listen(port,()=>{
    console.log(`server is running on port${port}`)
})