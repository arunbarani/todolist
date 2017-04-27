import { TODO_SERVICES_URL, HTTP_HEADERS } from "../data/constants";
import { addAllTodo, addTodo, toggleTodo, editTodo, removeTodo } from "../actions/todoActions";


/*
 * Get all todos
 * method : GET
 * param : 
 * result : todos json
 */
export function getTodoListService() {
    return new Promise((resolve, reject) => {
		fetch(TODO_SERVICES_URL.GET_TODO_LIST)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            resolve(response.json());
        }).catch(error =>{
            reject(error);
        });
    })
}

/*
 * Add todo
 * method : POST
 * param : single todo which has to be added
 * result : added todo json
 */
export function addTodoService(text) {
    var data = {text};

    return new Promise((resolve, reject) => {
		fetch(TODO_SERVICES_URL.ADD_TODO, 
            {method:"POST", 
            body:JSON.stringify(data),
            headers: HTTP_HEADERS.JSON
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            resolve(response.json());
        }).catch(error =>{
            reject(error);
        });
    })
}

/*
 * Toggle todo
 * method : POST
 * param : id of todo which has to be toggled
 * result : toggled todo json
 */
export function toggleTodoService(id) {

    var data = {id};

    return new Promise((resolve, reject) => {
		fetch(TODO_SERVICES_URL.TOGGLE_TODO, 
            {method:"POST", 
            body:JSON.stringify(data),
            headers: HTTP_HEADERS.JSON
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            resolve(response.json());
        }).catch(error =>{
            reject(error);
        });
    })
}

/*
 * Edit todo
 * method : POST
 * param : todo object which has to be edited
 * result : edited todo json
 */
export function editTodoService(data) {
    return new Promise((resolve, reject) => {
            fetch(TODO_SERVICES_URL.EDIT_TODO, 
                {method:"POST", 
                body:JSON.stringify(data),
                headers: HTTP_HEADERS.JSON
            })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                resolve(response.json());
            }).catch(error =>{
                reject(error);
            });
        });
}

/*
 * Delete todo
 * method : DELETE
 * param : id of todo which has to be removed.
 * result : added todo json
 */
export function deleteTodoService(id) {
    var data = {id};

     return new Promise((resolve, reject) => {
            fetch(TODO_SERVICES_URL.DELETE_TODO, 
                {method:"DELETE", 
                body:JSON.stringify(data),
                headers: HTTP_HEADERS.JSON
            })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                resolve(response.json());
            }).catch(error =>{
                reject(error);
            });
        });
}

/*
 * Mark all todos as Done
 * method : POST
 * param : 
 * result : result json
 */
export function markAllAsDoneService() {
     return new Promise((resolve, reject) => {
            fetch(TODO_SERVICES_URL.MARK_ALL_AS_DONE, 
                {method:"POST", 
                body:"",
                headers: HTTP_HEADERS.JSON
            })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                resolve(response.json());
            }).catch(error =>{
                reject(error);
            });
        });
}
