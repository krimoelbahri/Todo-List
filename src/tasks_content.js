import { showHideElement } from "./domManipulation";
import { htmlCreate } from "./domManipulation";
import { saveTasks } from "./fireStore";
const deleteTask = function (e) {
	let j = e.target.dataset.index;
	let query = firebase.firestore().collection("Tasks").doc(j);
	query
		.delete()
		.then(() => {
			tasksContainer.removeChild(document.getElementById(`task${j}`));
			tasksContainer.removeChild(
				document.getElementById(`description${j}`)
			);
			tasksContainer.removeChild(
				document.getElementById(`editPriority${j}`)
			);
		})
		.catch((error) => {
			console.error("Error removing document: ", error);
		});
};
const showHideDescription = function (e) {
	let j = e.target.dataset.index;
	showHideElement(`description${j}`, "on");
};

const showHideEditTaskPriority = function (e) {
	let j = e.target.dataset.index;
	showHideElement(`editPriority${j}`, "on");
};
const setPriorityColor = function (elm, priority) {
	if (priority === "low") {
		elm.style.borderLeft = "10px solid green";
	}
	if (priority === "medium") {
		elm.style.borderLeft = "10px solid yellow";
	}
	if (priority === "high") {
		elm.style.borderLeft = "10px solid red";
	}
};
const editTaskPriority = function (e) {
	let j = e.target.dataset.index;
	console.log(j);
	if (e.target.localName !== "input") {
		return;
	}
	showHideEditTaskPriority(e);
	updatePriority(j, e.target.value);
};
const priorityValue = function () {
	let priorityValue;
	let priorities = document.querySelectorAll(".priority");
	priorities.forEach((input) => {
		if (input.checked) {
			priorityValue = input.value;
		}
	});
	return priorityValue;
};
const projectValue = function () {
	let projectValue = document.getElementById("projectSelect").value;
	if (projectValue === "") {
		return "inbox";
	} else {
		return projectValue;
	}
};
const checkTasks = function (e) {
	if (e.target.checked) {
		e.target.nextElementSibling.style.textDecoration = "line-through";
	} else {
		e.target.nextElementSibling.style.textDecoration = "none";
	}
};
const pushTasks = function (e) {
	e.preventDefault();
	showHideElement("addTaskForm", "on");
	let task = {
		name: document.getElementById("taskName").value,
		description: document.getElementById("taskDescription").value,
		date: document.getElementById("taskDueDate").value,
		priority: priorityValue(),
		project: projectValue(),
	};
	saveTasks(
		task.name,
		task.description,
		task.date,
		task.priority,
		task.project
	);
};

const taskContent = function (id, task) {
	let taskContent = htmlCreate("div", `task${id}`, "", "taskContent");
	taskContent.setAttribute("data-index", `${id}`);
	setPriorityColor(taskContent, task.priority);
	taskContent.innerHTML = `
	<div class="taskDiv left" >
	<input type="checkbox" class="checkTasks">
	<h6 id="taskName${id}" data-index=${id}>${task.name}</h6>
	</div>
	
	<div class="taskDiv right">
		<p>${task.date}</p>
		<button id="edit${id}" data-index=${id}>Edit</button>
		<button id="delete${id}" data-index=${id}>Delete</button>
	</div>
   `;
	return taskContent;
};

const descriptionContent = function (id, task) {
	let descriptionContent = htmlCreate(
		"div",
		`description${id}`,
		"",
		"descriptionContent"
	);
	descriptionContent.innerHTML = ` 
	<p>${task.description}</p>
	`;
	return descriptionContent;
};

const editTaskPriorityForm = function (id) {
	let editTaskPriorityForm = htmlCreate(
		"form",
		`editPriority${id}`,
		"",
		"editForm"
	);
	editTaskPriorityForm.innerHTML = `
	<label for="priority">
		<input type="radio" name="priority" class="edit_priority" data-index=${id} value="low"> Low 
		<input type="radio" name="priority" class="edit_priority" data-index=${id} value="medium"> Medium
		<input type="radio" name="priority" class="edit_priority" data-index=${id} value="high"> High 
	</label>
	`;
	return editTaskPriorityForm;
};
const renderMain = function (e) {
	document.getElementById("projectTitle").innerHTML =
		e.target.innerText;
	loadFilteredTasks(e.target.innerText);
};
const displayTasks = function (id, data) {
	//let project = document.getElementById("projectTitle").innerHTML;
	let tasksContainer = document.querySelector("#tasksContainer");
	if (document.getElementById(`task${id}`)) {
		return;
	}
	tasksContainer.appendChild(editTaskPriorityForm(id));
	tasksContainer.appendChild(taskContent(id, data));
	tasksContainer.appendChild(descriptionContent(id, data));
	document
		.getElementById(`editPriority${id}`)
		.addEventListener("click", editTaskPriority);
	document
		.getElementById(`edit${id}`)
		.addEventListener("click", showHideEditTaskPriority);
	document
		.getElementById(`delete${id}`)
		.addEventListener("click", deleteTask);
	document
		.getElementById(`taskName${id}`)
		.addEventListener("click", showHideDescription);
	document.querySelectorAll(".checkTasks").forEach((check) => {
		check.addEventListener("click", checkTasks);
	});
};

function loadTasks() {
	// Create the query to load projects and listen for new ones.
	let query = firebase
		.firestore()
		.collection("Tasks")
		.orderBy("timestamp", "asc");

	// Start listening to the query.
	query.onSnapshot(function (snapshot) {
		snapshot.docChanges().forEach(function (change) {
			if (change.type === "removed") {
			} else {
				let project = change.doc.data();
				let id = change.doc.id;
				displayTasks(id, project);
			}
		});
	});
}
function loadFilteredTasks(filter) {
	let tasksContainer = document.querySelector("#tasksContainer");
	tasksContainer.innerHTML = "";
	let query = firebase.firestore().collection("Tasks");

	query = query
		.where("project", "==", filter)
		.orderBy("timestamp", "asc");
	console.log(query);

	// Start listening to the query.
	query.onSnapshot(function (snapshot) {
		snapshot.docChanges().forEach(function (change) {
			if (change.type === "removed") {
			} else {
				let project = change.doc.data();
				let id = change.doc.id;
				displayTasks(id, project);
			}
		});
	});
}
function updatePriority(id, value) {
	let db = firebase.firestore();
	var docToUpdate = db.collection("Tasks").doc(id);
	return db
		.runTransaction((transaction) => {
			return transaction.get(docToUpdate).then((document) => {
				if (!document.exists) {
					throw "Document does not exist!";
				}
				var newPriority = value;
				transaction.update(docToUpdate, { priority: newPriority });
			});
		})
		.then(() => {
			docToUpdate.get().then((result) => {
				let taskToEdit = document.getElementById(`task${id}`);
				setPriorityColor(taskToEdit, result.data().priority);
			});
		})
		.catch((error) => {
			console.error("Transaction failed: ", error);
		});
}
export { pushTasks, renderMain, loadTasks };
