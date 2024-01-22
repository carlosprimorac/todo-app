import './style.css'
import { App } from './src/todos/app';
import todosStore from './src/store/todos-store';

todosStore.initStore();

App('#app');