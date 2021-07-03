import {pushProject} from "./projects_content";
import addsign from './images/addsign.svg'

const addProject=function(){
	const addProject=document.createElement("div");
	addProject.setAttribute("id","addProject");
	addProject.addEventListener("click", showHideAddProjectForm);
	addProject.innerHTML=`<img id =\"addsign\" src=${addsign} alt=\"Chef\"> Add Project`;
	return addProject;
};
const addProjectForm = function() {
	const addProjectForm = document.createElement("div");
	addProjectForm.setAttribute("id","addProjectForm");
	addProjectForm.classList.add("projectForm");
	addProjectForm.innerHTML="<input type=\"text\" name=\"project-name\" id=\"projectName\" placeholder=\"Project Name\"><button class=\"add\" id=\"add\">add</button> ";
	addProjectForm.querySelector("#add").addEventListener("click",pushProject);
	return addProjectForm;
};
const showHideAddProjectForm=function(e){
	let addProjectForm=document.getElementById("addProjectForm");
	if(addProjectForm.classList.value === "projectForm"){
		addProjectForm.classList.add("on");
	}else{
		addProjectForm.classList.remove("on");
	}
};
const inbox=function(){
	const inbox=document.createElement("ol");
	inbox.setAttribute("id","inbox");
	inbox.innerHTML="- inbox";
	return inbox;
};
const today=function(){
	const today=document.createElement("ol");
	today.setAttribute("id","today");
	today.innerHTML="- today";
	return today;
};
const thisWeek=function(){
	const thisWeek=document.createElement("ol");
	thisWeek.setAttribute("id","thisWeek");
	thisWeek.innerHTML="- thisWeek";
	return thisWeek;
};
const projects=function(){
	const projects=document.createElement("div");
	projects.setAttribute("id","projects");
	projects.innerHTML="Projects";
	return projects;
};
const projectsContent=function(){
	const projectsContent=document.createElement("div");
	projectsContent.setAttribute("id","projectsContent");
	return projectsContent;
};
const sideBarContent=function(){
	const sideBarContent=document.createElement("div");
	sideBarContent.setAttribute("id","sideBarContent");
	sideBarContent.appendChild(addProject());
	sideBarContent.appendChild(addProjectForm());
	sideBarContent.appendChild(inbox());
	sideBarContent.appendChild(today());
	sideBarContent.appendChild(thisWeek());
	sideBarContent.appendChild(projects());
	sideBarContent.appendChild(projectsContent());

	return sideBarContent;
};
export{showHideAddProjectForm};
export {sideBarContent};

/*document.addEventListener('click',function(){
    let addProjectForm=document.getElementById('addProjectForm');
    if(addProjectForm.classList.value === 'projectForm'){
        return;
    }else{
        addProjectForm.classList.remove('on')
    }
})*/