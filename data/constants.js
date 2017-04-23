export const TODO_SERVICES_URL = {
    GET_TODO_LIST: 'getTodo',
    ADD_TODO: 'addTodo',
    EDIT_TODO: 'editTodo',
    TOGGLE_TODO: 'toggleTodo',
    DELETE_TODO: 'deleteTodo',
    MARK_ALL_AS_DONE: 'markAllAsDone'
}

export const TODO_FILTERS = {
    SHOW_ALL: {
        label: "ALL",
        type: "SHOW_ALL"
    },
    SHOW_ACTIVE: {
        label: "ACTIVE",
        type: "SHOW_ACTIVE"
    },
    SHOW_COMPLETED: {
        label: "COMPLETED",
        type: "SHOW_COMPLETED"
    }
}

export const TODO_UI_LABEL = {
    FILTERS: [TODO_FILTERS.SHOW_ALL, TODO_FILTERS.SHOW_ACTIVE, TODO_FILTERS.SHOW_COMPLETED],
    MARK_AS_DONE: "Mark As Done",
    SAVE: "Save",
    OK: "Ok",
    CONFIRM_DELETE_MESSAGE: "Are you sure you want to delete this todo?",
    MODAL_EDIT: "Edit Todo",
    MODAL_DELETE: "Delete Todo",
    MODAL_VIEW: "Todo"
}

export const TODO_ACTIONS = {
    ADD: "ADD_TODO",
    ADD_ALL: "ADD_ALL_TODO",
    EDIT: "EDIT_TODO",
    DELETE: "DELETE_TODO",
    TOGGLE: "TOGGLE_TODO",
    FILTER: "FILTER_TODO",
    MARK_ALL_DONE: "MARK_ALL_DONE"

}

export const HTTP_HEADERS = {
    JSON: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}