import { sequelize } from '../sequelize'
import { Model, DataTypes } from 'sequelize'
import { Responses } from './responses'
import { Group } from './group'
import { Job } from './job'
import { User } from './user'
import { Task } from './task'

interface ApplyInstance extends Model {
    apply_id: string;
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

const Apply = sequelize.define<ApplyInstance>('Task', {
    apply_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    task_name: DataTypes.STRING(20),
    description: DataTypes.STRING(255),
    begin_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    need_people: DataTypes.NUMBER,
}, {
    tableName: 'tasks'
})

Apply.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
User.hasMany(Apply, {
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

Apply.belongsTo(Responses, { foreignKey: 'response_id', targetKey: 'response_id' });
Responses.hasMany(Apply, {
    sourceKey: 'response_id',
    foreignKey: {
        name: 'response_id',
        allowNull: false
    },
    as: 'tasks',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Apply.belongsTo(Group, { foreignKey: 'group_id', targetKey: 'group_id' });
Group.hasMany(Apply, {
    sourceKey: 'group_id',
    foreignKey: {
        name: 'group_id',
        allowNull: false
    },
    as: 'tasks',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Apply.belongsTo(Job, { foreignKey: 'job_id', targetKey: 'job_id' });
Job.hasMany(Apply, {
    sourceKey: 'job_id',
    foreignKey: {
        name: 'job_id',
        allowNull: false
    },
    as: 'tasks',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export { Apply }