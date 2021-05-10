const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const login = require('./controllers/login');
const socket = require('./controllers/socket');
const friends = require('./controllers/friends');

const app = express();
app.use(express.json());
app.use(cors());

// const db = knex({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     user : 'postgres',
//     password : 'potato16',
//     database : 'battleship'
//   }
// });

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
      }
  }
});

app.get('/', (req, res) => { res.send('it is working') })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.put('/login', (req, res) => { login.handleLogin(req, res, db, bcrypt) })

app.put('/removeUserSocket', (req, res) => { socket.removeUserSocket(req, res, db) })

app.put('/addUserSocket', (req, res) => { socket.addUserSocket(req, res, db) })

app.get('/getFriends', (req, res) => { friends.getFriends(req, res, db) })

app.get('/findFriend', (req, res) => { friends.findFriend(req, res, db) })

app.put('/addFriend', (req, res) => { friends.addFriend(req, res, db) })

app.put('/addSelfToFriend', (req, res) => { friends.addSelfToFriend(req, res, db) })

app.put('/updateFriendRequests', (req, res) => { friends.updateFriendRequests(req, res, db) })

app.get('/getFriendRequests', (req, res) => { friends.getFriendRequests(req, res, db) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})
