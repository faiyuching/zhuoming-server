import { Request, Response, NextFunction } from 'express';
import sha1 from 'sha1'
import { parseString } from 'xml2js'
import { User } from '../models/user';
import { config } from '../config';
import { BadRequestError } from '@sgtickets/common';
import axios from 'axios'
import { access_token } from '../accessToken.json'

const getUserDataAsync = (req: any) => {
    return new Promise((resolve, reject) => {
        let xmlData = ''
        req.on("data", (data: any) => {
            xmlData += data
        }).on('end', () => {
            resolve(xmlData.toString())
        })
    })
}
const parseXMLAsync = (xmlData: any) => {
    return new Promise((resolve, reject) => {
        parseString(xmlData, { trim: true }, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject('parseXMLAsync方法出错了:' + err)
            }
        })
    })
}
const formatMessage = (jsData: any) => {
    let message: { [key: string]: string; } = {};
    jsData = jsData.xml;
    if (typeof jsData === 'object') {
        for (let key in jsData) {
            let value = jsData[key];
            message[key] = value[0]
        }
    }
    return message
}

export const wechatSession = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.query)
    const { signature, timestamp, nonce, echostr } = req.query;
    const arrSort = [config.token, timestamp, nonce];
    arrSort.sort();
    const str = arrSort.join("");
    const shaStr = sha1(str);

    if (shaStr !== signature) {
        next()
    } else {

        const xmlData = await getUserDataAsync(req)
        const jsData = await parseXMLAsync(xmlData)
        const message = formatMessage(jsData)

        let resMsg = ''

        if (req.method === "POST" && message.EventKey.indexOf('123') != -1) {

            resMsg = `<xml><ToUserName><![CDATA[${message.FromUserName}]]></ToUserName><FromUserName><![CDATA[${message.ToUserName}]]></FromUserName><CreateTime>{${Date.now()}}</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[登录成功！]]></Content></xml>`
            const existingUser = await User.findOne({ where: { openid_fwh: message.FromUserName } });
            if (!existingUser) {
                const user = await axios.get(`https://api.weixin.qq.com/cgi-bin/user/info?access_token=${access_token}&openid=${message.FromUserName}&lang=zh_CN`)
                const createUser = await User.create({
                    openid_fwh: user.data.openid,
                    nickname: user.data.nickname,
                    gender: user.data.sex,
                    language: user.data.language,
                    city: user.data.city,
                    province: user.data.province,
                    country: user.data.country,
                    avatar: user.data.headimgurl
                });
                console.log("createUser", createUser)
                req.session = {
                    userid: createUser.user_id
                };
            } else {
                console.log("createUser", existingUser)
                req.session = {
                    userid: existingUser.user_id
                };
            }
        }
        res.send(resMsg)
    }
};
