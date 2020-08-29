const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: ture
  }
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send("It is working") })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })
app.get('/profile/:id', (res, req) => { profile.handleProfileGet(req, res, knex) }) 
app.put('/image', (req, res) => { image.handleImage(req, res, knex) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})

