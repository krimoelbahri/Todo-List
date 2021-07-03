import showHideElement from './domManipulation';
import htmlCreate from './domManipulation';

let tasks= [

];
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
			priority:"", 
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
        <input type="checkbox" name="priority" class="checkTasks">
        <h6>${task.name}</h6>
       `;
		descriptionContent.innerHTML=` 
        <p>${task.description}</p>
        `;
		tasksContainer.appendChild(taskContent);
		tasksContainer.appendChild(descriptionContent);
		i++;
	});
};
export{pushTasks};