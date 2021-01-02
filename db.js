const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "crud_mongodb";
//const url = "mongodb://localhost:27017";
const secrets = require('./secrets')
const url = secrets.DB_URL
const mongoOptions = {useUnifiedTopology : true};

// Object with a db property that will be set to a db instance
const state = {
    db : null
}

const connect = (cb) => {

    // If there is a db connection
    if (state.db) {
        cb();
    }
    else {
        MongoClient.connect(url, mongoOptions, (err, client) => {
            if (err) {
                cb(err);
            }
            else{
                // Create new instance of dbname and set to "state.db"
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

/* Convert _id string to an <ObjectID> object
   "An ObjectId in MongoDB is a 12-byte BSON type" https://blog.eduonix.com/web-programming-tutorials/learn-structure-objectid-mongodb/
*/
 const getPrimaryKey = (_id) => {
    return ObjectID(_id);
}

// Return the database instance
const getDB = () => {
    return state.db;
}

module.exports = {getDB, connect, getPrimaryKey};