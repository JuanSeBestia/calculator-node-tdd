'use strict';

module.exports = function(app) { 
    var mathOperation = require('../controllers/mathOperationController');

    app.route('/mathOperation')
        .post(mathOperation.create_math_operation)
     //   .get(mathOperation.list_math_operations)
};