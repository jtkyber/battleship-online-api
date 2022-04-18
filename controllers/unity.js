const postEmail = (req, res, db) => {
    const { email } = req.body;
    db('unity_email_signup')
    .insert ({
        email: email
    })
    .then(email => {
        res.json(email[0])
    })
    .catch(() => res.status(400).json('unable to post email'))
}

module.exports = {
    postEmail
};
