const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

let projects = 
[
    {id: 1, name: "Website Redesign"},
    {id: 2, name: "Marketing Campaign"}
];

app.get('/projects', (req,res) =>{
    res.json(projects);
});

app.get('/projects/:id', (req, res) => {        
  const projectId = parseInt(req.params.id);
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  res.json(project);
});


app.use(express.json());

app.post('/projects', (req,res) => {
    const newProject = {
        id: projects.length + 1,
        name: req.body.name
    };
    projects.push(newProject);
    res.status(201).json(newProject);
});

app.put('/projects/:id', (req,res) =>
{
    const projectId = parseInt(req.params.id);
    const project = projects.find(p => p.id == projectId);

    if(!project)
    {
        return res.status(404).json({ error: "Project not found" });
    }

    project.name = req.body.name;
    res.json(project);
})

app.delete('/projects/:id', (req,res) => {
    const projectId = parseInt(req.params.id);
    const index = projects.findIndex(p => p.id == projectId);

    if(index === -1)
    {
        return res.status(404).json({error: " Project not found"});
    }

    projects.splice(index,1);
    res.status(204).send();
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});