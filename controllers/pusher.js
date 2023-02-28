import { pusher } from '../lib/index.js';

const authenticate = (req, res, db) => {
    const { socketId, channelName, username } = req.body

    const randomString = Math.random().toString(36).slice(2)

    const presenceData = {
        user_id: randomString,
        user_info: {
            username
        }
    }

    try {
        const auth = pusher.authenticate(socketId, channelName, presenceData)
    } catch(err) {
        console.log(err)
    }
}

const sendShotToOpponent = async (req, res) => {
    try {
        const { channelName, target } = req.query
        await pusher.trigger(channelName, 'receive-shot', {shot: target})
        res.json({status: 200})
    } catch(err) {console.log(err)}
}

const sendResultToOpponentBoard = async (req, res) => {
    try {
        const { channelName, shot, shotSquare, shipHit } = req.query
        await pusher.trigger(channelName, 'show-result-on-opponent-board', {result: shot, shotSquare: shotSquare, shipHit: shipHit})
        res.json({status: 200})
    } catch(err) {console.log(err)}
}

const updateUserStatus = async (req, res) => {
    try {
        const { channelName } = req.query
        await pusher.trigger(channelName, 'update-friend-status', {})
        res.json({status: 200})
    } catch(err) {console.log(err)}
}

const sendInvite = async (req, res) => {
    try {
        const { username, friendName } = req.query
        await pusher.trigger(friendName, 'receive-invite', {username: username})
        res.json({status: 200})
    } catch(err) {console.log(err)}
}

const sendGoToGame = async (req, res) => {
    try {
        const { username, friendName } = req.query
        await pusher.trigger(friendName, 'receive-go-to-game', {senderName: username})
        res.json({status: 200})
    } catch(err) {console.log(err)}
}

const sendFriendRequest = async (req, res) => {
    try {
        const { channelName } = req.query
        await pusher.trigger(channelName, 'receive-friend-request', {})
        res.json({status: 200})
    } catch(err) {console.log(err)}
}

const sendReadyStatus = async (req, res) => {
    try {
        const { channelName } = req.query
        await pusher.trigger(channelName, 'receive-ready-status', {})
        res.json({status: 200})
    } catch(err) {console.log(err)}
}

const gameOver = async (req, res) => {
    try {
        const { channelName } = req.query
        await pusher.trigger(channelName, 'receive-game-over', {})
        res.json({status: 200})
    } catch(err) {console.log(err)}
}

const sendExitGame = async (req, res) => {
    try {
        const { channelName } = req.query
        await pusher.trigger(channelName, 'receive-exit-game', {})
        res.json({status: 200})
    } catch(err) {console.log(err)}
}

const sendMessage = async (req, res) => {
    try {
        const { channelName, message } = req.query
        await pusher.trigger(channelName, 'receive-msg', {message: message})
        res.json({status: 200})
    } catch(err) {console.log(err)}
}

export {
    authenticate,
    sendShotToOpponent,
    sendResultToOpponentBoard,
    updateUserStatus,
    sendInvite,
    sendGoToGame,
    sendFriendRequest,
    sendReadyStatus,
    gameOver,
    sendExitGame,
    sendMessage
}