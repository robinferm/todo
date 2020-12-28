const todoList = document.getElementById('todoList');
const userInput = document.getElementById('userInput');

const getTodos = () => {
    fetch('/getTodos')
    .then(response => response.json())
    .then(data => {
      data.forEach(todo => {
          todoList.innerHTML += `<li class="todoItem" id="${todo._id}">${todo.todo}
              <button class="todoButton" type="button" id="${todo._id}" onclick="deleteTodo(this.id)">Delete</button>
              <button class="todoButton" type="button" id="${todo._id}" onclick="editTodo(this.id)">Edit</button>
          </li>`
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
          var item = document.getElementById(clicked_id)
          item.parentNode.removeChild(item);
        }
      })
      .catch(err => {console.log(err)})
}