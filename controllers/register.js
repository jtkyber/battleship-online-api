const handleRegister = (req, res, db, bcrypt) => {
    const { username, password, socketid } = req.body;
    const hash = bcrypt.hashSync(password);
    db('users')
    .returning('*')
    .insert ({
        username: username,
        hash: hash,
        socketid: socketid
    })
    .then(user => {
        if (socketid.length > 0) {
            res.json(data[0]);
        } else {
            throw new Error('No socket id found')
        }
    })
    .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister
};
