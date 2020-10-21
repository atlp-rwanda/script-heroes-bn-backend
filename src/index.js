/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorhandler from 'errorhandler';
import swaggerUi from 'swagger-ui-express';
import cron from 'node-cron';
import path from 'path';
import { Op } from 'sequelize';
import sgMail from '@sendgrid/mail';
import swaggerDocument from '../swagger.json';
import db, { AccessToken } from './database/models/index';
import i18n from './utils/internationalization/i18n';
import routes from './routes';
import googleRouter from './routes/googleRoutes';
import facebookRoute from './routes/facebookRoutes';
import roleRegisterRoute from './routes/api/roleRegister.route';
import roleAssignRoute from './routes/api/roleAssign.route';
import searchTripsRouter from './routes/searchTrips';
import searchRequestsRouter from './routes/searchRequests';

require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('method-override')());

app.use(express.static(`${__dirname}/public`));

app.use(i18n.init);

app.use('/static/chat', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/chat-client.html'));
});
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));
if (!isProduction) {
  app.use(errorhandler());
}

app.use('/', googleRouter);
app.use('/', facebookRoute);

app.use('/api', roleRegisterRoute);
app.use('/api', roleAssignRoute);
app.get('/', (req, res) => {
  res.status(200).send({ message: res.__('Welcome to barefoot nomad') });
});
app.use('/api', routes);

app.use('/api', searchTripsRouter);
app.use('/api', searchRequestsRouter);

/// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// Display db connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

cron.schedule('0 0 0 * * *', async () => {
  let expiredDate = new Date(Date.now() - 86400000).toISOString();

  expiredDate = expiredDate.split('T').join(' ');
  await AccessToken.destroy({
    where: {
      createdAt: {
        [Op.lt]: expiredDate
      }
    }
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

const socketServer = require('socket.io')(server);

export { socketServer };
export default app;
