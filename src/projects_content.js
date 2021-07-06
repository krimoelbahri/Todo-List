import {showHideElement} from './domManipulation';
import {htmlCreate} from './domManipulation';
import{renderMain} from './tasks_content'
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
const addProjectSelect= function(){
	let projectSelect= document.getElementById("projectSelect")
	projectSelect.innerHTML ="" ;
	projectSelect.innerHTML =`
	<option value="">--Please choose an option--</option>
	<option value="inbox">Default project</option>` ;	
	for(let i=0; i<projects.length; i++){
	projectSelect.innerHTML +=`<option value="${projects[i].name}">${projects[i].name}</option>` ;	
	}
}

const projectsContent= function(){
	let projectsContent =document.querySelector("#projectsContent");
	projectsContent.textContent="";
	let i=0;
	projects.forEach((prj)=>{
		let projectContainer = htmlCreate("div",`project${i}`,"","projectContainer")
		projectContainer.innerHTML=`
        <h6>${prj.name}</h6>
        `;
		projectsContent.appendChild(projectContainer);
		projectContainer.addEventListener("click",renderMain)
		i++;
	});
}
const renderProjects=function(){
	projectsContent();
	addProjectSelect();
};
export{pushProject};