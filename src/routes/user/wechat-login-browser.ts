import express, { Request, Response } from 'express';
import { BadRequestError } from '@sgtickets/common';
import { User } from '../../models/user';
import { config } from '../../config';
import axios from 'axios';
import { access_token } from '../../accessToken.json'
const router = express.Router();

router.post(
  '/user/login/wechat/browser',
  async (req: Request, res: Response) => {

    const { code } = req.body;

    if (code) {

      const accesstoken = await axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appId}&secret=${config.appSecret}&code=${code}&grant_type=authorization_code`)
      console.log(accesstoken.data)
      if (accesstoken.data.errcode) {
        throw new BadRequestError(accesstoken.data.errmsg)
      }

      // const refresh = await axios.get(`https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${config.appId}&grant_type=refresh_token&refresh_token=${accesstoken.data.refresh_token}`)
      // console.log(refresh.data)

      const userInfo = await axios.get(`https://api.weixin.qq.com/cgi-bin/user/info?access_token=${access_token}&openid=${accesstoken.data.openid}&lang=zh_CN`)
      console.log(userInfo.data)
      if (userInfo.data.errcode) {
        throw new BadRequestError(userInfo.data.errmsg)
      }

      const existingUser = await User.findOne({ where: { openid: userInfo.data.openid } });

      let user = {}
      if (!existingUser) {
        user = await User.create(userInfo.data);
      } else {
        user = existingUser
      }
      res.status(200).send(user);
    }
  }
);

export { router as LoginWechatBrowserRouter };
