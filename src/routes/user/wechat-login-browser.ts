import express, { Request, Response } from 'express';
import { BadRequestError } from '@sgtickets/common';
import { User } from '../../models/user';
import { config } from '../../config';
import axios from 'axios';
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

      const userInfo = await axios.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${accesstoken.data.access_token}&openid=${accesstoken.data.openid}&lang=zh_CN`)
      console.log(userInfo.data)
      if (userInfo.data.errcode) {
        throw new BadRequestError(userInfo.data.errmsg)
      }

      const existingUser = await User.findOne({ where: { openid_fwh: userInfo.data.openid } });

      let user = {}
      if (!existingUser) {
        user = await User.create({
          subscribe: userInfo.data.subscribe,
          openid_fwh: userInfo.data.openid,
          nickname: userInfo.data.nickname,
          sex: userInfo.data.sex,
          language: userInfo.data.language,
          city: userInfo.data.city,
          province: userInfo.data.province,
          country: userInfo.data.country,
          headimgurl: userInfo.data.headimgurl,
          subscribe_time: userInfo.data.subscribe_time,
          remark: userInfo.data.remark,
          groupid: userInfo.data.groupid,
          tagid_list: userInfo.data.tagid_list,
          subscribe_scene: userInfo.data.subscribe_scene,
          qr_scene: userInfo.data.qr_scene,
          qr_scene_str: userInfo.data.qr_scene_str

        });
      } else {
        user = existingUser
      }
      res.status(200).send(user);
    }
  }
);

export { router as LoginWechatBrowserRouter };
