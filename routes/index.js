const paths = require('../utils/paths');
const auth = require('./auth');

module .exports = server => {
    server.get('/', (req, res) => {
        res.status(200).json({ message: 'Alive!' })
    })

    server.use(paths.auth, auth)
}