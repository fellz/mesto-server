import knex from 'knex';

const pg = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'mesto-db'
  }
});
export default pg;