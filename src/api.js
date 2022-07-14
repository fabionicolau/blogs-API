const express = require('express');
require('express-async-errors');
const loginRoute = require('./routes/loginRoute');
const userRoute = require('./routes/userRoute');
const loginErrorHandler = require('./middleware/loginErrorHandler');
const userErrorHandler = require('./middleware/userErrorHandler');

const app = express();

app.use(express.json());

app.use('/login', loginRoute);
app.use(loginErrorHandler);
app.use('/user', userRoute);
app.use(userErrorHandler);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
