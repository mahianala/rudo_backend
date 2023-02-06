const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'naga@123',
    waitForConnections : true,
    connectionLimit : 10,
    database : 'rudo'
})

module.exports = {
    pool
}