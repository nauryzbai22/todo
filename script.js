const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter-todo");

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoFilter.addEventListener('click', filterTodo);

function addTodo(e) {
    e.preventDefault();
    const divElement = document.createElement("div");
    divElement.classList.add("todo");

    const liElement = document.createElement("li");
    liElement.classList.add("todo-item");
    liElement.innerText = todoInput.value;
    divElement.appendChild(liElement);
    saveLocalStorage(todoInput.value);

    const completedBtn = document.createElement("button");
    completedBtn.classList.add("completed-btn");
    completedBtn.innerText = "Done"
    divElement.appendChild(completedBtn);

    const delBtn = document.createElement("button");
    delBtn.classList.add("del-btn");
    delBtn.innerText = "Delete"
    divElement.appendChild(delBtn)

    todoList.appendChild(divElement);
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === "del-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
    }
    if (item.classList[0] === "completed-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break; 
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break;
        }
    })
}

function saveLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const divElement = document.createElement("div");
        divElement.classList.add("todo");
        const liElement = document.createElement("li");
        liElement.classList.add("todo-item");
        liElement.innerText = todo;
        divElement.appendChild(liElement);
        const completedBtn = document.createElement("button");
        completedBtn.classList.add("completed-btn");
        completedBtn.innerText = "Done"
        divElement.appendChild(completedBtn);
        const delBtn = document.createElement("button");
        delBtn.classList.add("del-btn");
        delBtn.innerText = "Delete"
        divElement.appendChild(delBtn)
        todoList.appendChild(divElement);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}