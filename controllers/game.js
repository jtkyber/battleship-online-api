const updateWins = (req, res, db) => {
    const { username } = req.body;
    db('users').where('username', '=', username)
    .increment('wins', 1)
    .then(() => {
        res.json(true);
    })
    .catch(err => res.status(400).json('Could not increment wins'))
}

const updateSearching = (req, res, db) => {
    const { username, search } = req.body;
    db('users').where('username', '=', username)
    .update({
        searchingformatch: search
    })
    .then(() => {
        res.json(true);
    })
    .catch(err => res.status(400).json('Searching failed'))
}

const findMatch = (req, res, db) => {
    const username = req.query.username;
    const curTime = Date.now();
    db('users').where('searchingformatch', 't')
    .andWhere('lastonline', '>', (curTime-5000))
    .andWhere('ingame', 'f')
    .andWhereNot({
        socketid: null,
        username: username
    })
    .then(user => {
        if (!user.length) {
            res.json(null);
        } else {
            res.json(user[0]);
        }
    })
    .catch(err => res.status(400).json('Could not find match'))
}

const setInGame = (req, res, db) => {
    const { username, isInGame } = req.body;
    db('users').where('username', '=', username)
    .update({
        ingame: isInGame
    })
    .then(() => {
        res.json(true);
    })
    .catch(() => res.status(400).json('Could not update inGame status'))
}

const addGuestUser = (req, res, db) => {
    const { socketid } = req.body;
    const guestName = 'Guest' + Math.floor(Math.random() * 1000000);
    const curTime = Date.now();
    db('users')
    .insert({
        username: guestName,
        hash: 'guest',
        socketid: socketid,
        wins: 0,
        friends: null,
        friendrequests: null,
        searchingformatch: false,
        lastonline: curTime,
        ingame: false
    })
    .returning('*')
    .then(user => {
        res.json(user[0]);
    })
    .catch(() => res.status(400).json('Could not add guest user'))
}

const removeGuestUser = (req, res, db) => {
    const { username } = req.body;
    db('users')
    .where('username', '=', username)
    .del()
    .then(() => {
        res.json(true);
    })
    .catch(() => res.status(400).json('Could not remove guest user'))
}

const guestCleanup = (req, res, db) => {
    const curTime = Date.now();
    db('users')
    .where('hash', '=', 'guest')
    .andWhere('lastonline', '<=', (curTime-5000))
    .del()
    .then(() => {
        res.json(true);
    })
    .catch(() => res.status(400).json('Could not remove users'))
}

const checkIfOppOnline = (req, res, db) => {
    const username = req.query.username;
    const curTime = Date.now();
    db('users').where('username', '=', username)
    .then(user => {
        if (user[0].lastonline > (curTime-5000)) {
            res.json(true);
        } else {
            res.json(false);
        }
    })
    .catch(() => res.status(400).json('Error'))
}

module.exports = {
    updateWins,
    updateSearching,
    findMatch,
    setInGame,
    addGuestUser,
    removeGuestUser,
    guestCleanup,
    checkIfOppOnline
}
