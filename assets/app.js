"use strict";

const todoListContainer = document.querySelector(".todo-list__container");
const newTodoInput = document.querySelector(".todo-list__add-input");
const newTodoAddBtn = document.querySelector(".todo-list__add-btn");
const todosRemaining = document.querySelector(".todo-list__remaining");
const clearAllBtn = document.querySelector(".todo-list__clear-all-btn");

// -----Event Listeners----- //
// Load todos
document.addEventListener("DOMContentLoaded", () => {
	// Check local storage
	let todoListArray;
	let getLocalStorage = localStorage.getItem("todoList");
	if (getLocalStorage === null) {
		todoListArray = [];
	} else {
		todoListArray = JSON.parse(getLocalStorage);
	}

	// Display todo list stored in local storage
	todoListArray.forEach((el) => {
		displayTodo(el);
	});

	todosRemaining.textContent = todoListArray.length;
});

// Clear todo
todoListContainer.addEventListener("click", (evt) => {
	if (evt.target.nodeName === "IMG") {
		let getLocalStorage = localStorage.getItem("todoList");
		let todoListArray = JSON.parse(getLocalStorage);
		const clearTarget = evt.target.parentElement.previousSibling.textContent;
		const index = todoListArray.indexOf(clearTarget);
		todoListArray.splice(index, 1);
		localStorage.setItem("todoList", JSON.stringify(todoListArray));
		todoListContainer.innerHTML = "";
		todoListArray.forEach((el) => {
			displayTodo(el);
		});
		todosRemaining.textContent = todoListArray.length;
	}
});

// Add todo btn styling
newTodoInput.addEventListener("keyup", () => {
	if (newTodoInput.value) {
		newTodoAddBtn.classList.add("active");
	} else {
		newTodoAddBtn.classList.remove("active");
	}
});

// Add todo
newTodoAddBtn.addEventListener("click", () => {
	let todoListArray;
	let getLocalStorage = localStorage.getItem("todoList");
	if (getLocalStorage === null) {
		todoListArray = [];
	} else {
		todoListArray = JSON.parse(getLocalStorage);
	}
	todoListArray.push(newTodoInput.value);
	localStorage.setItem("todoList", JSON.stringify(todoListArray));

	// Display new todo.
	displayTodo(newTodoInput.value);

	newTodoInput.value = "";

	newTodoAddBtn.classList.remove("active");

	todosRemaining.textContent = todoListArray.length;
});

// Clear all
clearAllBtn.addEventListener("click", () => {
	let getLocalStorage = localStorage.getItem("todoList");
	let todoListArray = JSON.parse(getLocalStorage);
	todoListArray.splice(0, todoListArray.length);
	localStorage.setItem("todoList", JSON.stringify(todoListArray));
	todoListContainer.innerHTML = "";
	todoListArray.forEach((el) => {
		displayTodo(el);
	});
	todosRemaining.textContent = todoListArray.length;
});

// -----Helper Functions----- //
// Display todo
function displayTodo(todo) {
	const todoListItem = document.createElement("li");
	todoListItem.classList.add("todo-list__item");
	const todoListItemClearBtn = document.createElement("button");
	todoListItemClearBtn.classList.add("todo-list__item-clear-btn");
	const todoListItemClearBtnImg = document.createElement("img");
	todoListItemClearBtnImg.classList.add("todo-list__item-clear-btn-img");
	todoListItemClearBtnImg.src = "assets/images/check-circle-regular.svg";
	todoListItemClearBtnImg.alt = "Clear Button";

	todoListItemClearBtn.append(todoListItemClearBtnImg);
	todoListItem.append(todo, todoListItemClearBtn);
	todoListContainer.append(todoListItem);
}
