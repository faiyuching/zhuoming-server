import { sequelize } from '../sequelize'
import { Model, DataTypes } from 'sequelize'
import { User } from './user'
import { Task } from './response/task'

interface NoticeInstance extends Model {
    notice_id: string;
    user_id: string;
    type: string;
    action: string;
    status: string;
}

const Notice = sequelize.define<NoticeInstance>('Notice', {
    notice_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    type: DataTypes.STRING,
    action: DataTypes.STRING,
    status: DataTypes.STRING,
}, {
    tableName: 'notices'
})

Notice.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
User.hasMany(Notice, {
    sourceKey: 'user_id',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'notices',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Notice.belongsTo(Task, { foreignKey: 'task_id', targetKey: 'task_id' });
Task.hasMany(Notice, {
    sourceKey: 'task_id',
    foreignKey: {
        name: 'task_id',
        allowNull: false
    },
    as: 'notices',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export { Notice }