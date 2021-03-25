module.exports = {
    register: (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db');
    },
}