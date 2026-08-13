const pool = require('./db');
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});


app.get('/projects', async (req, res) => {  
  const result = await pool.query('SELECT * FROM projects');     
  res.json(result.rows);
});

app.get('/projects/:id', async (req,res) =>{
    const result = await pool.query('SELECT * FROM projects where id = $1', [req.params.id]);
    if (result.rows.length === 0){
        return res.status(404).json({error: "Project not found"});
    }
    res.json(result.rows[0]);
});


app.use(express.json());

app.post('/projects', async (req,res) => {
    const result = await pool.query(
      'INSERT INTO projects (name) values ($1) RETURNING *',
      [req.body.name]
    );
    res.status(201).json(result.rows[0]);
});

app.put('/projects/:id', async (req,res) =>
{
    const result = await pool.query('UPDATE projects SET name = $1 WHERE id = $2 RETURNING *',
      [req.body.name, req.params.id]
    )
    if(result.rows.length === 0)
    {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(result.rows[0]);
});

app.delete('/projects/:id',async (req,res) => {
    const result = await pool.query('DELETE FROM projects where id = $1 RETURNING *',
     [req.params.id]);

    if(result.rows.length === 0)
    {
      return res.status(404).json({error: " Project not found"});
    }
    res.status(204).send();
});


app.get('/tasks/',async (req,res) => {
  const result = await pool.query('SELECT * FROM tasks');
res.json(result.rows);
});


app.get('/tasks/:id',async (req,res) => {
const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);

if(result.rows.length === 0)
{return res.status(404).json({error: "Task not found"})
};
res.json(result.rows[0]);
});


app.post('/tasks/', async (req,res) => {
    const result = await pool.query(
    'INSERT INTO tasks (project_id, title, status) VALUES ($1, $2, $3) RETURNING *',
     [req.body.projectId, req.body.title, req.body.status || 'todo'] );
   
    res.status(201).json(result.rows[0]);
});

app.put('/tasks/:id', async (req, res) => {
  const result = await pool.query(
  'UPDATE tasks SET title = COALESCE($1, title), status = COALESCE($2, status) WHERE id = $3 RETURNING *',
  [req.body.title, req.body.status, req.body.id]
);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(result.rows[0]);
});

app.delete('/tasks/:id', async (req, res) => {
  const result = await pool.query (
  'DELETE FROM tasks WHERE id = $1 RETURNING *',
  [req.params.id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(204).send();
});

app.get('/test-db', async(req,res) => {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const bcrypt = require('bcrypt');

app.post('/signup', async (req,res)=> {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
    [req.body.email, hashedPassword]);
    res.status(201).json(result.rows[0]);
});

const jwt = require('jsonwebtoken');
app.post('/login', async(req,res)=> {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
  const user = result.rows[0];

if (!user) {
  return res.status(401).json({error : "Invalid email or password"});
}

const passwordMatch = await bcrypt.compare(req.body.password, user.password);

if(!passwordMatch) {
  return res.status(401).json({error: "Invaild emai or password"});
}

const token = jwt.sign({ userId: user.id}, 'yoursecret-key', {expiresIn: '1h'});
res.json({token});
});