const postEmail = (req, res, db) => {
    const { email } = req.body;
    db('unity_email_signup').select('email')
    .insert ({
        email: 'test'
    })
    .then(user => {
        res.json(user[0])
    })
    .catch(() => res.status(400).json('unable to post email'))
}

module.exports = {
    postEmail
};
