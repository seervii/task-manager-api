const {Pool} = require('pg');

const pool = new Pool({
    user: process.env.USER,
    host: 'localhost',
    database: 'taskmanager',
    port: 5432,
});

module.exports = pool;