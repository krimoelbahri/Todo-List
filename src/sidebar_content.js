import {pushProject} from "./projects_content";
import { htmlCreate } from "./domManipulation";
import { showHideElement } from "./domManipulation";
import addsign from './images/addsign.svg'

const addProject=function(){
	const addProject=htmlCreate("div","addProject")
	addProject.addEventListener("click", showHideAddProjectForm);
	addProject.innerHTML=`<img id =\"addsign\" src=${addsign} alt=\"Chef\"> Add Project`;
	return addProject;
};
const addProjectForm = function() {
	const addProjectForm = htmlCreate("div","addProjectForm","","projectForm");
	addProjectForm.innerHTML="<input type=\"text\" name=\"project-name\" id=\"projectName\" placeholder=\"Project Name\"><button class=\"add\" id=\"add\">add</button> ";
	addProjectForm.querySelector("#add").addEventListener("click",pushProject);
	return addProjectForm;
};
const showHideAddProjectForm=function(){
	showHideElement("addProjectForm","on");
};
const inbox=function(){
	const inbox=htmlCreate("ol","inbox","- Inbox");
	return inbox;
};
const today=function(){
	const today= htmlCreate("ol","today","- Today");
	return today;
};
const thisWeek=function(){
	const thisWeek= htmlCreate("ol","thisWeek","- This Week");
	return thisWeek;
};
const projects=function(){
	const projects=htmlCreate("div","projects","projects")
	return projects;
};
const projectsContent=function(){
	const projectsContent=htmlCreate("div","projectsContent")
	return projectsContent;
};
const sideBarContent=function(){
	const sideBarContent=htmlCreate("div","sideBarContent","");
	sideBarContent.appendChild(addProject());
	sideBarContent.appendChild(addProjectForm());
	sideBarContent.appendChild(inbox());
	sideBarContent.appendChild(today());
	sideBarContent.appendChild(thisWeek());
	sideBarContent.appendChild(projects());
	sideBarContent.appendChild(projectsContent());

	return sideBarContent;
};
export {sideBarContent};

/*document.addEventListener('click',function(){
    let addProjectForm=document.getElementById('addProjectForm');
    if(addProjectForm.classList.value === 'projectForm'){
        return;
    }else{
        addProjectForm.classList.remove('on')
    }
})*/