const jsonfile = require('jsonfile');
var URL =  getFileUrl();


/*
 * Get file URL from config.json
 */
function getFileUrl(){
    var config = jsonfile.readFileSync("server/config.json");

    return config.fileConfig.fileURL;
}

/*
 * Read todo items from File
 */
function readTodo(callback) {
    readFile(URL, content => {

        

        callback(content.value)
    });
}

/*
 * Add new todo item 
 */
function addTodo(data, callback) {
    let newItem = {
        id: 0,
        text: data.text,
        completed: false
    }

    readFile(URL, content => {
        newItem.id = content.lastId++;
        content.value.todos.push(newItem);
        writeFile(URL, content, () => {
            callback(newItem);
        });
    });
}

/*
 * Toggle todo completion status
 */
function toggleTodo(data, callback) {
    let toggleItem;

    readFile(URL, content => {
        for (let i = 0; i < content.value.todos.length; i++) {
            if (content.value.todos[i].id == data.id) {
                toggleItem = content.value.todos[i];
                break;
            }
        }

        toggleItem.completed = !toggleItem.completed;

        writeFile(URL, content, () => {
            callback(toggleItem);
        });
    });
}

/*
 * Edit todo
 */
function editTodo(data, callback) {
    let editItem;

    readFile(URL, content => {
        for (let i = 0; i < content.value.todos.length; i++) {
            if (content.value.todos[i].id == data.id) {
                editItem = content.value.todos[i];
                break;
            }
        }

        Object.keys(editItem).forEach(function (item) {
            editItem[item] = data[item];
        });

        writeFile(URL, content, () => {
            callback(editItem);
        });

    });
}

/*
 * Delete todo
 */
function deleteTodo(data, callback) {
    var index = 0;

    readFile(URL, content => {
        for (let i = 0; i < content.value.todos.length; i++) {
            if (content.value.todos[i].id == data.id) {
                index = i;
                break;
            }
        }

        content.value.todos.splice(index, 1);

        writeFile(URL, content, () => {
            callback(data);
        });
    });
}

/*
 * Mark all todo as Done
 */
function markAllAsDone(callback) {
    let content;
    var index = 0;

    readFile(URL, content => {
        for (let i = 0; i < content.value.todos.length; i++) {
            content.value.todos[i].completed = true;
        }

        writeFile(URL, content, () => {
            callback({
                allMarked: true
            });
        });
    });
}

/*
 * Read data from json file
 */
function readFile(URL, callback) {
    let content;

    jsonfile.readFile(URL, (error, data) => {
        if (error) {
            console.error(error);
            throw "Error while reading file " + error;
        }
        callback(data);
    });
}

/*
 * Write data to json file
 */
function writeFile(URL, content, callback) {

    jsonfile.writeFile(URL, content, (error, data) => {
        if (error) {
            console.error(error);
            throw "Error while writing file " + error;
        }

        callback();
    });
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