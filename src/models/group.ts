import { sequelize } from '../sequelize'
import { Model, DataTypes } from 'sequelize'
import { Responses } from './responses'
import { User } from './user'

interface GroupInstance extends Model {
    id: string;
    creator: string;
    leader: string;
    response_id: string;
    group_name: string;
    description: string;
}

const Group = sequelize.define<GroupInstance>('Group', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    group_name: DataTypes.STRING(20),
    description: DataTypes.STRING(255)
}, {
    tableName: 'groups'
})

Group.belongsTo(User, { foreignKey: 'creator', targetKey: 'id' });
User.hasMany(Group, {
    sourceKey: 'id',
    foreignKey: {
        name: 'creator',
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

Group.belongsTo(Responses, { foreignKey: 'response_id', targetKey: 'id' });
Responses.hasMany(Group, {
    sourceKey: 'id',
    foreignKey: {
        name: 'response_id',
        allowNull: false
    },
    as: 'groups',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export { Group }