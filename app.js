const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const MONGO_DB = require('./config');
const centralizedError = require('./middlewares/centralizedError');
const { errorMessages } = require('./utils/constants');
const limiter = require('./middlewares/limiter');

require('dotenv').config();

const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const NotFoundError = require('./errors/404-NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

app.use(limiter);
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(routes);

app.use(requestLogger);

app.use(errors());

app.use(() => {
  throw new NotFoundError(errorMessages.notFuound);
});
app.use(errorLogger);

app.use(centralizedError);

app.listen(PORT, () => {
  console.log(`server started, Port: ${PORT}`);
});
