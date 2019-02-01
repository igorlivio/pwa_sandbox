const userModel = require('../../models/user')

let collectionUsers = []

module.exports = routes => {

    routes.get('/users/:id', (req, res) => {
        collectionUsers.forEach((user) => {
            if(user.id == req.params.id)
                res.send(user)
        })
    })

    routes.get('/users/', (req, res) => {
        res.send(collectionUsers)
    })

    routes.post('/users', (req, res) => {
        try{
            let newUser = new userModel.User(
                req.body.id,
                req.body.name,
                req.body.email,
                req.body.password
            )

            collectionUsers.push(newUser)

            res.send(newUser)
        }
        catch(error)
            { return res.status(500).send(error) }
    })

    routes.put('/users/:id', (req, res) => {
        collectionUsers.forEach((user) => {
            if(user.id == req.params.id){
                try{
                    user.name = req.body.name,
                    user.email = req.body.email,
                    user.password = req.body.password

                    res.send(user)
                }
                catch(error)
                    { return res.status(500).send(error) }
            }
        })
    })

    routes.delete('/users/:id', (req, res) => {
        try{
            collectionUsers.forEach((user, index) => {
                if(user.id == req.params.id){
                    collectionUsers.splice(index, 1)
                    return res.send()
                }
            })
        }
        catch(error)
            { return res.status(500).send(error) }
    })

}