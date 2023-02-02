// alert("welcome to Todos Application 😁")
console.log("script is running;")
let todoItemsContainer = document.getElementById("todoItemsContainer");
function getLocalStorage(){
  let todoFromLocalStorage = localStorage.getItem("todolist");
  let todoParse = JSON.parse(todoFromLocalStorage);
  if(todoParse === null){
    return []
  }
  else{
    return todoParse;
  }
}
let todoList = getLocalStorage()
// empty text li item
let li = document.createElement("li");
li.textContent = "Empty!";
li.classList.add("empty");
// todoItemsContainer.appendChild(li);
//saveButton
let saveButton = document.getElementById("saveButton");
saveButton.onclick = function(){
  localStorage.setItem("todolist",JSON.stringify(todoList));
  saveButton.style.backgroundColor = "green";
  saveButton.textContent = "Saved";
  setTimeout(function(){
    saveButton.style.backgroundColor = "#008CBA";
    saveButton.textContent = "Save";
  },500);
}

//displaying empty  method
function empty(){
    todoItemsContainer.appendChild(li);
    saveButton.classList.add("d-none");
}
function notEmpty(){
    todoItemsContainer.removeChild(li);
    saveButton.classList.remove("d-none");
}
//displaying empty text.
if(todoList.length === 0){empty();}
//checking checkbox ia checked or not
function checked(checboxId,labelId,todoItemId){
  let checkbox = document.getElementById(checboxId);
  let labelElement = document.getElementById(labelId);
  labelElement.classList.toggle("checked");
  let todoIndex = todoList.findIndex(function(eachItem){
    let todoId = "todo"+eachItem.uniqueId;
    if(todoId === todoItemId){
      return true;
    }
    else{
      return false;
    }
    });
    if(checkbox.checked === true){
    todoList[todoIndex].isChecked = true;
    }
    else{
    todoList[todoIndex].isChecked = false;
    }
}

//remove todoitem
function removeTodoItem(todoItemId){
  let todoItem = document.getElementById(todoItemId);
  todoItemsContainer.removeChild(todoItem);
  let todoIndex = todoList.findIndex(function(eachItem){
    let todoId = "todo"+eachItem.uniqueId;
    if(todoId === todoItemId){
      return true;
    }
    else{
      return false;
    }
    });
    todoList.splice(todoIndex,1);
    if(todoList.length === 0){
      empty();
    }
  }

// create todoitem
function createTodoitem(item){
  let value = item.text;
  let checboxId = "checkbox"+item.uniqueId;
  let labelId = "label"+item.uniqueId;
  let todoItemId = "todo"+item.uniqueId;
  let todoItemContainer = document.createElement("li");
  todoItemContainer.id = todoItemId;
  todoItemContainer.classList.add("todo-item-container","d-flex","flex-row");
  todoItemsContainer.appendChild(todoItemContainer);
  let checkBoxInput = document.createElement("input");
  checkBoxInput.type = "checkbox";
  checkBoxInput.checked = item.isChecked;
  
  checkBoxInput.id = checboxId;
  checkBoxInput.classList.add("checkbox-input");
  todoItemContainer.appendChild(checkBoxInput);
  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container","d-flex","flex-row");
  todoItemContainer.appendChild(labelContainer);
  let label = document.createElement("label");
  label.htmlFor = checboxId;
  label.id = labelId;
  label.classList.add("label");
  label.textContent = value;
  labelContainer.appendChild(label);
  if(item.isChecked){
    label.classList.add("checked");
  }
  // checkBox clicing function
  checkBoxInput.onclick = function(){
    checked(checboxId,labelId,todoItemId);
  }
  
  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);
  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("bi","bi-trash","delete-icon");
  deleteIconContainer.appendChild(deleteIcon);
  //deletion icon click function
  deleteIcon.onclick = function(){
    removeTodoItem(todoItemId);
  }
}

// user input value
let userInput = document.getElementById("userInput");
let addButton = document.getElementById("addButton");
let id = todoList.length
  
//addButton on clicking function calling
addButton.onclick = function(){
  id +=1;
  let userInputText = userInput.value;
  if(userInputText == ""*0 || userInputText == ""){
    alert("Please enter Input 🥱")
    return
  }
  let item = {
    text:userInputText,uniqueId:id,isChecked:false
  }
    todoList.push(item)
    createTodoitem(item);
    userInput.value = "";
    //bg-color chanage 
    addButton.style.backgroundColor = "green";
    addButton.textContent = "Added";
    setTimeout(function(){
    addButton.style.backgroundColor = "#008CBA";
    addButton.textContent = "Add";
      
    },500)
    if(todoList.length === 1){notEmpty()}
}

//default todoItem
let idChanger = 1;
for(let item of todoList){
  item.uniqueId = idChanger;
  createTodoitem(item);
  idChanger++;
}