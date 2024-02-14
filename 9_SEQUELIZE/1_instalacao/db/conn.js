import { Sequelize } from 'sequelize'
import 'dotenv/config.js'

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.SEQUELIZE_DIALECT
})

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso com o Sequelize!')
} catch(err) {
    console.log('Não foi possível conectar: ', error)
}

export default sequelize