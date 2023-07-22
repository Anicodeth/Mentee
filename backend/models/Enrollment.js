const mongoose = require('mongoose');
const User = require('./User');
const Class = require('./Class');


const enrollmentSchema = new mongoose.Schema({
        user: { // who enrolled to the class
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required: true,
        },
        class: { // to which class did the user enrol
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class', 
            required: true,
        },
        enrollmentDate: { // when did the user enrol
            type: Date,
            default: Date.now,
        },
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);


module.exports = Enrollment;
