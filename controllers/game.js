const updateWins = (req, res, db) => {
    const { username } = req.body;
    db('users').where('username', '=', username)
    .increment('wins', 1)
    .then(user => {
        res.json(user[0].wins);
    })
    .catch(err => res.status(400).json('Could not increment wins'))
}

module.exports = {
    updateWins
}
