const server = require('./config/server')
const port = process.env.PORT || 3001;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})