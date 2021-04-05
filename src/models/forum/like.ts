import { sequelize } from '../../sequelize'
import { Model, DataTypes } from 'sequelize'
import { User } from '../user'
import { Post } from './post'

interface LikeInstance extends Model {
    like_id: string;
    comment_content: string;
}

const Like = sequelize.define<LikeInstance>('Like', {

}, {
    tableName: 'likes'
})

Like.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
User.hasMany(Like, {
    sourceKey: 'user_id',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'likes',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Like.belongsTo(Post, { foreignKey: 'post_id', targetKey: 'post_id' });
Post.hasMany(Like, {
    sourceKey: 'post_id',
    foreignKey: {
        name: 'post_id',
    },
    as: 'likes',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});


export { Like }