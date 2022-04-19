const postEmail = (req, res, db) => {
    const { email } = req.body;

    db('unity_email_signup')
    .count('email', email)
    .then(count => {
        if (count > 0) {
            res.json('The email you entered is already registered');
            return;
        }
    })
    .insert({
        email: email
    })
    .then(() => {
        res.json(true)
    })
    .catch(() => res.status(400).json('unable to post email'))
}

module.exports = {
    postEmail
};
