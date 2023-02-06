const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'root',
    waitForConnections : true,
    connectionLimit : 10,
    database : 'rudo'
})

module.exports = {
    pool
}