const todoList = document.getElementById('todo-list');
const userInput = document.getElementById('userInput');

const getTodos = () => {
    fetch('/getTodos')
    .then(response => response.json())
    .then(data => {
      data.forEach(todo => {
          todoList.innerHTML += `<li id="${todo._id}">${todo.todo}</li>` 
      });
    })
    .catch(err => {
      console.log(err)
    })
}
getTodos();

// async function createTodo() {
//     var userInput = document.getElementById('userInput');
//     await fetch('/', {
//         method: 'post',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ todo : userInput.value})
//         //body: JSON.stringify({ "todo" : "test"})
//       })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success', data)
//         //getTodos();
//     })
//     .catch(err => {
//         console.log('Error', err)
//     })
// }
console.log(userInput)
console.log(userInput.value)


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
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
//   createTodo()
//     .then(data => {
//       console.log(data); // JSON data parsed by `data.json()` call
//     });










//createTodo();

const resetTodosInput = ()=>{
    userInput.value = "";
}