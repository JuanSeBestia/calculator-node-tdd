'use strict';

var mongoose = require('mongoose'),
    MathOperation = mongoose.model('MathOperation');

exports.create_math_operation = function(request, response) {
    var new_math_operation = new MathOperation(request.body);
    new_math_operation.save(function(error, math_operation){
        if(error){
            response.send(error);
        }
        response.json(math_operation);
    });
}

/*exports.list_math_operations = function(request, response) {
    MathOperation.find({}, function(error, math_operation){
        if(error){
            response.send(error);
        }
        response.json(math_operation);
    });
}*/