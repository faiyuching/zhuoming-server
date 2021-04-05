import { sequelize } from '../../sequelize'
import { Model, DataTypes } from 'sequelize'
import { User } from '../user'

interface TagInstance extends Model {
    tag_id: string;
    tag_name: string;
}

const Tag = sequelize.define<TagInstance>('Tag', {
    tag_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    tag_name: DataTypes.STRING(20),
}, {
    tableName: 'tags'
})

Tag.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
User.hasMany(Tag, {
    sourceKey: 'user_id',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'tags',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});


export { Tag }