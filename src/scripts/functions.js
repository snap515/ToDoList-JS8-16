import { save, load } from './storage';

const STORAGE_KEY = 'tasks';
let currentId = 0;

const myInput = document.querySelector('#myInput');

//добавляет новый task
function addNewTask() {
  const inputValue = myInput.value.trim(); //записывается введённый текст
  //проверка на то, чтоб текст не был пустым
  if (inputValue === '') {
    alert('enter your task here');
    return;
  }

  createLi(inputValue); //создаёт разметку li
  clearInput(); //чистит input
  addTaskToStorage(inputValue); //
}

function createLi(text, isDone = false, id = currentId) {
  const liEl = document.createElement('LI');
  const liText = document.createTextNode(text);
  liEl.appendChild(liText); //добавляет текст в тег li
  liEl.dataset.id = id;
  if (isDone) liEl.classList.add('checked');
  myUl.appendChild(liEl); //добавляет li в ul
  addCross(liEl); //добавялет кнопку удаления задачи в li
}

function clearInput() {
  myInput.value = '';
}
//управляет тасками
function handleTaskBehaviour({ target }) {
  const currentState = load(STORAGE_KEY);
  //если кликнули по li, то добавляет класс checked если его там нет, и убирает его, если он там есть
  if (target.tagName === 'LI') {
    target.classList.toggle('checked');
    const taskIndex = currentState.findIndex(
      task => +task.id === +target.dataset.id
    );
    console.log(taskIndex);
  }
  //если клик по крестику, то убирает элемент узел li
  else if (target.classList.contains('close')) {
    target.parentNode.remove();
  }
}

//добавляет крестик в элемент узел li
function addCross(element) {
  const span = document.createElement('SPAN');
  const txt = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(txt); //добавляет крестик в span
  element.appendChild(span); //добавляет span в элемент
}

//создаёт объект для хранения данных в локальном хранилище
function createTaskObject(text, isDone = false) {
  return {
    text,
    isDone,
    id: currentId,
  };
}

//добавляет объект
function addTaskToStorage(text, isDone = false) {
  const currentState = load(STORAGE_KEY);
  if (currentState === undefined) {
    save(STORAGE_KEY, [createTaskObject(text, isDone)]);
  } else {
    currentState.push(createTaskObject(text, isDone));
    save(STORAGE_KEY, currentState);
  }
  currentId += 1;
}
export { addNewTask, handleTaskBehaviour };
