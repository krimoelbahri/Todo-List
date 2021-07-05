import {pushTasks} from "./tasks_content";
import {htmlCreate} from "./domManipulation";
import {showHideElement} from "./domManipulation";
const rotateAddTaskButton= function(){
	
	let addTaskButton = document.getElementById("addTaskButton");
	addTaskButton.classList.toggle("on");
	if(addTaskButton.className === ("on")){
		addTaskButton.style.transform ="rotate(45deg)";
	}else{
		addTaskButton.style.transform ="rotate(0deg)";
	}
};
const showHideAddTaskForm=function(){
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
        <input type="text" id="taskName" placeholder="Task Name" required>
        <p>Task Description</p>
    <textarea type="text" id="taskDescription" required ></textarea>
    </div>
    <div class="formdivs">
        <input type="date" name="due date" id="taskDueDate" required>
		<label for="pet-select">Choose a project:</label>
		<select name="pets" id="projectSelect">
			<option value="">--Please choose an option--</option>
			<option value="inbox">Default project</option>
		</select>
        <p>Task Priority</p>
        <label for="priority">
            <input type="radio" name="priority" class="priority" value="low" checked> Low 
            <input type="radio" name="priority" class="priority" value="medium"> Medium
            <input type="radio" name="priority" class="priority" value="high"> High 
        </label>
         <button type="submit" id="addTask" >Add Task</button>
    </div>
    `;
	
	addTaskForm.addEventListener("submit",pushTasks);
	addTaskForm.addEventListener("submit",rotateAddTaskButton);
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