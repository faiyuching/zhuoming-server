import { sequelize } from '../sequelize'
import { Model, DataTypes } from 'sequelize'
import { Responses } from './responses';

interface UserInstance extends Model {
    // id: number;
    id: string;
    openid_web: string;
    openid_fwh: string;
    openid_xcx: string;
    unionid: string;
    shimo: string;
    wechat: string;
    facebook: string;
    phone: string;
    email: string;
    username: string;
    nickname: string;
    password: string;
    avatar: string;
    role: string;
    gender: string;
    country: string;
    province: string;
    city: string;
    language: string;
    job: string;
    skill: string;
    introduction: string;
}

const User = sequelize.define<UserInstance>('User', {
    // id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     allowNull: false,
    //     unique: true,
    //     autoIncrement: true
    // },
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    openid_web: {
        type: DataTypes.STRING(30),
        unique: true,
    },
    openid_fwh: {
        type: DataTypes.STRING(30),
        unique: true,
    },
    openid_xcx: {
        type: DataTypes.STRING(30),
        unique: true,
    },
    unionid: {
        type: DataTypes.STRING(12),
        unique: true,
    },
    shimo: {
        type: DataTypes.STRING(50),
        unique: true,
    },
    wechat: {
        type: DataTypes.STRING(20),
        unique: true,
    },
    facebook: {
        type: DataTypes.STRING(20),
        unique: true,
    },
    phone: {
        type: DataTypes.STRING(20),
        unique: true,
    },
    email: {
        type: DataTypes.STRING(50),
        unique: true,
    },
    username: DataTypes.STRING(20),
    nickname: DataTypes.STRING(20),
    password: DataTypes.STRING(255),
    avatar: {
        type: DataTypes.STRING(255),
        defaultValue: 'https://res.wx.qq.com/a/wx_fed/webwx/res/static/img/2KriyDK.png'
    },
    role: {
        type: DataTypes.ENUM,
        values: ['super-admin', 'admin', 'volunteer', 'user'],
        defaultValue: 'user'
    },
    gender: {
        type: DataTypes.ENUM,
        values: ['unknow', 'male', 'female'],
        defaultValue: 'unknow'
    },
    country: DataTypes.STRING(20),
    province: DataTypes.STRING(20),
    city: DataTypes.STRING(20),
    language: DataTypes.STRING(255),
    job: DataTypes.STRING(255),
    skill: DataTypes.STRING(255),
    introduction: DataTypes.STRING(255)
}, {
    tableName: 'users'
})



export { User }