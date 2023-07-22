const mongoose = require('mongoose');
const User = require('./User');


const classSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true,
            },
        
            type: { // what type of the class is(might help in the searching )
                type: String,
                required: true,
            },

            description: { // what the class is about(some explanation)
                type: String,
                required: true,
            },
            schedule: { // the exact time of the class
                type: Date,
                required: true,
            },
            // the price of the class
            price: {
                type: Number,
                required: true,
            },
            instructor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // Reference to the User model for the instructor
                required: true,
            },
            createdAt: { // time of creation
                type: Date,
                default: Date.now,
            },
});
// here is defined the class model



