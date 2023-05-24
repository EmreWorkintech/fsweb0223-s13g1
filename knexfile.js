// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/northwind.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  },

  production: {
    client: 'mysql',
    connection: {
      filename: './data/northwind.db3'
    }
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/northwind.db3'
    }
  },

};
