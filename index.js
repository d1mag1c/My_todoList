const ul = document.querySelector('ul');
const inputAdd = document.querySelector('#add-todo');
let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function (task) {
        newTaskAdd(task)
    })
}

function newTaskAdd(newTask) {

    let liBlock = `
        <li id="${newTask.id}" class="${newTask.done}">
                <div class="menu__nav">
                <button class="done">&#10004;</button>
                    <div class="menu__date">
                        <p>${newTask.date}</p>
                    </div>
                    <button class="close">&#10006;</button>
                </div>
                <div class="menu__text">
                    <p class="textAdd">${newTask.text}</p>
                </div>
        </li>`;

    ul.insertAdjacentHTML('afterbegin', liBlock);
    saveTask()
}

const buttonAdd = document.querySelector('.add');
buttonAdd.addEventListener('click', function () {

    let date = new Date;
    const newTask = {
        id: tasks.length,
        text: inputAdd.value,
        date: date.toLocaleString(),
        done: '',
    };
    if (inputAdd.value !== '') {
        newTaskAdd(newTask)
        tasks.push(newTask);
    }

    saveTask()

    inputAdd.value = '';
    inputAdd.focus();
});

ul.addEventListener('click', function (evt) {

    const liClick = evt.target.closest('li');
    if (evt.target.className === 'close') {
        liClick.remove();

        const index = tasks.findIndex((task) => task.id === Number(liClick.id));
        tasks.splice(index, 1)

        completedCounter()
        saveTask()
    }

    if (evt.target.className === 'done') {
        liClick.classList.toggle('green');
        const changeClass = tasks.find((task) => task.id === Number(liClick.id));

        if (liClick.className === 'green') {
            changeClass.done = 'green'
        } else changeClass.done = ''

        completedCounter()
        saveTask()
    }
});

const buttonDeleteAll = document.querySelector('.delete-all');
buttonDeleteAll.addEventListener('click', function () {
    const liAll = ul.querySelectorAll('li')
    for (let li of liAll) {
        li.remove();
    }

    tasks = [];

    saveTask()
});

const buttonDeleteLast = document.querySelector('.delete-last');
buttonDeleteLast.addEventListener('click', function () {
    const li = ul.querySelector('li');
    if (li) {
        li.remove();
        tasks.pop()
    }

    saveTask()
});

const buttonShowCompleted = document.querySelector('.show-completed');
buttonShowCompleted.addEventListener('click', function () {
    const liAll = ul.querySelectorAll('li');
    buttonShowCompleted.classList.add('red');
    buttonShowAll.classList.remove('red');
    for (let i of liAll) {
        if (i.className !== 'green') {
            i.classList.add('display-none');
        }
    }
});

const buttonShowAll = document.querySelector('.show-all');
buttonShowAll.addEventListener('click', function () {
    const liAll = ul.querySelectorAll('li');
    buttonShowAll.classList.add('red');
    buttonShowCompleted.classList.remove('red');
    for (let i of liAll) {
        i.classList.remove('display-none');
    }
});

const search = document.querySelector('.search');
const searchInput = document.querySelector('#searchInput');
search.addEventListener('click', function () {
    const textAdd = ul.querySelectorAll('.textAdd');
    const liAll = ul.querySelectorAll('li');

    for (let i = 0; i < liAll.length; i++) {

        if (textAdd[i].textContent.indexOf(searchInput.value) <= -1) {

            liAll[i].classList.add('display-none');
        } else liAll[i].classList.remove('display-none');
        if (!searchInput.value) {
            liAll[i].classList.remove('display-none');
        }
    }
});

function completedCounter() {
    let completedTask = document.querySelector('.completed')
    let counter = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].done === 'green') {
            counter++
        }
    }
    completedTask.textContent = `${counter}`
}

function saveTask() {
    let allTask = document.querySelector('.all');
    localStorage.setItem('tasks', JSON.stringify(tasks));
    allTask.textContent = `${tasks.length}`;
    completedCounter()
}