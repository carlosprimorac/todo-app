import { Todo } from '../todos/models/todo-model'

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del campo'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('init store 🥑');
}

const loadStore = () => {
    if (!localStorage.getItem('state')) return;

    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}


/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {
    if (!description) throw new Error('description is required');
    state.todos.push(new Todo(description));

    saveStateLocalStorage();
}

const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];   
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);         
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);                  
        default:
            throw new Error(`option ${filter} is not valid`);
    }
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
    state.todos = state.todos.map( todo => { // seria mas eficiente usar un find 
        if(todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateLocalStorage();

}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId);

    saveStateLocalStorage();

}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done);

    saveStateLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All) => {
    state.filter = newFilter;

    saveStateLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}