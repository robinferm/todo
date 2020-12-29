const todoList = document.getElementById('todoList');
const userInput = document.getElementById('userInput');

const getTodos = () => {
  fetch('/getTodos')
    .then(response => response.json())
    .then(data => {
      data.forEach(todo => {
        todoList.innerHTML += `<tr id="tr_${todo._id}"><td>
          <label id="${todo._id}">${todo.todo}</label>
          <input class="editMode" id="input_${todo._id}" type="text" value="${todo.todo}">
          <button class="todoButton" type="button" id="deleteBtn_${todo._id}" onclick="deleteTodo(this.id)">Delete</button>
          <button class="todoButton" type="button" id="editBtn_${todo._id}" onclick="editTodo(this.id)"><i id="icon_${todo._id}" class="far fa-edit"></i></button></td></tr>`
      });
    })
    .catch(err => {
      console.log(err)
    })
}
getTodos();

// Create todo
async function createTodo(url = '/', data = { todo: userInput.value }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => { response.json() })
    .catch(err => { console.log(err) })
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


  // Change Edit button to apply when in edit mode
  // var editBtn = document.getElementById(`editBtn_${clicked_id}`)
  // if (editBtn.innerHTML === "Edit") {
  //   editBtn.innerHTML = "Apply";
  // } else {
  //   editBtn.innerHTML = "Edit";
  //   var inputItemText = document.getElementById(`input_${clicked_id}`).value
  //   item.innerHTML = inputItemText
  // }

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