import {showHideElement} from './domManipulation';
import {htmlCreate} from './domManipulation';
let projects= [

];
const pushProject=function(){
	showHideElement("addProjectForm","on");
	if(document.getElementById("projectName").value === ""){
		return;
	}else{
		let projectName= {
			name: document.getElementById("projectName").value ,
		};
		projects.push(projectName);
		renderProjects();
	}
};
const renderProjects=function(){
	let projectsContent =document.querySelector("#projectsContent");
	projectsContent.textContent="";
	let i=0;
	projects.forEach((prj)=>{
		let projectContainer = htmlCreate("div",`project${i}`,"","projectContainer")
		projectContainer.innerHTML=`
        <h6>${prj.name}</h6>
        `;
		projectsContent.appendChild(projectContainer);
		i++;
	});
};
export{pushProject};