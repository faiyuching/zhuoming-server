import { sequelize } from '../../sequelize'
import { Model, DataTypes } from 'sequelize'
import { Responses } from './responses'
import { Group } from './group'
import { Job } from './job'
import { User } from '../user'
import { Task } from './task'

interface ApplyInstance extends Model {
    apply_id: string;
    status: string;
    role: string;
    description: string;
    fail_reason: string;
    begin_time: Date;
    end_time: Date;
}

const Apply = sequelize.define<ApplyInstance>('Apply', {
    apply_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    status: {
        type: DataTypes.ENUM,
        values: ['applied', 'success', 'fail'],
        defaultValue: 'applied'
    },
    role: {
        type: DataTypes.ENUM,
        values: ['leader', 'volunteer'],
        defaultValue: 'volunteer'
    },
    description: DataTypes.STRING,
    fail_reason: DataTypes.STRING,
    begin_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
}, {
    tableName: 'applies'
})

Apply.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
User.hasMany(Apply, {
    sourceKey: 'user_id',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'applies',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Apply.belongsTo(Responses, { foreignKey: 'response_id', targetKey: 'response_id' });
Responses.hasMany(Apply, {
    sourceKey: 'response_id',
    foreignKey: {
        name: 'response_id',
        allowNull: false
    },
    as: 'applies',
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
    as: 'applies',
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
    as: 'applies',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Apply.belongsTo(Task, { foreignKey: 'task_id', targetKey: 'task_id' });
Task.hasMany(Apply, {
    sourceKey: 'task_id',
    foreignKey: {
        name: 'task_id',
        allowNull: false
    },
    as: 'applies',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export { Apply }