const getTopFive = (req, res, db) => {
    // const userNum = req.query.userNum;
    db('users')
    .orderBy('wins', 'desc')
    .limit(5)
    .returning(['username','wins'])
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json(err))
}

module.exports = {
    getTopFive
};
