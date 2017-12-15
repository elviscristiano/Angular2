"use strict";

const mongodb = require("mongodb");
let mongoClient = mongodb.MongoClient;

class JournalDataAccess 
{
    constructor(_URL) 
    {
        this._url = 'mongodb://localhost:27017/movies';
        this.collectionName = 'categories';
        this.URL = _URL || this._url;
    }

    get URL() {
        return this._url;
    };
    
    set URL(newURL) 
    {
        this._url = newURL;
    };
    
    connectDb() 
    {
        if (this.dbConnection) {
            return this.dbConnection;
        }
        else {
            this.dbConnection = new Promise((resolve, reject) => {
                mongoClient.connect(this.URL, (err, db) => {
                    if (err) 
                    {
                        reject(err);
                    }
                    else 
                    {
                        resolve(db);
                    }
                });
            });
            return this.dbConnection;
        }
    };
    
    insertEntry(entry) 
    {
        return new Promise((resolve, reject) => {
            this.connectDb().then((db) => {
                db.collection('myMovies').insertOne(entry, (err, r) => {
                    if (err) 
                    {
                        reject(err);
                    }
                    else 
                    {
                        resolve(r);
                    }
                });
            }).catch((err) => {
                reject(err);
                console.log("Cannot insert");
            });
        });
    };

    getCategories(entry) 
    {
        return new Promise((resolve, reject) => {
            this.connectDb()
                .then((db) => {
                db.collection(this.collectionName).find({}).toArray((err, entries) => {
                    if (err) 
                    {
                        reject(err);
                    }
                    else 
                    {
                        resolve(entries);
                    }
                });
            })
            .catch((err) => {
                reject(err);
            });
        });
    };

    getMovies() 
    {
        return new Promise((resolve, reject) => {
            this.connectDb()
                .then((db) => {
                db.collection('myMovies').find({}).toArray((err, entries) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(entries);
                    }
                });
            })
            .catch((err) => {
                reject(err);
            });
        });
    };

    deleteAMovie(entry) 
    {
        return new Promise((resolve, reject) => {
            this.connectDb().then((db) => {
                var myquery = { title: entry };
                db.collection('myMovies').deleteOne(myquery, (err, r) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(r);
                    }
                });
            })
            .catch((err) => {
                reject(err);
            });
        });
    };
}

exports.JournalDataAccess = JournalDataAccess;
