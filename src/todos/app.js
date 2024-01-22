import todosStore from '../store/todos-store';
import html  from './app.html?raw'; 
import todoStore, { Filters } from '../store/todos-store';
import { renderTodos, renderPending } from './use-cases';

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count'
}

/**
 * 
 * @param {String} elementId elemento donde se renderiza la app
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(ElementIDs.PendingCountLabel);
    }

    // cuando la funcion app se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // referencias, van aqui puesto que estaran creadas luego de que se ejecute la funcion anonmima autoejecutable
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);
    

    // listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
       if (event.keyCode !== 13) return;
       if (event.target.value.trim().length === 0) return;
    
       todoStore.addTodo(event.target.value);
       displayTodos();
       event.target.value = '';

    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todosStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if (!element || !isDestroyElement) return;
        todosStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    clearCompletedButton.addEventListener('click', () => {
        todosStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach(element => {
        element.addEventListener('click', (element) => {
            filtersLIs.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');
            switch (element.target.text) {
                case 'Todos':
                    todosStore.setFilter(Filters.All);
                break;
                case 'Pendientes':
                    todosStore.setFilter(Filters.Pending);
                break;
                case 'Completados':
                    todosStore.setFilter(Filters.Completed);
                break;
            }
            displayTodos();
        });
    });
}