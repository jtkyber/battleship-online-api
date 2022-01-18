const getTopFive = (req, res, db) => {
    // const userNum = req.query.userNum;
    db('users')
    .orderBy('wins', 'desc')
    .limit(5)
    .then(data => {
        res.json([data.username, data.wins]);
    })
    .catch(err => res.status(400).json(err))
}

module.exports = {
    getTopFive
};
