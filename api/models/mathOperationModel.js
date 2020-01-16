'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MathOperationSchema= new Schema({
    username: { 
        type: String, 
        required: 'Add a username'
    }, 
    created_date: { 
        type: Date,
        default: Date.now
    },
    math_operation: {
        type: String,
        required: 'Math Operation'
    },  
    result: {
        type: String, 
        required: 'Result of math operation'
    }
});

module.exports = mongoose.model('MathOperation', MathOperationSchema);