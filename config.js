require('dotenv').config();

const { MONGO_DB = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

module.exports = MONGO_DB;
