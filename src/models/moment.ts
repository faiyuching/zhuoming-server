import { sequelize } from '../sequelize'
import { Model, DataTypes } from 'sequelize'
import { User } from './user'
import { Task } from './response/task'
import { Responses } from './response/responses'

interface MomentInstance extends Model {
    moment_id: string;
    user_id: string;
    type: string;
    action: string;
    task_id: number;
}

const Moment = sequelize.define<MomentInstance>('Moment', {
    moment_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    type: DataTypes.STRING,
    action: DataTypes.STRING,
}, {
    tableName: 'moments'
})

Moment.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
User.hasMany(Moment, {
    sourceKey: 'user_id',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'moments',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Moment.belongsTo(Task, { foreignKey: 'task_id', targetKey: 'task_id' });
Task.hasMany(Moment, {
    sourceKey: 'task_id',
    foreignKey: {
        name: 'task_id',
        allowNull: false
    },
    as: 'moments',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Moment.belongsTo(Responses, { foreignKey: 'response_id', targetKey: 'response_id' });
Responses.hasMany(Moment, {
    sourceKey: 'response_id',
    foreignKey: {
        name: 'response_id',
        allowNull: false
    },
    as: 'moments',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export { Moment }