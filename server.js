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

// CREATE
app.post('/users',(req,res)=>{
  const { name, email, password } = req.body.newData
  User.create(
    {
      name,
      email,
      password
    },
    (err, data) => {
      if (err) return res.json({success: false, message: err})
      if (!data) return res.json({succes: false, data: "Not Found"})

      res.json({succes: true, data: data})  
    }
  )
})

app.route('/users/:id')
// READ
.get((req,res)=>{
  User.findById(req.params.id, (err, data) => {
    if (err) return res.json({ success: false, message: err })
    if (!data) return res.json({succes: false, message: "Not Found"})

    res.json({ succes: true,data: data })
  })
})
// UPDATE
.put((req,res)=>{
  // User.findByIdAndUpdate()
})
// DELETE
.delete((req,res)=>{
  // User.findByIdAndDelete()
})