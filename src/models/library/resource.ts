import { sequelize } from '../../sequelize'
import { Model, DataTypes } from 'sequelize'
import { User } from '../user'
import { Category } from './category'
import { Filetype } from './filetype'
import { Topic } from './topic'

interface ResourceInstance extends Model {
    resource_id: string;
    resource_name: string;
    resource_link: string;
    picture_url: string;
    recomment_reason: string;
    topic_id: string;
    user_id: string;
}

const Resource = sequelize.define<ResourceInstance>('Resource', {
    resource_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    resource_name: DataTypes.STRING,
    resource_link: DataTypes.STRING,
    picture_url: DataTypes.STRING,
    recomment_reason: DataTypes.STRING,
}, {
    tableName: 'resources'
})

Resource.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
User.hasMany(Resource, {
    sourceKey: 'user_id',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'resources',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Resource.belongsTo(Category, { foreignKey: 'category_id', targetKey: 'category_id' });
Category.hasMany(Resource, {
    sourceKey: 'category_id',
    foreignKey: {
        name: 'category_id',
        allowNull: false
    },
    as: 'resources',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Resource.belongsTo(Filetype, { foreignKey: 'filetype_id', targetKey: 'filetype_id' });
Filetype.hasMany(Resource, {
    sourceKey: 'filetype_id',
    foreignKey: {
        name: 'filetype_id',
        allowNull: false
    },
    as: 'resources',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Resource.belongsTo(Topic, { foreignKey: 'topic_id', targetKey: 'topic_id' });
Topic.hasMany(Resource, {
    sourceKey: 'topic_id',
    foreignKey: {
        name: 'topic_id'
    },
    as: 'resources',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export { Resource }