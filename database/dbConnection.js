const mongoose = require('mongoose');
// first make connection to mongodb 
mongoose.connect('mongodb://127.0.0.1:27017/facility')
.then(() => console.log('Connected!')).catch(err => console.error(err));

// second make sechema for the data that will be store in the database 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    },
})

// third make the model for the data that will be stored in the database 
const userModel = new mongoose.model('teacher', userSchema);



// export the model and use it in the application
module.exports = userModel;
