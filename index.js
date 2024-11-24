const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Use EJS as the template engine
app.set('view engine', 'ejs');

// Middleware for parsing request bodies and serving static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory task storage
let tasks = [];

// Routes
// Home Route
app.get('/', (req, res) => {
    res.render('index', { tasks });
});

// Add Task
app.post('/add', (req, res) => {
    const { title, dueDate } = req.body;
    if (title && dueDate) {
        tasks.push({ title, dueDate, completed: false });
    }
    res.redirect('/');
});

// Toggle Task Completion
app.post('/toggle/:id', (req, res) => {
    const id = req.params.id;
    if (tasks[id]) {
        tasks[id].completed = !tasks[id].completed;
    }
    res.redirect('/');
});

// Delete Task
app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter((_, index) => index != id);
    res.redirect('/');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
