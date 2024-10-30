// 1. Проект складається з Java-Script скрипту та HTML файлу розмітки, де підключений цей скрипт.
// 2. Буде доцільно зберігати список справ у вигляді масиву обʼєктів, які містять основні поля, такі як id, checked та text,
// це надасть можливість гнучко процювати з цими записами та без проблем зберігати в localStorage у вигляді JSON.

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// Завдання 3
const todosLocalStorageKey = 'todos';

const defaultTodos = [
  { id: 2, checked: true, text: 'Вивчити HTML' },
  { id: 1, checked: true, text: 'Вивчити CSS' },
  { id: 0, checked: false, text: 'Вивчити JavaScript' },
];

function updateLocalStorage(todos) {
  localStorage.setItem(todosLocalStorageKey, JSON.stringify(todos));
}

function getTodos() {
  const storedTodos = JSON.parse(localStorage.getItem(todosLocalStorageKey));

  if (storedTodos)
    return storedTodos;

  updateLocalStorage(defaultTodos);
  return defaultTodos;
}

const todos = getTodos();
// Кінець завдання 3

// До завдання 3
// const todos = [
//   { id: 2, checked: true, text: 'Вивчити HTML' },
//   { id: 1, checked: true, text: 'Вивчити CSS' },
//   { id: 0, checked: false, text: 'Вивчити JavaScript' },
// ];

// Завдання 1.3
function newTodo() {
  const newTodoText = prompt('Введіть нову задачу');

  if (!newTodoText)
    return;

  const newId = todos.length ? todos[0].id + 1 : 0;

  const newTodo = { id: newId, checked: false, text: newTodoText };
  todos.unshift(newTodo);

  render(todos);
  updateCounter(todos);
  updateLocalStorage(todos); // Завдання 3
}

// Завдання 1.4
function renderTodo(listItem) {
  return `<li class="list-group-item">
    <input type="checkbox" class="form-check-input me-2" id="${listItem.id}" ${listItem.checked ? 'checked' : ''} onclick="checkTodo(this, ${listItem.id})" />
    <label for="${listItem.id}"><span class="${listItem.checked ? 'text-success text-decoration-line-through' : ''}">${listItem.text}</span></label>
    <button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(${listItem.id})">delete</button>
  </li>`;
}

// Завдання 1.5
function render(todos) {
  const renderedTodos = todos.map(t => renderTodo(t));
  const listHtml = renderedTodos.join('');

  list.innerHTML = listHtml;
}

// Завдання 1.6
function updateCounter(todos) {
  const todosCount = todos.length;
  const uncheckedTodosCount = todos.filter(t => !t.checked).length;

  itemCountSpan.innerHTML = todosCount;
  uncheckedCountSpan.innerHTML = uncheckedTodosCount;
}

// Завдання 1.7
function deleteTodo(id) {
  const index = todos.findIndex(t => t.id === id);
  todos.splice(index, 1);

  render(todos);
  updateCounter(todos);
  updateLocalStorage(todos); // Завдання 3
}

// Завдання 1.8
function checkTodo(element, id) {
  const todo = todos.find(t => t.id === id);
  todo.checked = element.checked;

  render(todos);
  updateCounter(todos);
  updateLocalStorage(todos); // Завдання 3
}

render(todos);
updateCounter(todos);
