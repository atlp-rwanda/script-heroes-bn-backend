/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorhandler from 'errorhandler';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import db from './database/models/index';
import i18n from './utils/internationalization/i18n';
import routes from './routes';

require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';


const app = express();

app.use(cors());
app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('method-override')());

app.use(express.static(`${__dirname}/public`));

app.use(i18n.init);

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));
if (!isProduction) {
  app.use(errorhandler());
}

app.get('/', (req, res, next) => {
  res.status(200).send({ message: res.__('Welcome to barefoot nomad') });
});
app.use('/api', routes);

/// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
if (!isProduction) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

export default app;
