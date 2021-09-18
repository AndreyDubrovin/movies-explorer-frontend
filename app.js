const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errorsHandler');
const NotFoundError = require('./errors/not-found-err');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const app = express();
const { MONGODB, NODE_ENV, PORT = 3000 } = process.env;
const mangoConnect = NODE_ENV === 'production' ? MONGODB : 'mongodb://localhost:27017/diplomdb';

mongoose.connect(mangoConnect, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors);

app.use(require('./routes/signupSigin'));

app.use(auth);
app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.use('/', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
});
