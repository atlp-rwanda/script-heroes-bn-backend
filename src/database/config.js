import { Client } from 'pg';

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'database',
  password: 'password',
  port: 5432
});
client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('Connected to database !!!');
  }
});

export default Client;
