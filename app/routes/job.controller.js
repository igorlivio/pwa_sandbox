const jobModel = require('../../models/job')
//const { check, validationResult } = require('express-validator/check')
const validateToken = require('../../config/security/tokenValidator')

let collectionJobs = []

module.exports = routes => {

    const db = routes.config.firebaseConfig.collection('jobs')

    routes.get('/jobs/:id', async (req, res) => {
        try{
            let job = await db.doc(req.params.id).get()

            if (job.exists){
                return res.send(extractJob(job))
            }
            else {
                return res.status(404).send('Job not found')
            }
          
        } catch(error){
            return res.status(500).send(error)
        }
    })

    routes.get('/jobs/', /* validateToken, */ async (req, res) => {
        try {
            let docs = await db.get()
            let jobs = []
            docs.forEach(doc => {
                jobs.push(extractJob(doc))
            })
        
            return res.send(jobs)

        } catch (error) {
            return res.status(500).send(error)
        }
    })

    routes.post('/jobs', /*[check('name').isLength({min:5}), check('salary')],*/ async (req, res) => {
        // if(!validationResult(req).isEmpty())
        //     return res.status(422).send('Invalid name')
        try{
            const result = await bd.add(req.body)

            return res.send(result.id)
        }
        catch(error){ 
            return res.status(500).send(error) 
        }
    })

    routes.put('/jobs/:id', async (req, res) => {

        try{
            let job = await db.doc(req.params.id).update(req.body)

            if (job)
                return res.send('A vaga ${req.params.id} foi atualizada com sucesso')
            else 
                return res.status(404).send('Job not found')
                
        } catch (error) {
            return res.status(500).send(error.toString())

        }
    })

    routes.delete('/jobs/:id', async (req, res) => {

        try {
            let job = await db.doc(req.params.id).delete()
            if (job.exists)
                return res.send('A vaga ${req.params.id} foi removida com sucesso')
            else 
                return res.status(404).send('Job not found')

        } catch {
            res.send(500).send(error)

        }
    })

}

extractJob = job => {
    let v = job.data();
    
    return {
        id: job.id,
        name: v.name,
        salary: v.salary,
        description: v.description,
        differentials: v.differentials,
        isPcd: v.isPcd,
        isActive: v.isActive
    }
}