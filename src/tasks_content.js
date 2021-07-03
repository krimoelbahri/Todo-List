import showHideElement from './domManipulation'

let tasks= [

];
const pushTasks=function(e){
	e.preventDefault();
	showHideAddTaskForm();
	if(document.getElementById("taskName").value === ""){
		return;
	}else{
		let task= {
			name:document.getElementById("taskName").value,
			description:document.getElementById("taskDescription").value,
			date:"",
			priority:"", 
		};
		tasks.push(task);
		renderTasks();
	}
};
const renderTasks=function(){
	let tasksContainer =document.querySelector("#tasksContainer");
	tasksContainer.textContent="";

	tasks.forEach((task)=>{
		let taskContent = document.createElement("div");
		let descriptionContent = document.createElement("div");
		taskContent.classList.add("taskContent");
		descriptionContent.classList.add("descriptionContent");

		taskContent.innerHTML=`
        <input type="checkbox" name="priority" class="checkTasks">
        <h6>${task.name}</h6>
       `;
		descriptionContent.innerHTML=` 
        <p>${task.description}</p>
        `;
		tasksContainer.appendChild(taskContent);
		tasksContainer.appendChild(descriptionContent);
	});
};
export{pushTasks};