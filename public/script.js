const todoList = document.getElementById('todoList');
const todoListComplete = document.getElementById('todoListComplete');
const userInput = document.getElementById('userInput');

const getTodos = () => {
  fetch('/getTodos')
    .then(response => response.json())
    .then(data => {
      displayTodos(data);
    })
    .catch(err => {
      console.log(err)
    })
}
getTodos();

const displayTodos = (data) => {
  data.forEach(todo => {
    // Set all new todos first and all completed todos last
    if (todo.status === "new") {
      todoList.innerHTML += `<tr id="tr_${todo._id}"><td>
    <button class="todoButton completeButton" type="button" id="completeBtn_${todo._id}" onclick="completeTodo(this.id)"><i id="checkbox_${todo._id}" class="far fa-square"></i></button>
    <label id="${todo._id}">${todo.todo}</label>
    <input class="editMode" id="input_${todo._id}" type="text" value="${todo.todo}">
    <button class="todoButton" type="button" id="deleteBtn_${todo._id}" onclick="deleteTodo(this.id)"><i class="far fa-trash-alt"></i></button>
    <button class="todoButton" type="button" id="editBtn_${todo._id}" onclick="editTodo(this.id)"><i id="icon_${todo._id}" class="far fa-edit"></i></button></td></tr>`
    }
    else {
      todoListComplete.innerHTML += `<tr id="tr_${todo._id}"><td>
    <button class="todoButton completeButton" type="button" id="completeBtn_${todo._id}" onclick="completeTodo(this.id)"><i id="checkbox_${todo._id}" class="far fa-check-square"></i></button>
    <label class="completeTodo" id="${todo._id}">${todo.todo}</label>
    <input class="editMode" id="input_${todo._id}" type="text" value="${todo.todo}">
    <button class="todoButton" type="button" id="deleteBtn_${todo._id}" onclick="deleteTodo(this.id)"><i class="far fa-trash-alt"></i></button>
    <button class="todoButton" type="button" id="editBtn_${todo._id}" onclick="editTodo(this.id)"><i id="icon_${todo._id}" class="far fa-edit"></i></button></td></tr>`
    }
  });
}

// Delete todo
const deleteTodo = (clicked_id) => {
  clicked_id = clicked_id.split('_')[1]
  console.log(clicked_id)
  fetch(`/${clicked_id}`, {
    method: 'DELETE'
  }).then(response => { return response.json() })
    .then((data) => {
      // If delete from db was successful, delete the <li> item from html list
      if (data.ok == 1) {
        var item = document.getElementById(`tr_${clicked_id}`)
        item.parentNode.removeChild(item);
      }
    })
    .catch(err => { console.log(err) })
}


// Edit todo
const editTodo = (clicked_id) => {
  clicked_id = clicked_id.split('_')[1]

  var inputItem = document.getElementById(`input_${clicked_id}`)
  var item = document.getElementById(`${clicked_id}`)

  inputItem.classList.toggle("editMode");
  item.classList.toggle("editMode");

  // Select currect text when clicking edit
  inputItem.select();

  //  Change Edit button icon to checkmark when in edit mode and change back when applying changes
  var icon = document.getElementById(`icon_${clicked_id}`)

  icon.classList.toggle("far")
  icon.classList.toggle("fa-edit")
  icon.classList.toggle("fas")
  icon.classList.toggle("fa-check")

  // If in editmode, update the label value to the new value
  if (icon.classList.contains("fa-edit")) {
    var inputItemText = document.getElementById(`input_${clicked_id}`).value
    item.innerHTML = inputItemText
  }

  // Update db with the new value
  fetch(`/${clicked_id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ todo: inputItemText })
  }).then(response => { return response.json() })
    .catch(err => { console.log(err) })
}


// Mark todo as complete
const completeTodo = (clicked_id) => {
  clicked_id = clicked_id.split('_')[1]
  var checkboxIcon = document.getElementById(`checkbox_${clicked_id}`)
  var item = document.getElementById(`${clicked_id}`)

  // Set checkmark in box when marking todo as complete
  checkboxIcon.classList.toggle("fa-square")
  checkboxIcon.classList.toggle("fa-check-square")
  // Strike through on complete
  item.classList.toggle("completeTodo")

  // Create status to pass in to PUT request body
  var todoStatus = "";
  if (item.classList.contains("completeTodo")) {
    todoStatus = "completed"
  }
  else {
    todoStatus = "new"
  }

  // Move completed task to bottom
  var tr = document.getElementById(`tr_${clicked_id}`)
  if (todoStatus === "completed") {
    todoListComplete.append(tr)
  }
  else {
    todoList.append(tr)
  }

  //Change to completed status in db
  fetch(`/complete/${clicked_id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ status: todoStatus })
  }).then(response => { return response.json() })
    .catch(err => { console.log(err) })
}

// Create todo
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();    //stop form from submitting

  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ todo: userInput.value, status: "new" })
  }).then(response => { return response.json() })
    .then(data => {
      var arr = []
      arr.push(data.document)
      console.log(arr)
      displayTodos(arr)
      userInput.value = "";
    })
    .catch(err => { console.log(err) })
});