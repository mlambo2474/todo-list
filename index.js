
const input = document.getElementById("input");
const addTask = document.getElementById("add-task");
const clearTask = document.getElementById("clear-tasks");
const todoList = document.getElementById("todo-list");

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => {
 return  JSON.parse(localStorage.getItem("todos") || "[]");
};

const renderTodos = () => {
  todoList.innerHTML = "";
  const todos = getTodos();
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    if (todo.completed) li.classList.add("completed");

    const textSpan = document.createElement("span");
      textSpan.classList.add("todo-text");
    textSpan.textContent = todo.text;

    li.addEventListener("click", (e) => {
      if (e.target === li || e.target === textSpan) {
        todos[index].completed = !todos[index].completed;
        saveTodos(todos);
        renderTodos();
      }
    });
   const buttonDiv = document.createElement('div')

  
    const editButton = document.createElement("button")
    editButton.classList.add("edit-btn");
    editButton.textContent = "Edit";
    editButton.style.backgroundColor = 'green' 

    editButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const inputEdit = document.createElement("input");
      inputEdit.classList.add("todo-input-edit");
      inputEdit.style.flex = "1";
      inputEdit.style.padding= '8px'
      inputEdit.type = "text";
      inputEdit.value = todo.text;

      const saveEdit = () => {
        const newText = inputEdit.value.trim();
        if (newText) {
          todos[index].text = newText;
          saveTodos(todos);
        }
        renderTodos();
      };

      inputEdit.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          saveEdit();
        } else if (e.key === "Escape") renderTodos();
      });

      inputEdit.addEventListener("blur", saveEdit);
      li.replaceChild(inputEdit, textSpan);
      inputEdit.focus();
      inputEdit.setSelectionRange(
        inputEdit.value.length,
        inputEdit.value.length
      );
    });

   
     
    const deleteButton = document.createElement("button");
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent =  'Delete'
    deleteButton.style.backgroundColor = 'red'
  deleteButton.style.margin= '10px'

    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      todos.splice(index, 1);
      saveTodos(todos);
      renderTodos();
    });

  


li.appendChild(textSpan);
    buttonDiv.appendChild(deleteButton);
    buttonDiv.appendChild(editButton);
    li.appendChild(buttonDiv);
    todoList.appendChild(li);
  });
};

const addTodo = () => {
  const task = input.value.trim();
  if (task === "") return;
  const todos = getTodos();
  todos.push({
    text: task,
    completed: false,
  });
  saveTodos(todos);
  renderTodos();
  input.focus();
  input.value = "";
};

addTask.addEventListener("click", addTodo);
addTask.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

clearTask.addEventListener("click", () => {
  if (confirm("are you sure you want to clear all your tasks?")) {
    localStorage.removeItem("todos");
    renderTodos();
  }
});
renderTodos();