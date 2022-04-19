const postEmail = (req, res, db) => {
    const { email } = req.body;

    db('unity_email_signup')
    .where('email', email)
    .then(emails => {
        if (emails.length > 0) {
            res.json('The email you entered is already registered');
            return;
        }
    })

    db('unity_email_signup')
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
