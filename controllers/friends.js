const getFriends = (req, res, db) => {
    const username = req.query.username;
    db('users').where('username', '=', username)
    .then(user => {
        res.json(user[0].friends)
    })
    .catch(err => res.status(400).json('Could not find friends'))
}

const findFriend = (req, res, db) => {
    const username = req.query.username;
    db('users').where('username', '=', username)
    .then(user => {
        if (user[0].username) {
            res.json(user[0])
        } else {
            throw new Error('Could not find that friend')
        }
    })
    .catch(err => {console.log(err); res.status(400).json(err)})
}

const addFriend = (req, res, db) => {
    const { username, friendlist } = req.body;
    db('users').where('username', '=', username)
    .update({
        friends: friendlist
    })
    .then(() => {
        res.json(true);
    })
    .catch(err => res.status(400).json('Could not add friend'))
}

const updateFriendRequests = (req, res, db) => {
    const { requestlist, username } = req.body;
    db('users').where('username', '=', username)
    .update({
        friendrequests: requestlist
    })
    .then(() => {
        res.json(true);
    })
    .catch(err => res.status(400).json('Could not update friend requests'))
}

const addSelfToFriend = (req, res, db) => {
    const { friendlist, friendname } = req.body;
    db('users').where('username', '=', friendname)
    .update({
        friends: friendlist
    })
    .then(() => {
        res.json(true);
    })
    .catch(err => res.status(400).json('Could not add self to friendlist of friend'))
}

const getFriendRequests = (req, res, db) => {
    const username = req.query.username;
    db('users').where('username', '=', username)
    .then(user => {
        res.json(user[0].friendrequests)
    })
    .catch(err => res.status(400).json('Could not find friend requests'))
}

const getFriendsStatus = (req, res, db) => {
    let friendArr = [];
    let numOfFriendsOnline = 0;
    const username = req.query.username;
    db('users').where('username', '=', username)
    .returning('*')
    .then(user => {
        if (user[0].friends) {
            friendArr = user[0].friends.split(',');
            friendArr.forEach(f => {
                db('users').where('username', '=', f)
                .returning('*')
                .then(friend => {
                    if (friend.socketid) {
                        numOfFriendsOnline += 1;
                        res.json(friend);
                    }
                })
                .catch(err => res.status(400).json('Could not access friend'))
            })
        } else {
            throw new Error('Could not find friends')
        }
    })
    .catch(err => res.status(400).json(err))
}

module.exports = {
    getFriends,
    findFriend,
    addFriend,
    addSelfToFriend,
    updateFriendRequests,
    getFriendRequests,
    getFriendsStatus
};
