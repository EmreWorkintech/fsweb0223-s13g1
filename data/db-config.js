const knex = require('knex');
const config = require('../knexfile');
const NODE_ENV = require('../config/config');

const db = knex(config['development']);

module.exports = db;