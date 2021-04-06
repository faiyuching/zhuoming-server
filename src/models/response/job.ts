import { sequelize } from '../../sequelize'
import { Model, DataTypes } from 'sequelize'
import { Responses } from './responses'
import { Group } from './group'
import { User } from '../user'

interface JobInstance extends Model {
    job_id: string;
    user_id: string;
    group_id: string;
    response_id: string;
    job_name: string;
    description: string;
}

const Job = sequelize.define<JobInstance>('Job', {
    job_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    job_name: DataTypes.STRING,
    description: DataTypes.STRING
}, {
    tableName: 'jobs'
})

Job.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
User.hasMany(Job, {
    sourceKey: 'user_id',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'jobs',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Job.belongsTo(Responses, { foreignKey: 'response_id', targetKey: 'response_id' });
Responses.hasMany(Job, {
    sourceKey: 'response_id',
    foreignKey: {
        name: 'response_id',
        allowNull: false
    },
    as: 'jobs',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Job.belongsTo(Group, { foreignKey: 'group_id', targetKey: 'group_id' });
Group.hasMany(Job, {
    sourceKey: 'group_id',
    foreignKey: {
        name: 'group_id',
        allowNull: false
    },
    as: 'jobs',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export { Job }