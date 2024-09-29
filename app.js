// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
LoadEventListeners();

// Load all event listeners
function LoadEventListeners(){
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks); //DOMContentLoaded es cuando se carga la web
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click',removeTask);
    // Clear task event
    clearBtn.addEventListener('click',clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup',filterTasks);
}
// Get Task from LocalStorage
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content'; 
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append the li to ul
    taskList.appendChild(li);
    })
}

// Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content'; 
    // Add icon html
    link.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append the li to ul
    taskList.appendChild(li);
    //Store in LocalStorage
    storeTaskInLocalStorage(taskInput.value);
    // Clear the input
    taskInput.value = '';

    e.preventDefault();
}

// Store task in LocalStorage
function storeTaskInLocalStorage(task){
    let tasks;
    if (localStorage.getItem('tasks') == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LocalStorage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(e){
    //taskList.innerHTML = ''; // One Way
    //Faster way: ?
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    // Clear from LocalStorage
    clearTasksFromLocalStorage();
}

//Clear from LocalStorage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLocaleLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        }
    );
    //console.log(text)
}