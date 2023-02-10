const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const login = require('./controllers/login');
const socket = require('./controllers/socket');
const friends = require('./controllers/friends');
const game = require('./controllers/game');
const leaderboard = require('./controllers/leaderboard');
const unity = require('./controllers/unity');

const app = express();

app.use(express.json());
app.use(cors( {
  origin: '*'
}));

// const db = knex({
//   client: 'pg',
//   connection: {
//     host : 'localhost',
//     user : 'postgres',
//     password : '',
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

app.put('/updateScore', (req, res) => { game.updateScore(req, res, db) })

app.get('/getFriendsOnline', (req, res) => { friends.getFriendsOnline(req, res, db) })

app.get('/getTopFive', (req, res) => { leaderboard.getTopFive(req, res, db) })

app.put('/updateSearching', (req, res) => { game.updateSearching(req, res, db) })

app.get('/findMatch', (req, res) => { game.findMatch(req, res, db) })

app.put('/updateOnlineStatus', (req, res) => { friends.updateOnlineStatus(req, res, db) })

app.put('/setInGame', (req, res) => { game.setInGame(req, res, db) })

app.post('/addGuestUser', (req, res) => { game.addGuestUser(req, res, db) })

app.delete('/removeGuestUser', (req, res) => { game.removeGuestUser(req, res, db) })

app.delete('/guestCleanup', (req, res) => { game.guestCleanup(req, res, db) })

app.get('/checkIfOppOnline', (req, res) => { game.checkIfOppOnline(req, res, db) })

app.get('/checkIfOppInGame', (req, res) => { game.checkIfOppInGame(req, res, db) })




// Josh's Website

app.post('/postEmail', (req, res) => { unity.postEmail(req, res, db) })

app.get('/getEmailCount', (req, res) => { unity.getEmailCount(req, res, db) })

app.listen(process.env.PORT || 4000, () => {
    console.log(`app is running on port ${process.env.PORT || 4000}`);
})