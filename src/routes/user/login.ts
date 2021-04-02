import express, { Request, Response } from 'express';
import { config } from '../../config';
import { User } from '../../models/user';
import axios from 'axios';
const router = express.Router();

router.post('/wechat/login',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { code } = req.body;

        const accesstoken = await axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appId}&secret=${config.appSecret}&code=041kdj100KBPqL1Krs100cZHIf2kdj1Z&grant_type=authorization_code`)

        if (!accesstoken.data) {
            console.log(accesstoken.data)
            throw Error("something went wrong")
        }

        // const refresh = await axios.get(`https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${config.appId}&grant_type=refresh_token&refresh_token=${getAccessToken.data.refresh_token}`)
        // console.log(refresh.data)

        const user = await axios.get(`https://api.weixin.qq.com/cgi-bin/user/info?access_token=43_mqDb8RX3nA6zkgzDwLE_AOOlSotL_dcKhb-GhosBsJWX-YgKNXL3XEcvfQu3rQvMokpXG-GZHl-9iF-j3R9KieQrq-jNFsXGSpv_nmMf2GOgxjyEvzdzd-zwQqWt9mldBrRa5TQ_Og_UUL5MCEGjACARTV&openid=${accesstoken.data.openid}&lang=zh_CN`)

        if (!user.data) {
            console.log(user.data)
            throw Error("something went wrong")
        }

        if (user.data.subscribe) {

            const existingUser = await User.findOne({ where: { openid: user.data.openid } });

            if (!existingUser) {

                const createUser = await User.create({
                    subscribe: user.data.subscribe,
                    openid: user.data.openid,
                    nickname: user.data.nickname,
                    sex: user.data.sex,
                    language: user.data.language,
                    city: user.data.city,
                    province: user.data.province,
                    country: user.data.country,
                    headimgurl: user.data.headimgurl,
                    subscribe_time: user.data.subscribe_time,
                    remark: user.data.remark,
                    groupid: user.data.groupid,
                    tagid_list: user.data.tagid_list,
                    subscribe_scene: user.data.subscribe_scene,
                    qr_scene: user.data.qr_scene,
                    qr_scene_str: user.data.qr_scene_str

                });
            }
        }



        res.status(201).send();

    });

export { router as wechatLoginRouter };
