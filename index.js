import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import knex from 'knex';
dotenv.config({ path: '.env' });

import * as friends from './controllers/friends.js';
import * as game from './controllers/game.js';
import * as leaderboard from './controllers/leaderboard.js';
import * as login from './controllers/login.js';
import * as pusher from './controllers/pusher.js';
import * as register from './controllers/register.js';
import * as socket from './controllers/socket.js';
import * as unity from './controllers/unity.js';

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: '*',
	})
);

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
// const connectionString = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false,
		},
	},
});

app.get('/', (req, res) => {
	res.json(process.env.DATABASE_URL);
});

app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});

app.put('/login', (req, res) => {
	login.handleLogin(req, res, db, bcrypt);
});

app.put('/removeUserSocket', (req, res) => {
	socket.removeUserSocket(req, res, db);
});

app.put('/addUserSocket', (req, res) => {
	socket.addUserSocket(req, res, db);
});

app.get('/getFriends', (req, res) => {
	friends.getFriends(req, res, db);
});

app.get('/findFriend', (req, res) => {
	friends.findFriend(req, res, db);
});

app.put('/addFriend', (req, res) => {
	friends.addFriend(req, res, db);
});

app.put('/addSelfToFriend', (req, res) => {
	friends.addSelfToFriend(req, res, db);
});

app.put('/updateFriendRequests', (req, res) => {
	friends.updateFriendRequests(req, res, db);
});

app.get('/getFriendRequests', (req, res) => {
	friends.getFriendRequests(req, res, db);
});

app.put('/updateScore', (req, res) => {
	game.updateScore(req, res, db);
});

app.get('/getFriendsOnline', (req, res) => {
	friends.getFriendsOnline(req, res, db);
});

app.get('/getTopFive', (req, res) => {
	leaderboard.getTopFive(req, res, db);
});

app.put('/updateSearching', (req, res) => {
	game.updateSearching(req, res, db);
});

app.put('/findMatch', (req, res) => {
	game.findMatch(req, res, db);
});

app.put('/updateOnlineStatus', (req, res) => {
	friends.updateOnlineStatus(req, res, db);
});

app.put('/setInGame', (req, res) => {
	game.setInGame(req, res, db);
});

app.post('/addGuestUser', (req, res) => {
	game.addGuestUser(req, res, db);
});

app.delete('/removeGuestUser', (req, res) => {
	game.removeGuestUser(req, res, db);
});

app.delete('/guestCleanup', (req, res) => {
	game.guestCleanup(req, res, db);
});

app.get('/checkIfOppOnline', (req, res) => {
	game.checkIfOppOnline(req, res, db);
});

app.get('/checkIfOppInGame', (req, res) => {
	game.checkIfOppInGame(req, res, db);
});

app.put('/setChannel', (req, res) => {
	game.setChannel(req, res, db);
});

// Pusher

app.get('/pusher/pusherAuth', (req, res) => {
	pusher.authenticate(req, res);
});

// app.get('/pusher/goToGame', (req, res) => { pusher.goToGame(req, res) })

app.get('/pusher/sendShotToOpponent', (req, res) => {
	pusher.sendShotToOpponent(req, res);
});

app.get('/pusher/sendResultToOpponentBoard', (req, res) => {
	pusher.sendResultToOpponentBoard(req, res);
});

app.get('/pusher/updateUserStatus', (req, res) => {
	pusher.updateUserStatus(req, res);
});

app.get('/pusher/sendInvite', (req, res) => {
	pusher.sendInvite(req, res);
});

app.get('/pusher/sendGoToGame', (req, res) => {
	pusher.sendGoToGame(req, res);
});

app.get('/pusher/sendFriendRequest', (req, res) => {
	pusher.sendFriendRequest(req, res);
});

app.get('/pusher/sendReadyStatus', (req, res) => {
	pusher.sendReadyStatus(req, res);
});

app.get('/pusher/gameOver', (req, res) => {
	pusher.gameOver(req, res);
});

app.get('/pusher/sendExitGame', (req, res) => {
	pusher.sendExitGame(req, res);
});

app.get('/pusher/sendMessage', (req, res) => {
	pusher.sendMessage(req, res);
});

// Josh's Website

app.post('/postEmail', (req, res) => {
	unity.postEmail(req, res, db);
});

app.get('/getEmailCount', (req, res) => {
	unity.getEmailCount(req, res, db);
});

app.listen(process.env.PORT || 4000, () => {
	console.log(`app is running on port ${process.env.PORT || 4000}`);
});

// const allowCors = fn => async (req, res) => {
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   // another common pattern
//   // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   )
//   if (req.method === 'OPTIONS') {
//     res.status(200).end()
//     return
//   }
//   return await fn(req, res)
// }

// module.exports = allowCors(app)
