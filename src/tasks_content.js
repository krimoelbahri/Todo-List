import {showHideElement} from './domManipulation';
import {htmlCreate} from './domManipulation';

let tasks= [];

const deleteTask = function(e){
	let j = e.target.dataset.index;
	tasks.splice(j,1);
	renderTasks();
};
const showHideEditTaskPriority= function(e){
	let j = e.target.dataset.index;
	showHideElement(`editPriority${j}`,"on");
}
const editTaskPriority = function(e){
	let j = e.target.dataset.index;
	if(e.target.localName !== "input"){return};
	showHideEditTaskPriority(e);
	tasks[j].priority = e.target.value;
}
const priorityValue= function(){
	let priorityValue
	let priorities= (document.querySelectorAll(".priority"));
		priorities.forEach((input)=>{
			if(input.checked){
				priorityValue= input.value;
		}})
	return priorityValue;
};
const pushTasks=function(e){
	e.preventDefault();
	showHideElement("addTaskForm","on");
	if(document.getElementById("taskName").value === ""){
		return;
	}else{
		let task= {
			name:document.getElementById("taskName").value,
			description:document.getElementById("taskDescription").value,
			date:document.getElementById("taskDueDate").value,
			priority:priorityValue(), 
		};
		tasks.push(task);
		renderTasks();
	}
};
const taskContent =function(i,task){
	let taskContent =htmlCreate("div",`task${i}`,"","taskContent");
	taskContent.innerHTML=`
	<div class="taskDiv left" >
	<input type="checkbox" class="checkTasks">
	<h6>${task.name}</h6>
	</div>
	
	<div class="taskDiv right">
		<p>${task.date}</p>
		<button id="edit${i}" data-index=${i}>Edit</button>
		<button id="delete${i}" data-index=${i}>Delete</button>
	</div>
   `;
   return taskContent;
}
const descriptionContent = function(i,task){
	let descriptionContent = htmlCreate("div",`description${i}`,"","descriptionContent");
	descriptionContent.innerHTML=` 
	<p>${task.description}</p>
	`;
	return descriptionContent;
}
const editTaskPriorityForm = function(i){
	let editTaskPriorityForm = htmlCreate("form",`editPriority${i}`,"","editForm" );
	editTaskPriorityForm.innerHTML=`
	<label for="priority">
		<input type="radio" name="priority" class="edit_priority" data-index=${i} value="low"> Low 
		<input type="radio" name="priority" class="edit_priority" data-index=${i} value="medium"> Medium
		<input type="radio" name="priority" class="edit_priority" data-index=${i} value="high"> High 
	</label>
	`
	return editTaskPriorityForm;
}
const renderTasks=function(){
	let tasksContainer =document.querySelector("#tasksContainer");
	tasksContainer.textContent="";
	let i=0;
	tasks.forEach((task)=>{
		tasksContainer.appendChild(taskContent(i,task));
		tasksContainer.appendChild(descriptionContent(i,task));
		tasksContainer.appendChild(editTaskPriorityForm(i));
		document.getElementById(`editPriority${i}`).addEventListener("click",editTaskPriority);
		document.getElementById(`edit${i}`).addEventListener("click", showHideEditTaskPriority);
		document.getElementById(`delete${i}`).addEventListener("click", deleteTask)
		//document.querySelector('.checkTasks').addEventListener("click",checkTasks)
		i++;
	});
};
export{pushTasks};