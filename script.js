let todo = [
  { id: 1, content: 'HTML', completed: false, replies: [] },
  { id: 2, content: 'CSS', completed: true, replies: [] },
  { id: 3, content: 'JavaScript', completed: false, replies: [] },
];

function render() {
  const mylist = document.querySelector('#mylist');
  let html = '';
  todo.forEach(({ id, content, completed, replies }) => {
    html += `<li id="${id}">
      <span id="content-${id}" class="todo-content">${content}</span>
      <input type="text" id="input-${id}" class="edit-input" style="display: none;" />
      <button class="edit" onclick="editTodo(${id})">수정</button>
      <button class="remove" onclick="removeTodo(${id})">삭제</button>
      <ul>`;
    replies.forEach((reply, index) => {
      html += `<li>${index + 1}. ${reply}</li>`;
    });
    html += `</ul>
      <input type="text" id="reply-${id}" placeholder="댓글 작성" />
      <button class="add-reply" onclick="addReply(${id})">댓글 추가</button>
    </li>`;
  });

  mylist.innerHTML = html;
}

function addTodo() {
  const content = document.querySelector('#myinput').value;
  const completed = false;
  const replies = [];
  let id;

  if (todo.length !== 0) {
    id = todo[todo.length - 1].id + 1;
  } else {
    id = 1;
  }

  todo.push({ id, content, completed, replies });
  render();

  // 입력 필드 초기화
  document.querySelector('#myinput').value = '';
}

function removeTodo(id) {
  todo = todo.filter(todoItem => todoItem.id !== id);
  render();
}

function editTodo(id) {
  const contentElement = document.querySelector(`#content-${id}`);
  const inputElement = document.querySelector(`#input-${id}`);
  const editButton = document.querySelector(`#content-${id} + .edit`);

  if (contentElement.style.display === 'none') {
    // 이미 수정 중인 경우
    const updatedContent = inputElement.value;

    todo.forEach(todoItem => {
      if (todoItem.id === id) {
        todoItem.content = updatedContent;
      }
    });

    contentElement.style.display = 'inline';
    contentElement.textContent = updatedContent;
    inputElement.style.display = 'none';
    editButton.textContent = '수정';
  } else {
    // 수정 시작
    const originalContent = contentElement.textContent;

    contentElement.style.display = 'none';
    inputElement.style.display = 'inline';
    inputElement.value = originalContent;
    editButton.textContent = '완료';
  }
}

function addReply(id) {
  const replyInput = document.querySelector(`#reply-${id}`);
  const replyContent = replyInput.value;

  todo.forEach(todoItem => {
    if (todoItem.id === id) {
      todoItem.replies.push(replyContent);
    }
  });

  render();

  // 입력 필드 초기화
  replyInput.value = '';
}

render();
