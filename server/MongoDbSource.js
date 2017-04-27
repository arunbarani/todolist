const MongoClient = require('mongodb').MongoClient;
const mongojs = require('mongojs');
const jsonfile = require("jsonFile");
const URL = getDbUrl();

/*
 * Get DB URL from config.json
 */
function getDbUrl() {
    var config = jsonfile.readFileSync("server/config.json");

    return config.dbConfig.connectionStr + "/" + config.dbConfig.db;
}


/*
 * Generate todo id since MongoDB doesn't support auto incremental field id.
 */
function getNextTodoId(callback) {
    let todoId;
    openDB((error, db) => {
        db.counters.findAndModify({
            query: {
                "_id": "todo"
            },
            update: {
                $inc: {
                    "todoId": 1
                }
            }
        },
        (err, doc) => {
            callback(error, doc ? doc.todoId : null);

            closeDB();
        });
    });
}

/*
 * Read todo from Database
 */
function readTodo(callback) {
    openDB((error, db) => {
        if (error) {
            callback(error, {});
            return;
        }
        db.todos.find().toArray( (error, data) => {
            callback(error, {
                todos: data
            })
            closeDB();
        });
    });
}

/*
 * Add new todo item 
 */
function addTodo(data, callback) {
    openDB((error, db) => {
        getNextTodoId((error, newTodoId) => {
            if (error) {
                 closeDB();
                callback(error, {});
            } else {
                db.todos.insert({
                    id: newTodoId,
                    text: data.text,
                    completed: false
                }, (error, data) => {
                    closeDB();
                    callback(error, data)
                });
            }
        });
    });
}

/*
 * Toggle todo completion status
 */
function toggleTodo(data, callback) {
    openDB((error, db) => {
        db.todos.findOne({
            "id": data.id
        }, (error, doc) => {
            if (error) {
                 closeDB();
                callback(error, {});
            } else {
                db.todos.findAndModify({
                        query: {
                            "id": doc.id
                        },
                        update: {
                            $set: {
                                completed: !doc.completed
                            }
                        }
                    },
                    (error, doc) => {
                        callback(error, doc);
                        closeDB();
                    });
            }
        });
    });
}

/*
 * Edit todo
 */
function editTodo(data, callback) {
    openDB((error, db) => {
        db.todos.update({
                "id": data.id
            }, {
                $set: {
                    "text": data.text,
                    "completed": data.completed
                }
            },
            (error, doc) => {
                if (error) {
                     closeDB();
                    callback(error, {})
                } else {
                    db.todos.findOne({
                        "id": data.id
                    }, (error, doc) => {
                        callback(error, doc);
                        closeDB();
                    })
                }
            });
    });
}

/*
 * Delete todo
 */
function deleteTodo(data, callback) {
    openDB((error, db) => {
        db.todos.remove({
            "id": data.id
        }, (error, doc) => {
            closeDB();
            callback(error, data);
        });
    });
}

/*
 * Mark all todo as Done
 */
function markAllAsDone(callback) {
    openDB((error, db) => {
        db.todos.find().toArray((error, data) => {
            if (error) {
                closeDB();
                callback(error, {});
            } else {
                data.forEach((item, index) => {
                    db.todos.update({
                            id: item.id
                        }, {
                            $set: {
                                completed: true
                            }
                        },
                        (error, doc) => {
                            if (error) {
                                closeDB();
                                callback(error, {});
                            } else {
                                if (data.length - 1 == index) {
                                    closeDB();
                                    callback(error, {
                                        allMarked: true
                                    });
                                }
                            }
                        })
                })
            }
        })
    });
}

function openDB(callback){
    try {
        let db = mongojs(URL);
        callback(null, db);

    } catch (e){
        callback(e, null);
    }
    
}

function closeDB(db){
    if (db) db.close();
}


/*
 * Export methods
 */
module.exports = {
    readTodo,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    markAllAsDone
};
