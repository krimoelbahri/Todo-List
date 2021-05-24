import{showHideAddProjectForm} from './sidebar_content'
let projects= [

]
const pushProject=function(){
    showHideAddProjectForm();
    if(document.getElementById('projectName').value === ''){
        return;
    }else{
    let projectName= {
         name: document.getElementById('projectName').value ,
        }
    projects.push(projectName);
    renderProjects();
    }
}
const renderProjects=function(){
    console.log(document.querySelector('#projectsContent'))
    let projectsContent =document.querySelector('#projectsContent');
    projectsContent.textContent="";

   projects.forEach((prj)=>{
        let projectContainer = document.createElement('div');
        projectContainer.classList.add('projectContainer');
        projectContainer.innerHTML=`
        <h6>${prj.name}</h6>
        `;
        projectsContent.appendChild(projectContainer);
    })
}
export{pushProject}