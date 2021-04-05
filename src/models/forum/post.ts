import { sequelize } from '../../sequelize'
import { Model, DataTypes } from 'sequelize'
import { User } from '../user'
import { Tag } from './tag'

interface PostInstance extends Model {
    post_id: string;
    post_content: string;
}

const Post = sequelize.define<PostInstance>('Post', {
    post_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    post_content: DataTypes.TEXT,
}, {
    tableName: 'posts'
})

Post.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
User.hasMany(Post, {
    sourceKey: 'user_id',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'posts',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Post.belongsTo(Tag, { foreignKey: 'tag_id', targetKey: 'tag_id' });
Tag.hasMany(Post, {
    sourceKey: 'tag_id',
    foreignKey: {
        name: 'tag_id',
    },
    as: 'posts',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});


export { Post }