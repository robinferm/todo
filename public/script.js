const todoList = document.getElementById('todo-list');
const userInput = document.getElementById('userInput');

const getTodos = () => {
    fetch('/getTodos')
    .then(response => response.json())
    .then(data => {
      data.forEach(todo => {
          todoList.innerHTML += `<li id="${todo._id}">${todo.todo}<button type="button" id="${todo._id}" onclick="deleteTodo(this.id)">Delete</button></li>`
      });
    })
    .catch(err => {
      console.log(err)
    })
}
getTodos();

// Example POST method implementation:
async function createTodo(url = '/', data = {todo : userInput.value}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      //mode: 'no-cors', // no-cors, *cors, same-origin
      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      //redirect: 'follow', // manual, *follow, error
      //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(response => {response.json()})
      .catch(err => {console.log(err)})
   // return response.json(); // parses JSON response into native JavaScript objects
  }
  
//   createTodo()
//     .then(data => {
//       console.log(data); // JSON data parsed by `data.json()` call
//     });




// Delete todo
// async function deleteTodo(todo) {
//   console.log('click1')
//   button = getElementById('delete_5fe9ed217ffa305ff4037771')
//   alert(button)
//     const response = await fetch(`/${todo._id}`, {
//       method: 'DELETE'
//     }).then(response => {response.json()})
//       //.then(`${todo._id}`.remove())
//       .catch(err => {console.log(err)})
// }

// deleteTodo()


// document.getElementsByTagName("button").addEventListener("click", function() {
// alert(todo._id)
// })


const deleteTodo = (clicked_id) => {
    console.log(clicked_id)
    fetch(`/${clicked_id}`, {
      method: 'DELETE'
    }).then(response => {response.json()})
      //.then(`${todo._id}`.remove())
      .catch(err => {console.log(err)})
}

// function deleteTodo(clicked_id)
// {
//     alert(clicked_id);
// }