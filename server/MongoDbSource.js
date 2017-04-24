const MongoClient = require('mongodb').MongoClient;
const mongojs = require('mongojs');
const jsonfile = require("jsonFile");
const URL = getDbUrl();

/*
 * Get DB URL from config.json
 */
function getDbUrl(){
    var config = jsonfile.readFileSync("server/config.json");

    return config.dbConfig.connectionStr + "/" + config.dbConfig.db;
}


/*
 * Generate todo id since MongoDB doesn't support auto incremental field id.
 */
function getNextTodoId(callback) {
    let todoId;
    let db = mongojs(URL);

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
            callback(doc.todoId);
            db.close();
        });
}

/*
 * Read todo from Database
 */
function readTodo(callback) {
    let db = mongojs(URL);

    db.todos.find().toArray(function (err, data) {
        callback({
            todos: data
        })
        db.close();
    });
}

/*
 * Add new todo item 
 */
function addTodo(data, callback) {
    let db = mongojs(URL);

    getNextTodoId(function (newTodoId) {
        db.todos.insert({
            id: newTodoId,
            text: data.text,
            completed: false
        }, function (err, data) {
            db.close();
            callback(data)
        });
    });
}

/*
 * Toggle todo completion status
 */
function toggleTodo(data, callback) {
    let db = mongojs(URL);

    db.todos.findOne({
        "id": data.id
    }, (err, doc) => {
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
            (err, doc) => {
                callback(doc);
                db.close();
            });
    });
}

/*
 * Edit todo
 */
function editTodo(data, callback) {
    let db = mongojs(URL);

    db.todos.update({
            "id": data.id
        }, {
            $set: {
                "text": data.text,
                "completed": data.completed
            }
        },
        (err, doc) => {
            db.todos.findOne({
                "id": data.id
            }, (err, doc) => {
                callback(doc);
                db.close();
            })
        });
}

/*
 * Delete todo
 */
function deleteTodo(data, callback) {
    let db = mongojs(URL);

    db.todos.remove({
        "id": data.id
    }, (err, doc) => {
        callback(data);
        db.close();
    });
}

/*
 * Mark all todo as Done
 */
function markAllAsDone(callback) {
    let db = mongojs(URL);

    db.todos.find().toArray((err, data) => {
        data.forEach((item, index) => {
            db.todos.update({
                    id: item.id
                }, {
                    $set: {
                        completed: true
                    }
                },
                (err, doc) => {
                    if (data.length - 1 == index) {
                        callback({
                            allMarked: true
                        });
                        db.close();
                    }
                })
        })
    })


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
