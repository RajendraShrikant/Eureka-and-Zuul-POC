const mongoConfig = require("./mongo.config");
var mongoController = {};

mongoController.insertOneDocument = (collectionName, documentObj) => {
    return new Promise((resolve, reject) => {
        try {
            getCollection(collectionName).then((collection) => {
                collection.insertOne(documentObj, function (err, result) {
                    if (err) {
                        console.error(`Error in inserting one document into the collection ${collectionName} : ${err}`);
                        reject(err);
                    }
                    else {
                        console.log("Success in inserting one document into the collection");
                        resolve(result);
                    }
                });
            }, (error) => {
                console.error(`Error in getting collection ${collectionName} : ${error}`);
                reject(error);
            });
        }
        catch (e) {
            console.error(`Error catched in inserting one document : ${e}`);
            reject(e);
        }
    });
}

mongoController.insertManyDocuments = (collectionName, documentArrayOfObj) => {
    return new Promise((resolve, reject) => {
        try {
            getCollection(collectionName).then((collection) => {
                collection.insertMany(documentArrayOfObj, function (err, result) {
                    if (err) {
                        console.error(`Error in inserting documents into the collection ${collectionName} : ${err}`);
                        reject(err);
                    }
                    else {
                        console.log("Success in inserting documents into the collection");
                        resolve(result);
                    }
                });
            }, (error) => {
                console.error(`Error in getting collection ${collectionName} : ${error}`);
                reject(error);
            });
        }
        catch (e) {
            console.error(`Error catched in inserting documents : ${e}`);
            reject(e);
        }
    });
}

mongoController.findAllDocuments = (collectionName, limit = 100) => {
    return new Promise((resolve, reject) => {
        try {
            getCollection(collectionName).then((collection) => {
                collection.find({}, { projection: { password: 0 } }).limit(+limit).toArray(function (err, docs) {
                    if (err) {
                        console.error(`Error in finding documents from the collection ${collectionName} : ${err}`);
                        reject(err);
                    }
                    else {
                        console.log("Success in finding documents from the collection");
                        resolve(docs);
                    }
                });
            }, (error) => {
                console.error(`Error in getting collection ${collectionName} : ${error}`);
                reject(error);
            });
        }
        catch (e) {
            console.error(`Error catched in finding documents : ${e}`);
            reject(e);
        }
    });
}

mongoController.findDocumentsByQuery = (collectionName, query) => {
    return new Promise((resolve, reject) => {
        try {
            getCollection(collectionName).then((collection) => {
                if (query._id)
                    query._id = mongoConfig.convertToObjectId(query._id);

                collection.find(query, { projection: { password: 0 } }).toArray(function (err, docs) {
                    if (err) {
                        console.error(`Error in finding documents by query from the collection ${collectionName} : ${err}`);
                        reject(err);
                    }
                    else {
                        console.log("Success in finding documents by query from the collection");
                        resolve(docs);
                    }
                });
            }, (error) => {
                console.error(`Error in getting collection ${collectionName} : ${error}`);
                reject(error);
            });
        }
        catch (e) {
            console.error(`Error catched in finding documents by query : ${e}`);
            reject(e);
        }
    });
}

mongoController.findOneDocumentByQuery = (collectionName, query) => {
    return new Promise((resolve, reject) => {
        try {
            getCollection(collectionName).then((collection) => {
                if (query._id)
                    query._id = mongoConfig.convertToObjectId(query._id);

                collection.findOne(query, { projection: { password: 0 } }, function (err, result) {
                    if (err) {
                        console.error(`Error in finding one document by query from the collection ${collectionName} : ${err}`);
                        reject(err);
                    }
                    else {
                        console.log("Success in finding one document by query from the collection");
                        resolve(result);
                    }
                });
            }, (error) => {
                console.error(`Error in getting collection ${collectionName} : ${error}`);
                reject(error);
            });
        }
        catch (e) {
            console.error(`Error catched in finding one document by query : ${e}`);
            reject(e);
        }
    });
}

mongoController.updateDocumentByQuery = (collectionName, findQuery, updateObj) => {
    return new Promise((resolve, reject) => {
        try {
            getCollection(collectionName).then((collection) => {
                if (findQuery._id)
                    findQuery._id = mongoConfig.convertToObjectId(findQuery._id);
                collection.findOne(findQuery, function (err, user) {
                    if (err) {
                        console.error(`Error in updating documents by query from the collection ${collectionName} : ${err}`);
                        reject(err);
                    }
                    else {
                        if (user && user.email) {
                            collection.updateOne(findQuery, { $set: updateObj }, function (err, result) {
                                if (err) {
                                    console.error(`Error in updating documents by query from the collection ${collectionName} : ${err}`);
                                    reject(err);
                                }
                                else {
                                    console.log("Success in updating documents by query from the collection");
                                    resolve(result);
                                }
                            });
                        }
                        else {
                            resolve({ statusCode: 404, message: `Sorry! no user found with provided email or _id, please re-check the value.` });
                        }
                    }
                });

            }, (error) => {
                console.error(`Error in updating collection ${collectionName} : ${error}`);
                reject(error);
            });
        }
        catch (e) {
            console.error(`Error catched in updating documents by query : ${e}`);
            reject(e);
        }
    });
}

mongoController.deleteOneDocumentByQuery = (collectionName, deleteQuery) => {
    return new Promise((resolve, reject) => {
        try {
            getCollection(collectionName).then((collection) => {
                if (deleteQuery._id)
                    deleteQuery._id = mongoConfig.convertToObjectId(deleteQuery._id);
                collection.findOne(deleteQuery, function (err, user) {
                    if (err) {
                        console.error(`Error in deleting documents by query from the collection ${collectionName} : ${err}`);
                        reject(err);
                    }
                    else {
                        if (user && user.email) {
                            collection.deleteOne(deleteQuery, function (err, result) {
                                if (err) {
                                    console.error(`Error in deleting documents by query from the collection ${collectionName} : ${err}`);
                                    reject(err);
                                }
                                else {
                                    console.log("Success in deleting documents by query from the collection");
                                    resolve(result);
                                }
                            });
                        }
                        else {
                            resolve({ statusCode: 404, message: `Sorry! no user found with provided email or _id, please re-check the value.` });
                        }
                    }
                });

            }, (error) => {
                console.error(`Error in deleting collection ${collectionName} : ${error}`);
                reject(error);
            });
        }
        catch (e) {
            console.error(`Error catched in deleting documents by query : ${e}`);
            reject(e);
        }
    });
}

function getCollection(collectionName) {
    return new Promise((resolve, reject) => {
        try {
            var dbClient = mongoConfig.getMongoDBClient();
            var collection = dbClient.collection(collectionName);
            resolve(collection);
        }
        catch (e) {
            console.error(`Error catched in getting collection : ${e}`);
            reject(e);
        }
    });
}

module.exports = mongoController;