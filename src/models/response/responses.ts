import { sequelize } from '../../sequelize'
import { Model, DataTypes } from 'sequelize'
import { User } from '../user'

interface ResponsesInstance extends Model {
    response_id: string;
    user_id: string;
    response_name: string;
    disaster_type: string;
    response_level: string;
    needs_time: string;
    end_time: Date;
    join_mode: string;
    need_people: string;
    statement: string;
    slogan: string;
}

const Responses = sequelize.define<ResponsesInstance>('Responses', {
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