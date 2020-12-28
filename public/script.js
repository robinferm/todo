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
          <button class="todoButton" type="button" id="${todo._id}" onclick="editTodo(this.id)">Edit</button>
          <button class="todoButton" type="button" id="${todo._id}" onclick="deleteTodo(this.id)">Delete</button></td></tr><br>`
      });
    })
    .catch(err => {
      console.log(err)
    })
}
getTodos();

// Create todo
async function createTodo(url = '/', data = {todo : userInput.value}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {response.json()})
      .catch(err => {console.log(err)})
}

// Delete todo
const deleteTodo = (clicked_id) => {
    console.log(clicked_id)
    fetch(`/${clicked_id}`, {
      method: 'DELETE'
    }).then(response => {return response.json()})
      .then((data) => {
        // If delete from db was successful, delete the <li> item from html list
        if(data.ok == 1){
          var item = document.getElementById(`tr_${clicked_id}`)
          item.parentNode.removeChild(item);
        }
      })
      .catch(err => {console.log(err)})
}

// Edit todo
const editTodo = (clicked_id) => {
  console.log(clicked_id)
  var inputItem = document.getElementById(`input_${clicked_id}`)
  var item = document.getElementById(`${clicked_id}`)
  console.log(item)
  //item.setAttribute("class", "editMode")
  //item.removeAttribute("class", "editMode")
  inputItem.classList.toggle("editMode");
  item.classList.toggle("editMode");



  // fetch(`/${clicked_id}`, {
  //   method: 'PUT'
  // }).then(response => {return response.json()})
  //   .then((data) => {
  //     if(data.ok == 1){
  //       var item = document.getElementById(clicked_id)
  //       item.parentNode.removeChild(item);
  //     }
  //   })
  //   .catch(err => {console.log(err)})
}
