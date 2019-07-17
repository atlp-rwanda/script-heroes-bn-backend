const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'barefoot',
    password: 'BRAVO123',
    port: 5432,
});
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('Connected to database !!!')
  }
})