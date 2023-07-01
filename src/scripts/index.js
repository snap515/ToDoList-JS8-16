import { addNewTask, handleTaskBehaviour } from './functions';

const addBtn = document.querySelector('#addBtn');
const myUl = document.querySelector('#myUl');

myUl.addEventListener('click', handleTaskBehaviour);
addBtn.addEventListener('click', addNewTask);
