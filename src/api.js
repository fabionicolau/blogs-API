const express = require('express');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');
const loginRoute = require('./routes/loginRoute');
const userRoute = require('./routes/userRoute');
const categoryRoute = require('./routes/categoryRoute');
const postRoute = require('./routes/postRoute');
const loginErrorHandler = require('./middleware/loginErrorHandler');
const userErrorHandler = require('./middleware/userErrorHandler');
const postErrorHandler = require('./middleware/postErrorHandler');

const app = express();

app.use(express.json());

// Login routes
app.use('/login', loginRoute);
app.use(loginErrorHandler);

// Users routes
app.use('/user', userRoute);
app.use(userErrorHandler);

// Categories routes
app.use('/categories', categoryRoute);

// Post categories routes
app.use('/post', postRoute);
app.use(postErrorHandler);

// swagger
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
