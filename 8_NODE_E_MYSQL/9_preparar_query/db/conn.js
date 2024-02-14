import mysql from 'mysql'

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql1'
})

export default pool