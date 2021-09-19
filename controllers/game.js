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

module.exports = {
    updateWins,
    updateSearching
}
