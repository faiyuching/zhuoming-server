import { sequelize } from '../../sequelize'
import { Model, DataTypes } from 'sequelize'
import { User } from '../user'

interface PostInstance extends Model {
    post_id: string;
    content: string;
    tag: string
}

const Post = sequelize.define<PostInstance>('Post', {
    post_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    content: DataTypes.TEXT,
    tag: DataTypes.STRING(20),
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


export { Post }