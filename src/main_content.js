import {pushTasks} from "./tasks_content";
import { htmlCreate } from "./domManipulation";
import { showHideElement } from "./domManipulation";
const rotateAddTaskButton= function(e){
	console.log(e);
	e.target.parentElement.classList.toggle("on");
   
	if(e.target.parentElement.className === ("on")){
		e.target.parentElement.style.transform ="rotate(45deg)";
	}else{
		e.target.parentElement.style.transform ="rotate(0deg)";
	}
};
const showHideAddTaskForm=function(e){
	e.preventDefault();
	showHideElement("addTaskForm","on");
};
const addTaskButton=function(){
	const addTaskButton=htmlCreate("div","addTaskButton","<i class=\"fi-rr-add\"></i>")
	addTaskButton.addEventListener("click", showHideAddTaskForm);
	addTaskButton.addEventListener("click", rotateAddTaskButton);
	return addTaskButton;
};
const mainTitle=function(){
	const mainTitle=htmlCreate("div","mainTitle","Inbox");
	mainTitle.appendChild(addTaskButton());
	return mainTitle;
};

const tasksContainer=function(){
	const tasksContainer= htmlCreate("div","tasksContainer","")
	return tasksContainer;
};

const addTaskForm = function() {
	const addTaskForm =htmlCreate("form","addTaskForm","","TaskForm") 
	addTaskForm.innerHTML=`
    <div class="formdivs">
        <input type="text" id="taskName" placeholder="Task Name">
        <p>Task Description</p>
    <textarea type="text" id="taskDescription" ></textarea>
    </div>
    <div class="formdivs">
        <input type="date" name="due date" id="taskDueDate">
        <p>Task Priority</p>
        <label for="priority">
            <input type="radio" name="priority" class="priority" value="low" checked> Low 
            <input type="radio" name="priority" class="priority" value="medium"> Medium
            <input type="radio" name="priority" class="priority" value="high"> High 
        </label>
         <button id="addTask" >Add Task</button>
    </div>
    `;
	addTaskForm.querySelector("#addTask").addEventListener("click",pushTasks);
	return addTaskForm;
};

const mainContent=function(){
	const mainContent=htmlCreate("div","mainContent","")
	mainContent.appendChild(mainTitle());
	mainContent.appendChild(addTaskForm());
	mainContent.appendChild(tasksContainer());
	return mainContent;
};
export {mainContent};