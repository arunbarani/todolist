const jsonfile = require('jsonfile');
const URL =  getFileUrl();


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
    readFile(URL, (error, content) => {

        callback(error, content ? content.value : {})
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

    readFile(URL, (error, content) => {
        if (error) {
            callback(error, {});
        } else {
            newItem.id = content.lastId++;
            content.value.todos.push(newItem);
            writeFile(URL, content, (error) => {
                callback(error, newItem);
            });
        }
    });
}

/*
 * Toggle todo completion status
 */
function toggleTodo(data, callback) {
    let toggleItem;

    readFile(URL, (error, content) => {
        if (error) {
            callback(error, {});
        } else {
            for (let i = 0; i < content.value.todos.length; i++) {
                if (content.value.todos[i].id == data.id) {
                    toggleItem = content.value.todos[i];
                    break;
                }
            }

            if (toggleItem) {
                toggleItem.completed = !toggleItem.completed;
            }

            writeFile(URL, content, (error) => {
                callback(error, toggleItem);
            });
        }
        
    });
}

/*
 * Edit todo
 */
function editTodo(data, callback) {
    let editItem;

    readFile(URL, (error, content) => {
        if (error) {
            callback(error, {});
        } else {
            for (let i = 0; i < content.value.todos.length; i++) {
                if (content.value.todos[i].id == data.id) {
                    editItem = content.value.todos[i];
                    break;
                }
            }

            if (editItem){
                Object.keys(editItem).forEach( item => {
                    editItem[item] = data[item];
                });
            }

            writeFile(URL, content, (error) => {
                callback(error, editItem);
            });
        }
    });
}

/*
 * Delete todo
 */
function deleteTodo(data, callback) {
    var index = 0;

    readFile(URL, (error, content) => {
        if (error) {
            callback(error, data);
        } else {
             for (let i = 0; i < content.value.todos.length; i++) {
                if (content.value.todos[i].id == data.id) {
                    index = i;
                    break;
                }
            }

            content.value.todos.splice(index, 1);

            writeFile(URL, content, (error) => {
                callback(error, data);
            });
        }
       
    });
}

/*
 * Mark all todo as Done
 */
function markAllAsDone(callback) {
    let content;
    var index = 0;

    readFile(URL, (error, content) => {
        if (error){
            callback(error, {})
        } else {
            for (let i = 0; i < content.value.todos.length; i++) {
                content.value.todos[i].completed = true;
            }

            writeFile(URL, content, () => {
                callback(error, {
                    allMarked: true
                });
            });
        }
    });
}

/*
 * Read data from json file
 */
function readFile(URL, callback) {
    let content;

    jsonfile.readFile(URL, (error, data) => {
         if (error)
            console.log("Error while reading data", error);

        callback(error, data);
    });
}

/*
 * Write data to json file
 */
function writeFile(URL, content, callback) {

    jsonfile.writeFile(URL, content, (error, data) => {
        if (error)
            conosle.log("Error while writing data", error);

        callback(error);
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
