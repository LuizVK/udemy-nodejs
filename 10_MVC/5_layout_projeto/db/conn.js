import { Sequelize } from 'sequelize'
import 'dotenv/config.js'

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.SEQUELIZE_DIALECT
})

export default sequelize