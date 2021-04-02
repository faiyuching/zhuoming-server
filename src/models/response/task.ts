import { sequelize } from '../../sequelize'
import { Model, DataTypes } from 'sequelize'
import { Responses } from './responses'
import { Group } from './group'
import { Job } from './job'
import { User } from '../user'

interface TaskInstance extends Model {
    task_id: string;
    creator: string;
    leader: string;
    group_id: string;
    response_id: string;
    job_id: string;
    task_name: string;
    description: string;
    begin_time: Date;
    end_time: Date;
    need_people: number;
}

const Task = sequelize.define<TaskInstance>('Task', {
    task_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    task_name: DataTypes.STRING(20),
    description: DataTypes.STRING(255),
    begin_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    need_people: DataTypes.DECIMAL,
}, {
    tableName: 'tasks'
})

Task.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
User.hasMany(Task, {
    sourceKey: 'user_id',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'tasks',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

// Task.belongsTo(User, { foreignKey: 'leader', targetKey: 'id' });
// User.hasMany(Task, {
//     sourceKey: 'id',
//     foreignKey: {
//         name: 'leader',
//         allowNull: false
//     },
//     as: 'tasks',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });

Task.belongsTo(Responses, { foreignKey: 'response_id', targetKey: 'response_id' });
Responses.hasMany(Task, {
    sourceKey: 'response_id',
    foreignKey: {
        name: 'response_id',
        allowNull: false
    },
    as: 'tasks',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Task.belongsTo(Group, { foreignKey: 'group_id', targetKey: 'group_id' });
Group.hasMany(Task, {
    sourceKey: 'group_id',
    foreignKey: {
        name: 'group_id',
        allowNull: false
    },
    as: 'tasks',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Task.belongsTo(Job, { foreignKey: 'job_id', targetKey: 'job_id' });
Job.hasMany(Task, {
    sourceKey: 'job_id',
    foreignKey: {
        name: 'job_id',
        allowNull: false
    },
    as: 'tasks',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export { Task }