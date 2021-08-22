require('dotenv').config();

const { MONGO_DB = 'mongodb://localhost:27017/moviesdb' } = process.env;

module.exports = MONGO_DB;
