import { sequelize } from '../../sequelize'
import { Model, DataTypes } from 'sequelize'
import { User } from '../user'

interface ResponsesInstance extends Model {
    response_id: string;
    organizer_id: string;
    leader: string;
    response_name: string;
    disaster_type: string;
    response_level: string;
    begin_time: Date;
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
    response_name: DataTypes.STRING(20),
    disaster_type: DataTypes.STRING(255),
    response_level: DataTypes.STRING(255),
    begin_time: DataTypes.DATE,
    needs_time: DataTypes.DECIMAL(10, 0),
    end_time: DataTypes.DATE,
    join_mode: DataTypes.STRING(20),
    need_people: DataTypes.STRING(20),
    statement: DataTypes.STRING(255),
    slogan: DataTypes.STRING(20),
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