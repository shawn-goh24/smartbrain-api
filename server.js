const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const res = require('express/lib/response');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// Initialise DB using knex
const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
      // ssl: true
      // port : 5432,
      // user : 'postgres',
      // password : 'Fruity123!',
      // database : 'smart-brain'
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data);
// }); // Connect server to DB

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('Success'); })
app.post('/signin', signin.handleSignin(db, bcrypt)) // Option 1
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }) // Option 2
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

/*
/ --> res = this is working
/singin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user
*/