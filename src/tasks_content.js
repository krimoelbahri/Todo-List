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
const showHideEditTaskPriority= function(e){
	let j = e.target.dataset.index;
	showHideElement(`editPriority${j}`,"on");
}
const editTaskPriority = function(e){
	let j = e.target.dataset.index;
	showHideEditTaskPriority(e);
	if(e.target.localName !== "input"){return};
	tasks[j].priority = e.target.value;
	console.log(tasks[j])
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
		let editTaskPriorityForm = htmlCreate("form",`editPriority${i}`,"","editForm" );
		taskContent.innerHTML=`
		<div>
		<input type="checkbox" class="checkTasks">
        <h6>${task.name}</h6>
		</div>
        
		<div>
			<p>${task.date}</p>
			<button id="edit${i}" data-index=${i}>Edit</button>
			<button id="delete${i}" data-index=${i}>Delete</button>
		</div>
       `;
		descriptionContent.innerHTML=` 
        <p>${task.description}</p>
        `;
		editTaskPriorityForm.innerHTML=`
		<label for="priority">
            <input type="radio" name="priority" class="edit_priority" data-index=${i} value="low"> Low 
            <input type="radio" name="priority" class="edit_priority" data-index=${i} value="medium"> Medium
            <input type="radio" name="priority" class="edit_priority" data-index=${i} value="high"> High 
        </label>
		`
		tasksContainer.appendChild(taskContent);
		tasksContainer.appendChild(descriptionContent);
		tasksContainer.appendChild(editTaskPriorityForm);
		document.getElementById(`editPriority${i}`).addEventListener("click",editTaskPriority);
		document.getElementById(`edit${i}`).addEventListener("click", showHideEditTaskPriority);
		document.getElementById(`delete${i}`).addEventListener("click", deleteTask)
		//document.querySelector('.checkTasks').addEventListener("click",checkTasks)
		i++;
	});
};
export{pushTasks};