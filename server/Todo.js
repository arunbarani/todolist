const express = require("express");
const router = express.Router();
const jsonfile = require('jsonfile');
const TodoSource = getDataSource();


/*
 * Load data source based on configuration from config.json file.
 */
function getDataSource() {
    let config = jsonfile.readFileSync("server/config.json");

    return config.dataSource == "jsonfile" ? require("./JsonFileSource") : require("./MongoDbSource");
}

/*
 * Get all todo for initial load
 */
router.get("/getTodo",  (req, res) => {
    let content = TodoSource.readTodo( (error, data) => {
        if (error) {
            console.error("Error while retrieving todos", error);
            res.status(500).send(error);
        } else {
            return res.json(data);
        }

    });
});

/*
 * Add todo
 */
router.post("/addTodo",  (req, res) => {
    let data = req.body;
    let newItem = TodoSource.addTodo(data, (error, data) => {
        if (error) {
            console.error("Error while add todo", error);
            res.status(500).send(error)
        } else {
            return res.json(data);
        }
    });

});

/*
 * Toggle the completion status of todo
 */
router.post("/toggleTodo", (req, res) => {
    let data = req.body;
    let toggleItem = TodoSource.toggleTodo(data, (error, data) => {
        if (error) {
            console.error("Error while toggle todo", error);
            res.status(500).send(error)
        } else {
            return res.json(data);
        }
    });
});

/*
 * Edit todo
 */
router.post("/editTodo",  (req, res) => {
    let data = req.body;
    let editItem = TodoSource.editTodo(data, (error, data) => {
        if (error) {
            console.error("Error while edit todo", error);
            res.status(500).send(error)
        } else {
            return res.json(data);
        }
    });

});

/*
 * Delete todo
 */
router.delete("/deleteTodo", (req, res) => {
    let data = req.body;

    TodoSource.deleteTodo(data, (error, data) => {
        if (error) {
            console.error("Error while delete todo", error);
            res.status(500).send(error)
        } else {
            return res.json(data);
        }
    });
});


/*
 * Mark all the todo as done.
 */
router.post("/markAllAsDone", (req, res) => {
    TodoSource.markAllAsDone((error, data) => {
        if (error) {
            console.error("Error while mark all todos as done", error);
            res.status(500).send(error)
        } else {
            return res.json(data);
        }
    });
})


module.exports = router;
