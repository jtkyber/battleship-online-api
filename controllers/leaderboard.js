const getTopFive = (req, res, db) => {
    const userNum = req.query.userNum;
    db('users').orderBy('wins', 'desc')
    .then(user => {
        res.json(user[userNum]);
    })
    .catch(err => res.status(400).json(err))
}

module.exports = {
    getTopFive
};
