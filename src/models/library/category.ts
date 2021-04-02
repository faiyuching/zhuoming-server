import { sequelize } from '../../sequelize'
import { Model, DataTypes } from 'sequelize'
import { User } from '../user'

interface CategoryInstance extends Model {
    category_id: string;
    category_name: string;
    user_id: string;
}

const Category = sequelize.define<CategoryInstance>('Category', {
    category_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    category_name: DataTypes.STRING(20),
}, {
    tableName: 'categories'
})

Category.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
User.hasMany(Category, {
    sourceKey: 'user_id',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'categories',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export { Category }