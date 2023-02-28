const handleRegister = (req, res, db, bcrypt) => {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password);
    db('users')
    .returning('*')
    .insert ({
        username: username,
        hash: hash
    })
    .then(user => {
        // if (socketid.length > 0) {
            res.json(user[0]);
        // } else {
            // res.json('no socketid')
        // }
    })
    .catch((err) => res.status(400).json('unable to register'))
}

export {
    handleRegister
};
