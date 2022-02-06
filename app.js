const todoInput=document.querySelector('.todo-input')
const todoButton=document.querySelector('.todo-button')
const todoList=document.querySelector('.todo-list')
todoInput.placeholder = "Enter your task...."
const filterOption=document.querySelector("#filter-todo")

let flag=0;
document.addEventListener('DOMContentLoaded', getTodos)

document.addEventListener('DOMContentLoaded', () => {

    const todoDiv = document.querySelectorAll(".todo");
    let comp 
    if( localStorage.getItem("comp") === null) {
        comp = [];
    }
    else{
        comp = JSON.parse(localStorage.getItem("comp"))
    } 

    comp.forEach((elem,index) => {
        if(elem == 1){
            console.log(`Hi ${index}`);
             todoDiv[index].classList.toggle('completed')
        }
    })
})
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click' , deleteEditCheck);
filterOption.addEventListener('click', filterTodo); 


function addTodo(event){
    if(flag === 0){
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value)
    saveLocalComp()

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);


    todoInput.value = "";
    }
    if(flag === 1){
        event.preventDefault();
        const items=document.querySelectorAll(".todo-item")
        items.forEach(item => {
                if(item.innerHTML == -999){         
                    item.innerHTML=todoInput.value
                    item.parentElement.style.display = "flex"
                    changeLocalTodos(todoInput.value)   
                    todoInput.value=''  
                }
        })
        flag=0
    }
}

function deleteEditCheck(e){
    const item = e.target;

    if(item.classList[0] === 'trash-btn'){
        const todo=item.parentElement;
        todo.classList.add('fall')
        removeLocalTodos(todo)
        removeComp(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    if(item.classList[0] === 'complete-btn'){
        const todo=item.parentElement;
        todo.classList.toggle('completed')
        editComp(todo)
    }

    if(item.classList[0] === 'edit-btn'){
        const todo=item.parentElement;
        const ediTex=todo.firstChild.innerHTML;
        todoInput.value=ediTex
        editLocalTodos(todo)
        todo.firstChild.innerHTML="-999"
        todo.style.display = "none"
        flag=1;
    }
}


function filterTodo(e){
    const todos = document.querySelectorAll(".todo")
    todos.forEach(todo => {
        switch (e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                todo.style.display = "flex";
                break;
                }
                else{
                todo.style.display = "none"; 
                break;
                }
            case "not-completed":
                if(todo.classList.contains('completed')){  
                todo.style.display = "none";
                break;
                }
                else{
                todo.style.display = "flex";      
                break;
                }
        }
    })
}

function saveLocalTodos(todo) {
    let todos

    if( localStorage.getItem("todos") === null) {
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    } 
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}    

function getTodos(){
    let todos

    if( localStorage.getItem("todos") === null) {
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    } 

    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.classList.add("edit-btn");
        todoDiv.appendChild(editButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    })
}


function removeLocalTodos(todo){
    let todos

    if( localStorage.getItem("todos") === null) {
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    } 
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function editLocalTodos(todo){
    let todos

    if( localStorage.getItem("todos") === null) {
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    } 
    const todoIndex = todo.children[0].innerText;
    const todoVal = todos.indexOf(todoIndex);
    todos[todoVal] = -999;
    localStorage.setItem('todos', JSON.stringify(todos))
}

function changeLocalTodos(todo){
    let todos  
    if( localStorage.getItem("todos") === null) {
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    } 
    const todoVal = todos.indexOf(-999)
    todos[todoVal] = todo
    localStorage.setItem('todos', JSON.stringify(todos))
}







function saveLocalComp(){
    let comp 
    if( localStorage.getItem("comp") === null) {
        comp = [];
    }
    else{
        comp = JSON.parse(localStorage.getItem("comp"))
    } 
    comp.push(0)
    localStorage.setItem('comp', JSON.stringify(comp))
}
function removeComp(todo){

    let todos = JSON.parse(localStorage.getItem("todos"))

    let comp = JSON.parse(localStorage.getItem("comp"))

    const todoIndex = todo.children[0].innerText;
    const todoVal = todos.indexOf(todoIndex);
    comp.splice(todoVal, 1)
    localStorage.setItem('comp', JSON.stringify(comp))
}
function editComp(todo){
    let comp

    if( localStorage.getItem("comp") === null) {
        comp = [];
    }
    else{
        comp = JSON.parse(localStorage.getItem("comp"))
    }  
    const status = todo.classList;
    let todos = JSON.parse(localStorage.getItem("todos"))
    const todoIndex = todo.children[0].innerText;
    const todoVal = todos.indexOf(todoIndex);
    if(status.length == 2){
        comp[todoVal]=1;
        console.log(todoVal);
    }
    if(status.length == 1){
        comp[todoVal]=0;
        console.log(todoVal);
    }
    localStorage.setItem('comp', JSON.stringify(comp))
}


