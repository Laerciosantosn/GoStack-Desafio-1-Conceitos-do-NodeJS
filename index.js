const express = require('express')

const server = express()

server.use(express.json())


const projects = []

function checkProjectExists(req, res, next){
  
    const {id} = req.params
    const project = projects.find(project => project.id == id)

  if(!project){
    return res.status(400).json({error: 'porject does not exists'})
  }

  return next()
}

function countRequisition(req, res, next){

  console.count("Número de requisições");

  return next()
}

server.get('/projects', countRequisition,(req, res) => {
  return res.json(projects)
})

server.get('/projects/:id', checkProjectExists, countRequisition,(req, res) =>{
  const { id } = req.params
  req.body 
  const project = projects.find(project => project.id == id)
  return res.json(project)
})

server.post('/projects', countRequisition,(req, res) =>{
  const { id, title } = req.body

  const project = {
    id,
    title,
    tasks: []
  }
  projects.push(project)
  return res.json(projects)
})

server.post('/projects/:id/tasks', checkProjectExists, countRequisition,(req, res) => {
  const { id } = req.params
  const {title} = req.body

  const project = projects.find(project => project.id == id)

  project.tasks.push(title)
  return res.json(project)
  
})
 
server.put('/projects/:id', checkProjectExists, countRequisition,(req, res)=>{
  const { id } = req.params
  const { title } = req.body
  const project = projects.find(project => project.id == id)

  project.title = title

  return res.json(project)
})
 
server.delete('/projects/:id', checkProjectExists, countRequisition,(req, res) =>{
  const {id} = req.params
  const projectIndex = projects.find(project => project.id == id)
  projects.splice(projectIndex, 1)
  return res.json(projects)
})

server.listen(3000)