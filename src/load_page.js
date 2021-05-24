import {sideBarContent} from './sidebar_content'
import {mainContent} from './main_content'

const sideBarButton = function(){
    const sideBarButton = document.createElement('i');
    sideBarButton.classList.add('fi-rr-menu-burger');
    sideBarButton.classList.add('sideBarButton');
    sideBarButton.addEventListener('click',showHideSBare);
    return sideBarButton;
}
const showHideSBare = function(){
    let sideBar=document.getElementById('sideBar');
    if(sideBar.classList.value === 'sideBar'){
        sideBar.classList.add('off')
    }else{
        sideBar.classList.remove('off')
    }
}
const loadHeader = function(){
    const header = document.createElement('header');
    header.setAttribute('id','header');
    header.innerHTML='<h3>Todo List</h3>';
    header.appendChild(sideBarButton());
    return header;
}

const loadSideBar= function(){
    const sideBar = document.createElement('div');
    sideBar.setAttribute('id','sideBar');
    sideBar.classList.add('sideBar')
    sideBar.appendChild(sideBarContent());
    return sideBar;
}

const loadMain= function(){
    const main = document.createElement('main');
    main.setAttribute('id','main');
    main.appendChild(mainContent())
    return main;

}
const loadFooter= function(){
    const footer = document.createElement('footer');
    footer.setAttribute('id','footer');
    footer.innerHTML='<h4>Created By <a href=https://github.com/krimoelbahri> Elbahri </a></h4>'
    return footer;
}
const loadWebsite= function(){
    const content = document.getElementById('content');
    content.appendChild(loadHeader());
    content.appendChild(loadSideBar());
    content.appendChild(loadMain());
    content.appendChild(loadFooter());   
}

export {loadWebsite};

