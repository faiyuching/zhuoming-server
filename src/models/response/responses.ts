import { sequelize } from '../../sequelize'
import { DataTypes } from 'sequelize'
import { User } from '../user'

const Responses = sequelize.define('Responses', {
    response_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    response_name: DataTypes.STRING,
    disaster_type: DataTypes.STRING,
    response_level: DataTypes.STRING,
    needs_time: DataTypes.STRING,
    end_time: DataTypes.DATE,
    join_mode: DataTypes.STRING,
    need_people: DataTypes.STRING,
    statement: DataTypes.STRING,
    slogan: DataTypes.STRING,
}, {
    tableName: 'responses'
})

Responses.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
User.hasMany(Responses, {
    sourceKey: 'user_id',
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'responses',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export { Responses }