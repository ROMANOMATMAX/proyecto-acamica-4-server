const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');//requiero con el objetivo de poder parsear los datos enviados a traves de JSON
const cors = require('cors');
const app = express();

//Settings

app.set('port', process.env.PORT || 4000);//toma el puerto definido en el sistema con process.env.PORT o sino el 4000

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//Globals variables

//Routes
app.use(require('./routes'));
app.use('/users', require('./routes/users'));
app.use('/regions', require('./routes/regions'));
app.use('/companies', require('./routes/companies'));
app.use('/contacts', require('./routes/contacts'));
app.use('/contactChannels', require('./routes/contactChannels'));
//Public

//Starting server
app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
})