const updateOnlineStatus = (req, res, db) => {
    const { username } = req.body;
    db('users').where('username', '=', username)
    .update({
        lastonline: Date.now()
    })
    .then(() => {
        res.json(true);
    })
    .catch(err => res.status(400).json(err))
}

module.exports = {
    updateOnlineStatus
}