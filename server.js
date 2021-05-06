const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const User = require('./models/User')
mongoose.connect('mongodb://localhost/userData')
const port=8000;
const app= express();

app.use(bodyParser.json());


app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})

const sendResponse = (res, err, data) => {
  if (err) return res.json({success: false, message: err})
  if (!data) return res.json({succes: false, data: "Not Found"})

  res.json({succes: true, data: data})  
}

// CREATE
app.post('/users',(req,res)=>{
  User.create(
    {...req.body.newData},
    (err, data) => sendResponse(res, err, data)
  )
})

app.route('/users/:id')
// READ
.get((req,res)=>{
  User.findById(req.params.id, (err, data) => sendResponse(res, err, data))
})
// UPDATE
.put((req,res)=>{
  User.findByIdAndUpdate(
    req.params.id,
    {...req.body.newData},
    { new: true },
    (err, data) => sendResponse(res, err, data)
  )
})
// DELETE
.delete((req,res)=>{
  User.findByIdAndDelete(
    req.params.id,
    (err, data) => sendResponse(res, err, data)
  )
})