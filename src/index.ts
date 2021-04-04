import express from 'express';
import { sequelize } from './sequelize'
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, BadRequestError } from '@sgtickets/common';
import cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios'
import { config } from './config'
import { expires_in } from './accessToken.json'

import { wechatSession } from './services/wechatSession'

import { signupRouter } from './routes/user/signup';
import { signinRouter } from './routes/user/signin';
import { signoutRouter } from './routes/user/signout';
import { currentUserRouter } from './routes/user/current-user';
import { userIndexRouter } from './routes/user/index';
import { userShowRouter } from './routes/user/show';
import { LoginWechatBrowserRouter } from './routes/user/wechat-login-browser';

import { getQRcodeRouter } from './routes/user/getQRcode';

import { responseIndexRouter } from './routes/response/index';
import { responseShowRouter } from './routes/response/show';
import { responseCreateRouter } from './routes/response/create';
import { responseDeleteRouter } from './routes/response/delete';
import { responseUpdateRouter } from './routes/response/update';
import { responseCurrentRouter } from './routes/response/current';

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

import { applyIndexRouter } from './routes/apply/index';
import { applyShowRouter } from './routes/apply/show';
import { applyCreateRouter } from './routes/apply/create';
import { applyDeleteRouter } from './routes/apply/delete';
import { applyUpdateRouter } from './routes/apply/update';

import { categoryIndexRouter } from './routes/category/index';
import { categoryShowRouter } from './routes/category/show';
import { categoryCreateRouter } from './routes/category/create';
import { categoryDeleteRouter } from './routes/category/delete';
import { categoryUpdateRouter } from './routes/category/update';

import { filetypeIndexRouter } from './routes/filetype/index';
import { filetypeShowRouter } from './routes/filetype/show';
import { filetypeCreateRouter } from './routes/filetype/create';
import { filetypeDeleteRouter } from './routes/filetype/delete';
import { filetypeUpdateRouter } from './routes/filetype/update';

import { topicIndexRouter } from './routes/topic/index';
import { topicShowRouter } from './routes/topic/show';
import { topicCreateRouter } from './routes/topic/create';
import { topicDeleteRouter } from './routes/topic/delete';
import { topicUpdateRouter } from './routes/topic/update';

import { resourceIndexRouter } from './routes/resource/index';
import { resourceShowRouter } from './routes/resource/show';
import { resourceCreateRouter } from './routes/resource/create';
import { resourceDeleteRouter } from './routes/resource/delete';
import { resourceUpdateRouter } from './routes/resource/update';


const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors())
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'dev',
}))

app.use(async (req, res, next) => {
  if (Date.now() > expires_in) {
    const access_token = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appId}&secret=${config.appSecret}`)
    if (access_token.data.errcode) {
      throw new BadRequestError(access_token.data.errmsg);
    } else {
      access_token.data.expires_in = Date.now() + (access_token.data.expires_in - 300) * 1000;
      fs.writeFile(path.join(__dirname, './accessToken.json'), JSON.stringify(access_token.data), function (err) {
        if (err) {
          return console.error(err);
        }
      })
    }
  }
  next()
});


app.use(wechatSession)
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);
app.use(userIndexRouter);
app.use(userShowRouter);
app.use(getQRcodeRouter);
app.use(LoginWechatBrowserRouter);

app.use(responseIndexRouter);
app.use(responseShowRouter);
app.use(responseCreateRouter);
app.use(responseDeleteRouter);
app.use(responseUpdateRouter);
app.use(responseCurrentRouter);

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

app.use(applyIndexRouter);
app.use(applyShowRouter);
app.use(applyCreateRouter);
app.use(applyDeleteRouter);
app.use(applyUpdateRouter);

app.use(categoryIndexRouter);
app.use(categoryShowRouter);
app.use(categoryCreateRouter);
app.use(categoryDeleteRouter);
app.use(categoryUpdateRouter);

app.use(filetypeIndexRouter);
app.use(filetypeShowRouter);
app.use(filetypeCreateRouter);
app.use(filetypeDeleteRouter);
app.use(filetypeUpdateRouter);

app.use(topicIndexRouter);
app.use(topicShowRouter);
app.use(topicCreateRouter);
app.use(topicDeleteRouter);
app.use(topicUpdateRouter);

app.use(resourceIndexRouter);
app.use(resourceShowRouter);
app.use(resourceCreateRouter);
app.use(resourceDeleteRouter);
app.use(resourceUpdateRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {

  if (Date.now() > expires_in) {
    const access_token = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appId}&secret=${config.appSecret}`)
    if (access_token.data.errcode) {
      throw new BadRequestError(access_token.data.errmsg);
    } else {
      access_token.data.expires_in = Date.now() + (access_token.data.expires_in - 300) * 1000;
      fs.writeFile(path.join(__dirname, './accessToken.json'), JSON.stringify(access_token.data), function (err) {
        if (err) {
          return console.error(err);
        }
      })
    }
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
}

start();


