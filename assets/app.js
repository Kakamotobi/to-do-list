"use strict";

const todoListContainer = document.querySelector(".todo-list__container");
const newTodoInput = document.querySelector(".todo-list__add-input");
const newTodoAddBtn = document.querySelector(".todo-list__add-btn");
const todosRemaining = document.querySelector(".todo-list__remaining");
const clearAllBtn = document.querySelector(".todo-list__clear-all-btn");

let todoListArray;

// -----Event Listeners----- //
// --Load existing todos-- //
document.addEventListener("DOMContentLoaded", () => {
	// Check local storage
	checkAndParseLocalStorage();

	// Render todo list stored in local storage
	renderTodoList();

	// Display number of todos remaining
	todosRemaining.textContent = todoListArray.length;
});

// --Add new todo-- //
newTodoAddBtn.addEventListener("click", () => {
	checkAndParseLocalStorage();

	// Add new todo in local storage
	todoListArray.push(newTodoInput.value);
	localStorage.setItem("todoList", JSON.stringify(todoListArray));

	// Display the new list
	todoListContainer.innerHTML = "";
	todoListArray.forEach((el) => {
		displayTodo(el);
	});

	// Reset input and add btn style
	newTodoInput.value = "";
	newTodoAddBtn.classList.remove("active");

	todosRemaining.textContent = todoListArray.length;
});

// Clear todo
todoListContainer.addEventListener("click", (evt) => {
	// Delegate event to image button
	if (evt.target.nodeName === "IMG") {
		checkAndParseLocalStorage();

		// Grab todo and its index
		const clearTarget = evt.target.parentElement.previousSibling.textContent;
		const index = todoListArray.indexOf(clearTarget);

		// Use index to remove todo from the list
		todoListArray.splice(index, 1);

		// Save the updated array to local storage
		localStorage.setItem("todoList", JSON.stringify(todoListArray));

		renderTodoList();

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

// Clear all
clearAllBtn.addEventListener("click", () => {
	checkAndParseLocalStorage();

	// Remove all todos in the list
	todoListArray.splice(0, todoListArray.length);

	localStorage.setItem("todoList", JSON.stringify(todoListArray));

	renderTodoList();

	todosRemaining.textContent = todoListArray.length;
});

// -----Helper Functions----- //
// --Check and parse local storage-- //
function checkAndParseLocalStorage() {
	let getLocalStorage = localStorage.getItem("todoList");
	if (!getLocalStorage) {
		todoListArray = [];
	} else {
		todoListArray = JSON.parse(getLocalStorage);
	}
}

// --Render todo list from local storage-- //
function renderTodoList() {
	todoListContainer.innerHTML = "";
	todoListArray.forEach((el) => {
		displayTodo(el);
	});
}

// --Display todo-- //
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
