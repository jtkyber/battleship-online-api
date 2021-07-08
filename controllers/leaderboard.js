const getTopFive = (req, res, db) => {
    db('users').orderBy('wins', 'desc')
    .then(wins => {
        res.json(user[0])
    })
}

module.exports = {
    getTopFive
};
