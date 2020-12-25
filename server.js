const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');
const db = require('./db');
const { allowedNodeEnvironmentFlags } = require('process');
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
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getTodos', (req, res) => {
    // No parameters in the find() method gives you the same result as SELECT * in MySQL. https://www.w3schools.com/nodejs/nodejs_mongodb_find.asp
    // MongoDB toArray(callback) returns an array of documents: http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#toArray
    db.getDB().collection(collection).find({}).toArray((err, documents) => {
        if (err) {
            console.log(err);
        }
        else{
            console.log(documents);
            res.json(documents);
        }
    });
});

// Edit todo
app.put('/:id', (req, res) => {
    // Set todoID to the id passed in the request https://expressjs.com/en/4x/api.html#req.params
    const todoID = req.params.id;
    // req.body is json: { todo : 'clean garage' }
    const userInput = req.body;

    // MongoDB findOneAndUpdate: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/
    db.getDB().collection(collection).findOneAndUpdate({_id : db.getPrimaryKey(todoID)}, {$set : {todo : userInput.todo}}, {returnOriginal : false}, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
});

// Create todo
app.post('/', (req, res) => {
    const userInput = req.body;
    db.getDB().collection(collection).insertOne(userInput, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            // The result contains information about whether the command was successful or not and the number of records inserted
            // The result.ops[0] contains information about the inserted data http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#~insertOneWriteOpResult
            res.json({result : result, document : result.ops[0]});
        }
    });
});

// Delete todo
app.delete('/:id', (req, res) => {
    const todoID = req.params.id;

    db.getDB().collection(collection).findOneAndDelete({_id : db.getPrimaryKey(todoID)}, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    })
})