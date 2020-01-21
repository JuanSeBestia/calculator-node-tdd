var express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    app = express(),
    port = process.env.PORT || 3000,

    MathOperation = require('./api/models/mathOperationModel'),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

mongoose.connect("mongodb+srv://calculator-user:calculator-pass@cluster0-cfnzi.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });

var routes = require('./api/routes/mathOperationRoutes');
routes(app);

app.use(function (request, response) {
    response.status(404).send({ url: request.originalUrl + ' not found' });
})
app.listen(port);
