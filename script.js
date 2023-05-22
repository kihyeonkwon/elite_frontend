
let todo = [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false },
];


function render() {
  const mylist = document.querySelector('#mylist');
  let html = '';
  todo.forEach(({ id, content, completed }) => {

    html += `<li id="${id}">
      ${content}
      <button class="remove" onclick="removeTodo(${id})">삭제</button>
    </li>`;
  });

  mylist.innerHTML = html;
}

function addTodo() {
  const content = document.querySelector('#myinput').value;
  const completed = false;
  let id;

  if (todo.length !== 0) {
    id = todo[todo.length - 1].id + 1;
  } else {
    id = 1;
  }
  // 다른방법


  todo.push({ id, content, completed });
  render();

  // input 초기화
  document.querySelector('#myinput').value = '';

}

function removeTodo(id) {
  todo = todo.filter(todo => todo.id !== id);
  render();
}



render();

