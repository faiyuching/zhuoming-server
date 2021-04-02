import { sequelize } from '../../sequelize'
import { Model, DataTypes } from 'sequelize'
import { User } from '../user'

interface FiletypeInstance extends Model {
    filetype_id: string;
    filetype_name: string;
    user_id: string;
}

const Filetype = sequelize.define<FiletypeInstance>('Filetype', {
    filetype_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    filetype_name: DataTypes.STRING(20),
}, {
    tableName: 'filetypes'
})

Filetype.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
User.hasMany(Filetype, {
    sourceKey: 'user_id',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'filetypes',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export { Filetype }