

const inputTask = document.getElementById('input-task');
const addbtn = document.getElementById('addbtn');
const taskList = document.getElementById('task-list');

const savedTask = localStorage.getItem('tasks');
const tasks = savedTask ? JSON.parse(savedTask) : [];

const todosContainer = document.querySelector('todos-container');
// const toggleEmptySpace = ()=>{
//     emptyImage.style.diplay = taskList.children.length === 0 ? 'block' : 'none';
//     todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
// }
// To save the task to localStroage
function saveTask() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskList(todo, index) {

    const li = document.createElement('li');
    const spanText = document.createElement('span');
    spanText.textContent = todo.text;

    // task state 
    const taskState = document.createElement('input');
    taskState.type = 'checkbox';
    taskState.className = 'checkbox';
    taskState.checked = !!todo.state;
    spanText.style.textDecoration = todo.state ? 'line-through' : 'none';
    spanText.style.opacity = todo.state ? '0.5' : '1';
    taskState.addEventListener('change', () => {
        todo.state = taskState.checked;
        spanText.style.textDecoration = todo.state ? 'line-through' : 'none';
        li.classList.toggle('completed', todo.state);
        editbtn.disabled = todo.state;
        editbtn.style.opacity = todo.state ? '0.5' : '1';
        editbtn.style.pointerEvents = todo.state ? 'none' : 'auto';
        saveTask();
    })

    
    // edit the task
    const editbtn = document.createElement('button');
    editbtn.className = 'edit-btn';
    editbtn.innerHTML = '<i class="fa-solid fa-pencil"></i>'
    editbtn.addEventListener('click', () => {
        const editedTask = prompt('edit the task', todo.text);
        if (editedTask !== null) {
            todo.text = editedTask.trim();
            spanText.textContent = todo.text;
            saveTask();
            render();
        }
    })
    
    if(todo.state){
        li.classList.add('completed');
        editbtn.disabled = true;
        editbtn.style.opacity = '0.5';
        editbtn.style.pointerEvents = 'none';
    }
    
    // delete button

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
    deleteBtn.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTask();
        render();
    })
    li.appendChild(taskState);
    li.appendChild(spanText);
    li.appendChild(editbtn);
    li.appendChild(deleteBtn);

    return li;
}

// To render task list
function render() {
    taskList.innerHTML = "";
    tasks.forEach((todo, index) => {
        const task = createTaskList(todo, index);
        taskList.appendChild(task);
    })
}

function addTask() {
    const text = inputTask.value.trim();
    if (!text) return; // If task is empty (falsy), stop the function and don't continue
    tasks.push({ text, state: false });
    inputTask.value = '';
    // toggleEmptySpace();
    saveTask();
    render();
}

addbtn.addEventListener('click', (event) => {
    event.preventDefault();
    addTask();
});
render();
inputTask.addEventListener('keypress', (e) => {
    if (e.key === 'enter') addTask();
    render();
})


