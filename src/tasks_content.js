import {showHideElement} from './domManipulation';
import {htmlCreate} from './domManipulation';
import {filterArray} from './domManipulation'
let tasks= [];

const deleteTask = function(e){
	let j = e.target.dataset.index;
	tasks.splice(j,1);
	renderTasks();
};
const showHideDescription= function(e){
	let j = e.target.dataset.index;
	showHideElement(`description${j}`,"on");
}

const showHideEditTaskPriority= function(e){
	let j = e.target.dataset.index;
	showHideElement(`editPriority${j}`,"on");
}
const setPriorityColor= function(elm,priority){
	if(priority==="low"){
		elm.style.borderLeft="10px solid green"
	}
	if(priority==="medium"){
		elm.style.borderLeft="10px solid yellow"
	}
	if(priority==="high"){
		elm.style.borderLeft="10px solid red"
	}
}
const editTaskPriority = function(e){
	let j = e.target.dataset.index;
	if(e.target.localName !== "input"){return};
	showHideEditTaskPriority(e);
	tasks[j].priority = e.target.value;
	let taskToEdit= document.getElementById(`task${j}`)
	setPriorityColor(taskToEdit,tasks[j].priority)
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
const projectValue= function(){
	let projectValue = document.getElementById("projectSelect").value;
	if(projectValue===""){
		return("inbox");
	}else{
			return projectValue;
		}
};
const checkTasks= function(e){
	if(e.target.checked){
		e.target.nextElementSibling.style.textDecoration="line-through"
	}else{
		e.target.nextElementSibling.style.textDecoration="none"
	}
}
const pushTasks=function(e){
	e.preventDefault();
	showHideElement("addTaskForm","on");
	let task= {
		name:document.getElementById("taskName").value,
		description:document.getElementById("taskDescription").value,
		date:document.getElementById("taskDueDate").value,
		priority:priorityValue(),
		project:projectValue(),
	};
	tasks.push(task);
	renderTasks();
};
const taskContent =function(i,task){
	let taskContent =htmlCreate("div",`task${i}`,"","taskContent");
	taskContent.setAttribute("data-index",i);
	setPriorityColor(taskContent,task.priority);
	taskContent.innerHTML=`
	<div class="taskDiv left" >
	<input type="checkbox" class="checkTasks">
	<h6 id="taskName${i}" data-index=${i}>${task.name}</h6>
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
const renderMain= function(e){
	document.getElementById("projectTitle").innerHTML=e.target.innerText;
	renderTasks();
}
const renderTasks=function(){
	let project= document.getElementById("projectTitle").innerHTML;
	console.log(project); 
	let tasksContainer =document.querySelector("#tasksContainer");
	tasksContainer.textContent="";
	let i=0;
	let tasksArray=tasks;
	if(project.toLocaleLowerCase !=="inbox"){
		tasksArray= filterArray(tasks,project.toLocaleLowerCase)
	}
	tasksArray.forEach((task)=>{
		tasksContainer.appendChild(editTaskPriorityForm(i));
		tasksContainer.appendChild(taskContent(i,task));
		tasksContainer.appendChild(descriptionContent(i,task));
		document.getElementById(`editPriority${i}`).addEventListener("click",editTaskPriority);
		document.getElementById(`edit${i}`).addEventListener("click", showHideEditTaskPriority);
		document.getElementById(`delete${i}`).addEventListener("click", deleteTask)
		document.getElementById(`taskName${i}`).addEventListener("click",showHideDescription)
		document.querySelectorAll('.checkTasks').forEach((check)=>{
			check.addEventListener("click",checkTasks);
		})
		i++;
	});
};
export{pushTasks};
export{renderMain};
