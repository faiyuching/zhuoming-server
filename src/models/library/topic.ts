import { sequelize } from '../../sequelize'
import { Model, DataTypes } from 'sequelize'
import { User } from '../user'
import { Category } from './category'
import { Resource } from './resource'

interface TopicInstance extends Model {
    topic_id: string;
    topic_name: string;
    picture_url: string;
    description: string;
    category_id: string;
    user_id: string;
}

const Topic = sequelize.define<TopicInstance>('Topic', {
    topic_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    topic_name: DataTypes.STRING,
    picture_url: DataTypes.STRING,
    description: DataTypes.STRING
}, {
    tableName: 'topics'
})

Topic.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
User.hasMany(Topic, {
    sourceKey: 'user_id',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'topics',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Topic.belongsTo(Category, { foreignKey: 'category_id', targetKey: 'category_id' });
Category.hasMany(Topic, {
    sourceKey: 'category_id',
    foreignKey: {
        name: 'category_id',
        allowNull: false
    },
    as: 'topics',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export { Topic }