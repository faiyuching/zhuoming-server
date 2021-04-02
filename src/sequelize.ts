import { Sequelize } from "sequelize";
import { config } from './config'

process.env.NODE_ENV
const sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: 'mysql',
    host: config.host,
    port: config.port,
    logging: false,
    timezone: '+08:00',
    define: {
        //create_time  update_time delete_time
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        freezeTableName: true,
        scopes: {
            bh: {
                attributes: {
                    exclude: ['updated_at', 'deleted_at', 'created_at']
                }
            }
        }
    }
});

sequelize.sync({
    force: config.sequelizeSync
})

export { sequelize }