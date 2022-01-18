const getTopFive = (req, res, db) => {
    db('users').select('username','wins')
    .orderBy('wins', 'desc')
    .limit(5)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json(err))
}

module.exports = {
    getTopFive
};
