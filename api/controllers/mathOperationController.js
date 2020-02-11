'use strict';

var mongoose = require('mongoose'),
    MathOperation = mongoose.model('MathOperation');

exports.create_math_operation = function (request, response) {
    var new_math_operation = new MathOperation(request.body);
    new_math_operation.save(function (error, math_operation) {
        if (error) {
            response.status(400);
            response.send(error);
        }
        response.status(201);
        response.json(math_operation);
    });
}

exports.list_math_operations = function (request, response) {
    var pageNo = parseInt(request.query.page);
    var pageSize = parseInt(request.query.size);
    var query = {};
    //Set a default pagesize
    if (!pageSize) {
        pageSize = 10;
    }
    //set a default pageNumber
    if (!pageNo) {
        pageNo = 1;
    }
    if (pageNo > 0) {
        query.skip = pageSize * (pageNo - 1);
        query.limit = pageSize;
    }
    //Add the countData from records
    MathOperation.countDocuments({}, function (error, totalCount) {
        if (error) {
            response.status(400);
            response.send(error);
        }
        MathOperation.find({}, {}, query, function (error, math_operation) {
            let res = {};
            if (error) {
                res = {
                    error: true,
                    errorMessage: error,
                }
            }
            else {
                if (request.query.username) {
                    math_operation = math_operation.filter(item => item.username.toLowerCase() === request.query.username.toLowerCase());
                    totalCount = math_operation.length;
                }
                var totalPages = Math.ceil(totalCount / pageSize);
                res = {
                    data: math_operation,
                    totalPages: totalPages,
                    currentPage: pageNo,
                    pageSize: pageSize,
                    count: totalCount,
                }
            }
            response.json(res);
        });
    });
}