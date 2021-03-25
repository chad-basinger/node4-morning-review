const bcrypt = require('bcryptjs')
module.exports = {
    register: (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db');

        let user = db.check_user([username])

        if(user.username === username){
            return res.status(400).send('Email already exists')
        }

        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)

        let newUser = db.register([username, hash])
        console.log(newUser)

        // delete newUser.password;

        
        // req.session.user = newUser;

        res.status(200).send(req.session.user)
        console.log()
    },
    login: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db');

        let [user] = await db.check_user(username)

        if(!user){
            return res.status(400).send(`Email/Password doesn't exist`)
        }

        let authenticated = bcrypt.compareSync(password, user.password)
        if(!authenticated) {
            return res.status(401).send('Email/Password does not exist')
        }

        delete newUser.password;

        
        req.session.user = newUser;

        res.status(200).send(req.session.user)
    }
}