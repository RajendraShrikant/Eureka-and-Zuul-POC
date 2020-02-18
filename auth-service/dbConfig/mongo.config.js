const MongoClient = require('mongodb').MongoClient;

var dbClient = null;
var mongoConfig = {};

mongoConfig.connect = async (uri, dbName, options) => {
    try {
        MongoClient.connect(uri, options).then((client) => {
            dbClient = client.db(dbName);
            console.log(`------------------------------------------------------------------`);
            console.log(`MongoDB -> connected on ${uri}`);
            console.log(`------------------------------------------------------------------`);
            // client.close(); // closing the connection
        }, (mongoConnectionError) => {
            console.error(`MongoDB -> connection error at ${uri} details-> ${mongoConnectionError}`);
            process.exit(-1);
        });
    } catch (e) {
        console.error(`MongoDB -> connection error on ${uri} details->${e}`);
        process.exit(-1);
    }
}

mongoConfig.getMongoDBClient = function () {
    // console.log(`arguments.callee.caller.toString() : ${arguments.callee.caller.toString()}`)
    return dbClient;
}

mongoConfig.convertToObjectId = function (id) {
    let { ObjectId } = require("mongodb");
    return ObjectId(id);
}

module.exports = mongoConfig;