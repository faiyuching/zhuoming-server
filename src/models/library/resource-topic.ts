import { sequelize } from '../../sequelize'
import { Model, DataTypes } from 'sequelize'
import { User } from '../user'
import { Topic } from './topic'
import { Resource } from './resource'

interface ResourceTopicInstance extends Model {
    topic_id: string;
    user_id: string;
    resource_id: string;
}

const ResourceTopic = sequelize.define<ResourceTopicInstance>('ResourceTopic', {
    resource_topic_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    }
}, {
    tableName: 'resourceTopics'
})

ResourceTopic.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
User.hasMany(ResourceTopic, {
    sourceKey: 'user_id',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'resourceTopics',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

ResourceTopic.belongsTo(Topic, { foreignKey: 'topic_id', targetKey: 'topic_id' });
Topic.hasMany(ResourceTopic, {
    sourceKey: 'topic_id',
    foreignKey: {
        name: 'topic_id',
    },
    as: 'resourceTopics',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

ResourceTopic.belongsTo(Resource, { foreignKey: 'resource_id', targetKey: 'resource_id' });
Resource.hasMany(ResourceTopic, {
    sourceKey: 'resource_id',
    foreignKey: {
        name: 'resource_id',
    },
    as: 'resourceTopics',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export { ResourceTopic }