import {pushProject} from "./projects_content";
import{renderMain} from './tasks_content'
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
	const inbox=htmlCreate("li","inbox","Inbox");
	inbox.addEventListener("click",renderMain);
	return inbox;
};
const today=function(){
	const today= htmlCreate("li","today","Today");
	today.addEventListener("click",renderMain);
	return today;
};
const thisWeek=function(){
	const thisWeek= htmlCreate("li","thisWeek","This Week");
	thisWeek.addEventListener("click",renderMain);
	return thisWeek;
};
const uList= function(){
	const uList= htmlCreate("ul","uList","");
	uList.appendChild(inbox());
	uList.appendChild(today());
	uList.appendChild(thisWeek());
	return uList;
}
const projects=function(){
	const projects=htmlCreate("div","projects","projects")
	return projects;
};
const projectsContent=function(){
	const projectsContent=htmlCreate("div","projectsContent","")
	return projectsContent;
};
const sideBarContent=function(){
	const sideBarContent=htmlCreate("div","sideBarContent","");
	sideBarContent.appendChild(addProject());
	sideBarContent.appendChild(addProjectForm());
	sideBarContent.appendChild(uList);
	sideBarContent.appendChild(projects());
	sideBarContent.appendChild(projectsContent());

	return sideBarContent;
};
export {sideBarContent};
