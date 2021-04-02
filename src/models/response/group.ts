import { sequelize } from '../../sequelize'
import { Model, DataTypes } from 'sequelize'
import { Responses } from './responses'
import { User } from '../user'

interface GroupInstance extends Model {
    group_id: string;
    creator: string;
    leader: string;
    response_id: string;
    group_name: string;
    description: string;
}

const Group = sequelize.define<GroupInstance>('Group', {
    group_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    group_name: DataTypes.STRING(20),
    description: DataTypes.STRING(255)
}, {
    tableName: 'groups'
})

Group.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
User.hasMany(Group, {
    sourceKey: 'user_id',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'groups',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

// Group.belongsTo(User, { foreignKey: 'leader', targetKey: 'id' });
// User.hasMany(Group, {
//     sourceKey: 'id',
//     foreignKey: {
//         name: 'leader',
//         allowNull: false
//     },
//     as: 'groups',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });

Group.belongsTo(Responses, { foreignKey: 'response_id', targetKey: 'response_id' });
Responses.hasMany(Group, {
    sourceKey: 'response_id',
    foreignKey: {
        name: 'response_id',
        allowNull: false
    },
    as: 'groups',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export { Group }