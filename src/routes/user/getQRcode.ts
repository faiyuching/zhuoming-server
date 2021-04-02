import express, { Request, Response } from 'express';
import { BadRequestError } from '@sgtickets/common';
import { access_token } from '../../accessToken.json'
import axios from 'axios'
const router = express.Router();

router.get(
    '/get/qrcode',
    async (req: Request, res: Response) => {

        const url = `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${access_token}`
        const data = {
            "expire_seconds": 1000,
            "action_name": "QR_SCENE",
            "action_info": {
                "scene": {
                    "scene_id": 123,
                    "scene_str": "login"
                }
            }
        }

        const qrcode = await axios.post(url, data)
        if (qrcode.data.errcode) {
            throw new BadRequestError(qrcode.data.errmsg);
        }

        res.send(qrcode.data);
    }
);

export { router as getQRcodeRouter };
