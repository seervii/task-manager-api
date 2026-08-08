const pool = require('./db');
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

let tasks = [
    {id:1, projectId: 1, title: "Design Hompage", status: "todo"},
    {id:2, projectId: 1, title: "Set up hosting", status: "in-progress" },
    {id:3, projectId: 2, title: "Draft campaign copy", status: "todo"}
];

app.get('/tasks/',(req,res) => {
res.json(tasks);
});


app.get('/tasks/:id',(req,res) => {
const taskId = parseInt(req.params.id);
const task = tasks.find(t => t.id === taskId);

if(!task)
{return res.status(404).json({error: "Task not found"})
};
res.json(task);
});

app.post('/tasks/', (req,res) => {
    const newTask = {
        id: tasks.length + 1,
        projectId: req.body.projectId,
        title: req.body.tittle,
        status: req.body.status,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.title = req.body.title ?? task.title;
  task.status = req.body.status ?? task.status;
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

app.get('/test-db', async(req,res) => {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});