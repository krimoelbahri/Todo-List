import {pushTasks} from "./tasks_content";
import { htmlCreate } from "./domManipulation";
const mainTitle=function(){
	const mainTitle=document.createElement("div");
	mainTitle.setAttribute("id","mainTitle");
	mainTitle.innerHTML="Inbox";
	return mainTitle;
};
const addTaskButton=function(){
	const addTaskButton=document.createElement("div");
	addTaskButton.setAttribute("id","addTaskButton");
	addTaskButton.innerHTML="<i class=\"fi-rr-add\"></i>";
	addTaskButton.addEventListener("click", showHideAddTaskForm);
	return addTaskButton;
};
const tasksContainer=function(){
	const tasksContainer=document.createElement("div");
	tasksContainer.setAttribute("id","tasksContainer");
	return tasksContainer;
};

const addTaskForm = function() {
	const addTaskForm = document.createElement("form");
	addTaskForm.setAttribute("id","addTaskForm");
	addTaskForm.classList.add("TaskForm");
	addTaskForm.innerHTML=`
    <div class="formdivs">
     <button id="close">x</button>
        <input type="text" id="taskName" placeholder="Task Name">
        <p>Task Description</p>
    <textarea type="text" id="taskDescription" ></textarea>
    </div>
    <div class="formdivs">
        <input type="date" name="due date" id="taskDueDate">
        <p>Task Priority</p>
        <label for="priority">
            <input type="radio" name="priority" class="priority" value="low"> Low 
            <input type="radio" name="priority" class="priority" value="medium"> Medium
            <input type="radio" name="priority" class="priority" value="high"> High 
        </label>
         <button id="addTask" >Add Task</button>
    </div>
    `;
	addTaskForm.querySelector("#close").addEventListener("click",showHideAddTaskForm);
	addTaskForm.querySelector("#addTask").addEventListener("click",pushTasks);
	return addTaskForm;
};
const showHideAddTaskForm=function(){
	let addTaskForm=document.getElementById("addTaskForm");
	if(addTaskForm.classList.value === "TaskForm"){
		addTaskForm.classList.add("on");
	}else{
		addTaskForm.classList.remove("on");
	}
};

const mainContent=function(){
	const mainContent=document.createElement("div");
	mainContent.setAttribute("id","mainContent");
	mainContent.appendChild(mainTitle());
	mainContent.appendChild(addTaskButton());
	mainContent.appendChild(addTaskForm());
	mainContent.appendChild(tasksContainer());
	return mainContent;
};
export {mainContent};
export{showHideAddTaskForm};