const updateOnlineStatus = (req, res, db) => {
    const username = req.query.username;
    db('users').where('username', '=', username)
    .update({
        lastonline: Date.now()
    })
    .then(count => {
        res.json(true);
    })
    .catch(err => res.status(400).json(err))
}

module.exports = {
    updateOnlineStatus
}