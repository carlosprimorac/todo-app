import todoStore, { Filters } from "../../store/todos-store";

let element;

export const renderPending = (elementId) => {
    if (!element)
        element = document.querySelector(elementId);

    if (!element) 
        throw new Error(`element ${elementId} not found`);

    element.innerHTML = todoStore.getTodos(Filters.Pending).length;
}