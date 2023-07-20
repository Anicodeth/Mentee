
const mongoose = require('mongoose');
const User = require('./User');


const classSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            schedule: {
                type: Date,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            instructor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // Reference to the User model for the instructor
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
});

// Create the Class model
const Class = mongoose.model('Class', classSchema);

// Export the Class model
module.exports = Class;
