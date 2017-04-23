const express = require("express");
const router = express.Router();
const jsonfile = require('jsonfile');
const TodoSource = getDataSource();


/*
 * Load data source based on configuration from config.json file.
 */
function getDataSource(){
    let config = jsonfile.readFileSync("server/config.json");

    return config.dataSource == "jsonfile" ? require("./JsonFileSource") : require("./MongoDbSource");
}

/*
 * Get all todo for initial load
 */
router.get("/getTodo", function(req, res){
    let content = TodoSource.readTodo(function(data){
        return res.json(data)
    });
});

/*
 * Add todo
 */
router.post("/addTodo", function(req, res){
    let data = req.body;
    let newItem = TodoSource.addTodo(data, function(data){
        return res.json(data);
    });
    
});

/*
 * Toggle the completion status of todo
 */
router.post("/toggleTodo", function(req, res){
    let data = req.body;
    let toggleItem = TodoSource.toggleTodo(data, function(data){
        return res.json(data);
    });
});

/*
 * Edit todo
 */
router.post("/editTodo", function(req, res){
    let data = req.body;
    let editItem = TodoSource.editTodo(data, function(data){
        return res.json(data);
    });
    
});

/*
 * Delete todo
 */
router.delete("/deleteTodo", function(req, res){
    let data = req.body;

    TodoSource.deleteTodo(data, function(data){
        return res.json(data);
    });
});


/*
 * Mark all the todo as done.
 */
router.post("/markAllAsDone", function(req, res){
    TodoSource.markAllAsDone((data)=> {return res.json(data)});
})
 

module.exports = router;