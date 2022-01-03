const updateWins = (req, res, db) => {
    const { username } = req.body;
    db('users').where('username', '=', username)
    .increment('wins', 1)
    .then(user => {
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
    .then(user => {
        res.json(true);
    })
    .catch(err => res.status(400).json('Searching failed'))
}

const findMatch = (req, res, db) => {
    const username = req.query.username;
    db('users').where('searchingformatch', 't').andWhereNot({
        socketid: null,
        username: username
    })
    .then(user => {
        if (!user.length) {
            res.json('test');
        } else {
            res.json(user[0]);
        }
    })
    .catch(err => res.status(400).json('Could not find match'))
}

module.exports = {
    updateWins,
    updateSearching,
    findMatch
}
