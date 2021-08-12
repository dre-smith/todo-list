let storage = JSON.parse(localStorage.getItem('todo')),
    todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    todoData = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [],
    render = function () {
        todoList.textContent = '';
        todoCompleted.textContent = '';
        localStorage.setItem('todo', JSON.stringify(todoData));
        todoData.forEach(function (item, index) {
            const li = document.createElement('li');
            li.classList.add('todo-item');
            li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + '<div class="todo-buttons">' + '<button class="todo-remove"></button>' + '<button class="todo-complete"></button>' + '</div>';
            if (item.completed) {
                todoCompleted.append(li);
            } else {
                todoList.append(li)
            };
            const buttonTodoComplete = li.querySelector('.todo-complete');
            buttonTodoComplete.addEventListener('click', function () {
                item.completed = !item.completed;
                render();
            });
            const buttonTodoRemove = li.querySelector('.todo-remove');
            buttonTodoRemove.addEventListener('click', function () {
                todoData.splice(index, 1)
                li.remove();
                render();
            });
        });
    };
todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    const newTodo = {
        value: headerInput.value,
        completed: false,
    };
    headerInput.value ? todoData.push(newTodo) : alert('Введите название плана');
    headerInput.value = '';
    render();
});

render();