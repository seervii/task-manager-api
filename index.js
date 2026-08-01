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


app.use(express.json());

app.post('/projects', (req,res) => {
    const newProject = {
        id: projects.lenght + 1,
        name: req.body.name
    };
    projects.push(newProject);
    res.status(201).json(newProject);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});