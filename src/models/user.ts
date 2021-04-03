import { sequelize } from '../sequelize'
import { Model, DataTypes } from 'sequelize'

interface UserInstance extends Model {
    user_id: string;
    shimo: string;
    wechat: string;
    phone: number;
    email: string;
    password: string;
    job: string;
    skill: string;
    introduction: string;
    subscribe: number;
    openid: string;
    nickname: string;
    sex: number;
    language: string;
    city: string;
    province: string;
    country: string;
    headimgurl: string;
    subscribe_time: string;
    unionid: string;
    remark: string;
    groupid: number;
    subscribe_scene: string
    qr_scene: number;
    qr_scene_str: string
}

const User = sequelize.define<UserInstance>('User', {
    user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    shimo: DataTypes.STRING,
    wechat: DataTypes.STRING(20),
    phone: {
        type: DataTypes.STRING(20),
        unique: true
    },
    email: {
        type: DataTypes.STRING(50),
        unique: true
    },
    password: DataTypes.STRING(255),
    job: DataTypes.STRING(255),
    skill: DataTypes.STRING(255),
    introduction: DataTypes.STRING(255),
    subscribe: DataTypes.DECIMAL,
    openid: DataTypes.STRING(32),
    nickname: DataTypes.STRING(32),
    sex: DataTypes.DECIMAL,
    language: DataTypes.STRING(10),
    city: DataTypes.STRING(20),
    province: DataTypes.STRING(20),
    country: DataTypes.STRING(20),
    headimgurl: DataTypes.STRING(255),
    subscribe_time: DataTypes.INTEGER,
    unionid: DataTypes.STRING(32),
    remark: DataTypes.STRING(20),
    groupid: DataTypes.INTEGER,
    subscribe_scene: DataTypes.STRING(20),
    qr_scene: DataTypes.INTEGER,
    qr_scene_str: DataTypes.STRING(20),
}, {
    tableName: 'users'
})



export { User }