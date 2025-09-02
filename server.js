const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve the login page as the default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Serve other HTML files
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/calendar', (req, res) => {
    res.sendFile(path.join(__dirname, 'notebuddy_prototype_calendar_view.html'));
});

app.get('/summary', (req, res) => {
    res.sendFile(path.join(__dirname, 'notebuddy_prototype_summary_view.html'));
});

app.get('/tasks', (req, res) => {
    res.sendFile(path.join(__dirname, 'notebuddy_prototype_task_list.html'));
});

app.get('/record', (req, res) => {
    res.sendFile(path.join(__dirname, 'notebuddy_prototype_record_upload.html'));
});

app.get('/settings', (req, res) => {
    res.sendFile(path.join(__dirname, 'notebuddy_prototype_settings_page.html'));
});

app.listen(PORT, () => {
    console.log(`NoteBuddy prototype server running at http://localhost:${PORT}`);
    console.log('Login page: http://localhost:3001/login');
    console.log('Main app: http://localhost:3001/index');
});
