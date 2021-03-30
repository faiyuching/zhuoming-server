import express from 'express';
import { sequelize } from './sequelize'
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@sgtickets/common';
import path from 'path'
import { signupRouter } from './routes/user/signup';
import { signinRouter } from './routes/user/signin';
import { signoutRouter } from './routes/user/signout';
import { currentUserRouter } from './routes/user/current-user';
import cors from 'cors';

import { responseIndexRouter } from './routes/response/index';
import { responseShowRouter } from './routes/response/show';
import { responseCreateRouter } from './routes/response/create';
import { responseDeleteRouter } from './routes/response/delete';
import { responseUpdateRouter } from './routes/response/update';

import { groupIndexRouter } from './routes/group/index';
import { groupShowRouter } from './routes/group/show';
import { groupCreateRouter } from './routes/group/create';
import { groupDeleteRouter } from './routes/group/delete';
import { groupUpdateRouter } from './routes/group/update';

import { jobIndexRouter } from './routes/job/index';
import { jobShowRouter } from './routes/job/show';
import { jobCreateRouter } from './routes/job/create';
import { jobDeleteRouter } from './routes/job/delete';
import { jobUpdateRouter } from './routes/job/update';

import { taskIndexRouter } from './routes/task/index';
import { taskShowRouter } from './routes/task/show';
import { taskCreateRouter } from './routes/task/create';
import { taskDeleteRouter } from './routes/task/delete';
import { taskUpdateRouter } from './routes/task/update';

const app = express();
// app.use(express.static(path.join(__dirname, 'build')));
app.use(cors())
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'dev',
}))

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.use(responseIndexRouter);
app.use(responseShowRouter);
app.use(responseCreateRouter);
app.use(responseDeleteRouter);
app.use(responseUpdateRouter);

app.use(groupIndexRouter);
app.use(groupShowRouter);
app.use(groupCreateRouter);
app.use(groupDeleteRouter);
app.use(groupUpdateRouter);

app.use(jobIndexRouter);
app.use(jobShowRouter);
app.use(jobCreateRouter);
app.use(jobDeleteRouter);
app.use(jobUpdateRouter);

app.use(taskIndexRouter);
app.use(taskShowRouter);
app.use(taskCreateRouter);
app.use(taskDeleteRouter);
app.use(taskUpdateRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {

  if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV must be defined');
  }

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(8000, () => {
      console.log('Listening on port 8000');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();


