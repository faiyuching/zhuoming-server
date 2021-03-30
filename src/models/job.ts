import { sequelize } from '../sequelize'
import { Model, DataTypes } from 'sequelize'
import { Responses } from './responses'
import { Group } from './group'
import { User } from './user'

interface JobInstance extends Model {
    id: string;
    creator: string;
    leader: string;
    group_id: string;
    response_id: string;
    job_name: string;
    description: string;
}

const Job = sequelize.define<JobInstance>('Job', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    job_name: DataTypes.STRING(20),
    description: DataTypes.STRING(255)
}, {
    tableName: 'jobs'
})

Job.belongsTo(User, { foreignKey: 'creator', targetKey: 'id' });
User.hasMany(Job, {
    sourceKey: 'id',
    foreignKey: {
        name: 'creator',
        allowNull: false
    },
    as: 'jobs',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

// Job.belongsTo(User, { foreignKey: 'leader', targetKey: 'id' });
// User.hasMany(Job, {
//     sourceKey: 'id',
//     foreignKey: {
//         name: 'leader',
//         allowNull: false
//     },
//     as: 'jobs',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });

Job.belongsTo(Responses, { foreignKey: 'response_id', targetKey: 'id' });
Responses.hasMany(Job, {
    sourceKey: 'id',
    foreignKey: {
        name: 'response_id',
        allowNull: false
    },
    as: 'jobs',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Job.belongsTo(Group, { foreignKey: 'group_id', targetKey: 'id' });
Group.hasMany(Job, {
    sourceKey: 'id',
    foreignKey: {
        name: 'group_id',
        allowNull: false
    },
    as: 'jobs',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export { Job }