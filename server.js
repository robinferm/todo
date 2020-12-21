const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');
const db = require('./db');
const collection = "todo";
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))


db.connect((err) => {
    if (err) {
        console.log('Unable to connect to database');
        // Terminate nodejs process - https://nodejs.org/api/process.html#process_process_exit_code
        process.exit(1);
    }
    else {
        app.listen(port, () => {
            console.log(`Connected to database, listening at http://localhost:${port}`);
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile('index.html');
});