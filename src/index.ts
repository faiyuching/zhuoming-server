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

// import { wechatSession } from './services/wechatSession'

import { signupRouter } from './routes/user/signup';
import { signinRouter } from './routes/user/signin';
import { signoutRouter } from './routes/user/signout';
import { currentUserRouter } from './routes/user/current-user';
import { userIndexRouter } from './routes/user/index';
import { userShowRouter } from './routes/user/show';
import { LoginWechatBrowserRouter } from './routes/user/wechat-login-browser';
import { userUpdateRouter } from './routes/user/update';

import { getQRcodeRouter } from './routes/user/getQRcode';

import { responseIndexRouter } from './routes/response/response/index';
import { responseShowRouter } from './routes/response/response/show';
import { responseCreateRouter } from './routes/response/response/create';
import { responseDeleteRouter } from './routes/response/response/delete';
import { responseUpdateRouter } from './routes/response/response/update';
import { responseCurrentRouter } from './routes/response/response/current';

import { groupIndexRouter } from './routes/response/group/index';
import { groupShowRouter } from './routes/response/group/show';
import { groupCreateRouter } from './routes/response/group/create';
import { groupDeleteRouter } from './routes/response/group/delete';
import { groupUpdateRouter } from './routes/response/group/update';

import { jobIndexRouter } from './routes/response/job/index';
import { jobShowRouter } from './routes/response/job/show';
import { jobCreateRouter } from './routes/response/job/create';
import { jobDeleteRouter } from './routes/response/job/delete';
import { jobUpdateRouter } from './routes/response/job/update';

import { taskIndexRouter } from './routes/response/task/index';
import { taskShowRouter } from './routes/response/task/show';
import { taskCreateRouter } from './routes/response/task/create';
import { taskDeleteRouter } from './routes/response/task/delete';
import { taskUpdateRouter } from './routes/response/task/update';

import { applyIndexRouter } from './routes/response/apply/index';
import { applyShowRouter } from './routes/response/apply/show';
import { applyCreateRouter } from './routes/response/apply/create';
import { applyDeleteRouter } from './routes/response/apply/delete';
import { applyUpdateRouter } from './routes/response/apply/update';

import { categoryIndexRouter } from './routes/library/category/index';
import { categoryShowRouter } from './routes/library/category/show';
import { categoryCreateRouter } from './routes/library/category/create';
import { categoryDeleteRouter } from './routes/library/category/delete';
import { categoryUpdateRouter } from './routes/library/category/update';

import { filetypeIndexRouter } from './routes/library/filetype/index';
import { filetypeShowRouter } from './routes/library/filetype/show';
import { filetypeCreateRouter } from './routes/library/filetype/create';
import { filetypeDeleteRouter } from './routes/library/filetype/delete';
import { filetypeUpdateRouter } from './routes/library/filetype/update';

import { topicIndexRouter } from './routes/library/topic/index';
import { topicShowRouter } from './routes/library/topic/show';
import { topicCreateRouter } from './routes/library/topic/create';
import { topicDeleteRouter } from './routes/library/topic/delete';
import { topicUpdateRouter } from './routes/library/topic/update';

import { resourceIndexRouter } from './routes/library/resource/index';
import { resourceShowRouter } from './routes/library/resource/show';
import { resourceCreateRouter } from './routes/library/resource/create';
import { resourceDeleteRouter } from './routes/library/resource/delete';
import { resourceUpdateRouter } from './routes/library/resource/update';

import { postCreateRouter } from './routes/forum/post/create'
import { postsIndexRouter } from './routes/forum/post/index'
import { postShowRouter } from './routes/forum/post/show'
import { postDeleteRouter } from './routes/forum/post/delete'

import { likeIndexRouter } from './routes/forum/like/index'
import { commentIndexRouter } from './routes/forum/comment/index'
import { commentCreateRouter } from './routes/forum/comment/create'
import { commentDeleteRouter } from './routes/forum/comment/delete'
import { likeCreateRouter } from './routes/forum/like/create'

import { momentIndexRouter } from './routes/moment/index'
import { noticeIndexRouter } from './routes/notice/index'
import { noticeUpdateRouter } from './routes/notice/update'

import { ResourceTopicCreateRouter } from './routes/library/resource-topic/create'
import { ResourceTopicDeleteRouter } from './routes/library/resource-topic/delete'
import { resourceTopicIndexRouter } from './routes/library/resource-topic/index'

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
    console.log(access_token)
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


// app.use(wechatSession)
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);
app.use(userIndexRouter);
app.use(userShowRouter);
app.use(getQRcodeRouter);
app.use(LoginWechatBrowserRouter);
app.use(userUpdateRouter);

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

app.use(postCreateRouter);
app.use(postsIndexRouter);
app.use(postShowRouter);
app.use(postDeleteRouter);

app.use(likeIndexRouter);
app.use(commentIndexRouter);
app.use(commentCreateRouter);
app.use(commentDeleteRouter);
app.use(likeCreateRouter);

app.use(momentIndexRouter);
app.use(noticeIndexRouter);
app.use(noticeUpdateRouter);

app.use(resourceTopicIndexRouter);
app.use(ResourceTopicCreateRouter);
app.use(ResourceTopicDeleteRouter);

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


