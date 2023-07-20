
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        name: {
                    type: String,
                    required: true,
             },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: { // who the user is (either and instructor or a student) 
            type: String,
            enum: ['instructor', 'student'],
            default: 'student',
        },
        createdAt: { // exact date of the class creation
            type: Date,
            default: Date.now,
        },
});


const User = mongoose.model('User', userSchema);

module.exports = User;
