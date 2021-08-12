import { showHideElement } from "./domManipulation";
import { htmlCreate } from "./domManipulation";
import { renderMain } from "./tasks_content";
import { saveProject } from "./fireStore";
const pushProject = function () {
	showHideElement("addProjectForm", "on");
	if (document.getElementById("projectName").value === "") {
		return;
	} else {
		let projectName = document.getElementById("projectName").value;
		saveProject(projectName);
		document.getElementById("projectName").value = "";
	}
};

const displayProjectSelect = function (id, data) {
	let projectSelect = document.getElementById("projectSelect");
	if (document.getElementById(id)) {
		return;
	}
	let projectOption = htmlCreate(
		"option",
		`${id}`,
		`${data.name}`,
		"projectOption"
	);
	projectSelect.appendChild(projectOption);
};
const displayProjects = function (id, data) {
	let projectsContent = document.querySelector("#projectsContent");
	if (document.getElementById(id)) {
		return;
	}
	let projectContainer = htmlCreate(
		"div",
		`${id}`,
		"",
		"projectContainer"
	);
	projectContainer.innerHTML = `
				<h6>${data.name}</h6>
				`;
	projectsContent.appendChild(projectContainer);
	projectContainer.addEventListener("click", renderMain);
};
function loadProjects() {
	// Create the query to load projects and listen for new ones.
	var query = firebase
		.firestore()
		.collection("Projects")
		.orderBy("timestamp", "asc");

	// Start listening to the query.
	query.onSnapshot(function (snapshot) {
		snapshot.docChanges().forEach(function (change) {
			if (change.type === "removed") {
				console.log(change.doc.id);
			} else {
				var project = change.doc.data();
				let id = change.doc.id;
				displayProjects(id, project);
				displayProjectSelect(`option${id}`, project);
			}
		});
	});
}
export { pushProject, loadProjects };
