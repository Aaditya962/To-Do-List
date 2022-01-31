const todoInput=document.querySelector('.todo-input')
const todoButton=document.querySelector('.todo-button')
const todoList=document.querySelector('.todo-list')
todoInput.placeholder = "Enter your task...."
const filterOption=document.querySelector("#filter-todo")

let flag=0;
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
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    if(item.classList[0] === 'complete-btn'){
        const todo=item.parentElement;
        todo.classList.toggle('completed')
    }

    if(item.classList[0] === 'edit-btn'){
        const todo=item.parentElement;
        const ediTex=todo.firstChild.innerHTML;
        todoInput.value=ediTex
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
