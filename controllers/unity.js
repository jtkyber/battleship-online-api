const postEmail = (req, res, db) => {
    const { email } = req.body;
    db('unity_email_signup')
    .insert ({
        email: 'test'
    })
    .then(email => {
        res.json(email)
    })
    .catch(() => res.status(400).json('unable to post email'))
}

module.exports = {
    postEmail
};
