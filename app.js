const inputTask = document.getElementById('todo-input');
const addTask = document.getElementById('btn-todo');
const taskItems = document.getElementsByClassName('todo-wrapper')[0];
const h2 = document.getElementsByTagName('h2')[0]
let tasks;
localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('task'));

let totoItemElems = []

function Task(desciption) {
    this.desciption = desciption;
    this.comleted = false
}
const filterTask = () => {
    const activeTask = tasks.length && tasks.filter(item => item.comleted == false)
    const completedTask = tasks.length && tasks.filter(item => item.comleted == true)
    tasks = [...activeTask, ...completedTask]
}
const createTemplate = (item, index) => {
    return `
        <div class="todos-item ${item.comleted ? 'checked' : ''}">
            <div class="todo-item">${item.desciption}</div>
            <div class="buttons-todo">
                <input onclick="completeTask(${index})" id="checkbox" type="checkbox" ${item.comleted ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" class="btn-complete">Delete</button>
              </div>       
        </div>
    `
}
const fillHtmlList = () => {
    taskItems.innerHTML = '';
    if (tasks.length > 0) {
        filterTask();
        tasks.forEach((elem, index) => {
            taskItems.innerHTML += createTemplate(elem, index)
        })
        totoItemElems = document.querySelector('.todos-item')
    }
}
fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('task', JSON.stringify(tasks))
}
addTask.addEventListener('click', () => {
    tasks.push(new Task(inputTask.value))
    updateLocal();
    fillHtmlList();
    inputTask.value = ""
})

const completeTask = index => {
    tasks[index].comleted = !tasks[index].comleted
    updateLocal();
    fillHtmlList();
}

const deleteTask = index => {
    tasks.splice(index, 1)
    updateLocal();
    fillHtmlList();
}