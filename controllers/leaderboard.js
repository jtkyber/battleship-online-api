const getTopFive = (req, res, db) => {
    db('users').orderBy('wins', 'desc')
    .then(user => {
        res.json(user[0]);
    })
    .catch(err => res.status(400).json(err))
}

module.exports = {
    getTopFive
};
