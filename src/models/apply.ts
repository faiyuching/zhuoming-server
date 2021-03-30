import { sequelize } from '../sequelize'
import { Model, DataTypes } from 'sequelize'
import { Responses } from './responses'
import { Group } from './group'
import { Job } from './job'
import { User } from './user'

interface TaskInstance extends Model {
    id: string;
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
    id: {
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

User.hasMany(Task, {
    foreignKey: {
        name: 'creator',
        allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});

User.hasMany(Task, {
    foreignKey: {
        name: 'leader'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});

Responses.hasMany(Task, {
    foreignKey: {
        name: 'response_id',
        allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});

Group.hasMany(Task, {
    foreignKey: {
        name: 'group_id',
        allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});

Job.hasMany(Task, {
    foreignKey: {
        name: 'job_id',
        allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});

export { Task }