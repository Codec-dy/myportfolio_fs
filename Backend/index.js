const express = require('express');
const libraries = require('./libraries/mainLib');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const multer = require('multer');
var bodyParser = require('body-parser');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const formData = require('express-form-data')
const os = require('os')
dotenv.config();

var database = new libraries.database();
var Email = new libraries.email();
// var storage = new libraries.fileUpload().storage()

//Sending Email to me
app.use(cors());
app.use(express.json());
app.post('/api/sendmessageapi', (req, res) => {
    const { name, email, data } = req.body;
    if (name && email && data) {
        console.log(name, email, data);
        const mailOptions = {
            from:email,
            to: process.env.EMAIL,
            subject: name+': Sent From Portfolio',
            text: data
        }
        try{
        Email.sendMail(mailOptions);
        res.send("Email sent successfully");
        }catch(e){
            res.send(e);
        }
    }else{
        res.send("Email not sent. Please fill in all fields");
    }
    
});


//Logining in as an admin
app.use(cors());
app.use(express.json());
app.post('/admin', async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {    
        try{
            const admin = await database.findOne(database.adminModel(),{ email: email, password: password });

            if(admin){
                res.send(true);
            }else {
                res.send(false);
            }
        }catch(e){
            res.send(false);
        }
    } else {
        res.send(false);
    }
    
});


app.use(cors());
app.use(express.json());
app.post('/admin/dashboard', (req, res) => {
    const { email, password } = req.body;
    console.log(email,password)
    if (email === 'yormda01@luther.edu' && password === 'Banmein!@#$5') {
        res.send(true);
    } else {
        res.send(false);
    }
    
});


//testing
app.use(cors());
app.use(express.json());
app.get('/api/collection',async(req,res)=>{
    const {model,getAll,id,status} = req.query
    const query = status?{status:status}:{}
    try{
        if(getAll){
            const data =  await database.getAll(libraries.getModel(model,database),query)
            return res.send(data);
        }else if(!getAll){
            const data = await database.findOne(libraries.getModel(model,database),{_id:id})
            return res.send(data);
        }
    }catch(e){
        res.send(e);
    } 
})


  const upload = multer({ storage: new libraries.fileUpload().storage() })

//Functionality for experience page
//Get all experiences

// Add route to add an experience
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post('/api/collection',upload.single('img'), async (req, res,) => {
    const {model} = req.query
    let newExperience = req.body;
    const file = req.file
    
    try{   
        if(file || model=='certificates'){
                newExperience.img = model!='certificates'?file.path : "https://res.cloudinary.com/dg7cu9i7u/image/upload/v1742112479/image_uploads/jwt830zu20qtsygeo881.png"
                newExperience.link = model=='certificates'?file.path:''
                database.addInstance(libraries.getModel(model,database), newExperience);
                res.send('Experience added successfully');
                }    
        else{
                await database.addInstance(libraries.getModel(model,database), newExperience);
                res.send('Experience added successfully');
        }
             
        }catch(e){
            res.status(500).send(e)
            console.log(e)
        }
    
});

// PUT route to update an experience
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.put('/api/collection',upload.single('img'), async (req, res) => {
    const {model}=req.query
    const updatedExperience = req.body;
    const file = req.file
    if(file){
        updatedExperience.img = file.path
    }
    try {
        const result = await database.updateInstance(libraries.getModel(model,database),{ _id: updatedExperience._id }, updatedExperience);
        if (result.modifiedCount > 0) {
            res.send('Experience updated successfully');       
        } else {
            res.send('No experience found with the given ID');
        }
    } catch (e) {
        res.status(500).send(e);
        console.log(e);
    }
});

// DELETE route to delete an experience
app.use(cors());
app.use(express.json());
app.delete('/api/collection/:id', async (req, res) => {
    const {model} = req.query
     const body = req.params;
    try {
        const result = await database.deleteInstance(libraries.getModel(model,database), { _id: body.id });
        
        if (result.deletedCount > 0) {
            res.send('Experience deleted successfully');
        } else {
            res.send('No experience found with the given ID');
        }
    } catch (e) {
        res.status(500).send(e);
        console.log(e)
    }
});


app.use(cors());
app.use(express.json());
app.post('/api/upload', async (req, res) => {
    const {image} = req.body
    // console.log(image)
    if (!image) {
        console.log('no object')
      return res.status(400).json({ message: 'Please upload an image' });
    }
    try{
        
        new libraries.fileUpload().upload(image,function(resp){
            if(resp){
                res.json({
                      message: 'Image uploaded successfully!',
                      imageUrl: resp.secure_url
                    });
               
                }
            })
             
        }catch(e){
            res.status(500).send(e)
            console.log(e)
        }
    
    
  });


  
  

app.listen(libraries.port, () => {
    console.log(`Example app listening at http://localhost:${libraries.port}`);
});