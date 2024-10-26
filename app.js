/**
 * @author Giuseppe Piscopo
**/

const express = require('express');
const app = express ();

const logger = require('./logger');

const logRequests = require('./middlewares/log_middleware');
const routes = require("./routes/index");
const errorHandler = require('./middlewares/error_middleware');


app.use(express.json());
app.use(logRequests);
app.use(routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   logger.info(`Server Listening on port: ${PORT}`);
 });