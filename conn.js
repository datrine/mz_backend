const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host     : '127.0.0.1',
      user     : 'root',
      password : 'TeMi4ToPe',
      database:"mz_db",
      charset  : 'utf8',
      port:3306
    },
  });

  const bookshelf = require('bookshelf')(knex)

  module.exports=bookshelf;