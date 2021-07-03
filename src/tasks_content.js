import {showHideElement} from './domManipulation';
import {htmlCreate} from './domManipulation';

let tasks= [

];
const deleteTask = function(e){
	let j = e.target.dataset.index;
	tasks.splice(j,1);
	//localStorage.setItem("library",JSON.stringify(tasks));
	renderTasks();
};
const showHideEditTaskPriority
const editTaskPriority= function(){
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
const renderTasks=function(){
	let tasksContainer =document.querySelector("#tasksContainer");
	tasksContainer.textContent="";
	let i=0;
	tasks.forEach((task)=>{
		let taskContent =htmlCreate("div",`task${i}`,"","taskContent");
		let descriptionContent = htmlCreate("div",`description${i}`,"","descriptionContent");
		taskContent.innerHTML=`
        <input type="checkbox" class="checkTasks">
        <h6>${task.name}</h6>
		<div>
			<p>${task.date}</p>
			<button id="edit${i}" data-index=${i}>Edit</button>
			<button id="delete${i}" data-index=${i}>Delete</button>
		</div>
       `;
		descriptionContent.innerHTML=` 
        <p>${task.description}</p>
        `;
		tasksContainer.appendChild(taskContent);
		tasksContainer.appendChild(descriptionContent);
		//document.getElementById(`edit${i}`).addEventListener("click", showHideEditTaskPriority);
		document.getElementById(`delete${i}`).addEventListener("click", deleteTask)
		//document.querySelector('.checkTasks').addEventListener("click",checkTasks)
		i++;
	});
};
export{pushTasks};