const express = require('express');
const app = express();
const PORT = process.env.PORT || 2501;
const userModel = require('./database/dbConnection')
app.use(express.json());

// posting data to the data base 

app.post('/post', async (req,res) =>{
    try {
        const postUser = new userModel(req.body)
        const postUserData = await postUser.save();
        res.send(postUserData);
        
    } catch (error) {
        res.status(404).send(error)
    }
})

// getting data from the data base
app.get('/get', async (req,res) => {
    try {
        const getUser = await userModel.find();
        res.send(getUser);
    } catch (error) {
        res.status(404).send(error);
    }
})


// getting data from the data base by id
app.get('/get/:id', async (req,res) => {
    const id = req.params.id;
    try {
        const getSingleUser = await userModel.findById({_id: id});
        res.send(getSingleUser);
    } catch (error) {
        res.status(404).send(error);
    }
})
// updating data from the data base
app.patch('/update/:id', async (req,res) => {
    const id = req.params.id;
    try {
        const updateUser = await userModel.findOneAndUpdate({ _id: id}, req.body,{new: true});
        res.send(updateUser);
        
    } catch (error) {
        res.status(500).send(error);
    }
})

// login with data base 

app.post('/login', async (req,res) => {

    try {
    const userEmail = req.body.email;
    const getEmail = await userModel.findOne({ email: userEmail});
        res.send(getEmail);
    } catch (error){
            res.status(400).send(error);
        }
})

// deleting user from data base 
app.delete('/delete/:id', async (req,res) => {
    const id = req.params.id;
    try {
        const deleteUser = await userModel.findByIdAndDelete({_id :id});
        res.send(deleteUser);
        
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(PORT, () =>{
    console.log(`server listening on port http://localhost:${PORT}`)
})