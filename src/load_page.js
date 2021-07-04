import {sideBarContent} from "./sidebar_content";
import {mainContent} from "./main_content";
import { htmlCreate } from "./domManipulation";
import { showHideElement } from "./domManipulation";
const sideBarButton = function(){
	const sideBarButton = htmlCreate("i","","","fi-rr-menu-burger");
	sideBarButton.classList.add("sideBarButton");
	sideBarButton.addEventListener("click",showHideSBare);
	return sideBarButton;
};
const showHideSBare = function(){
	showHideElement("sideBar","off");
	showHideElement("main","off")
};
const loadHeader = function(){
	const header = htmlCreate("header","header","<h3>Todo List</h3>")
	header.appendChild(sideBarButton());
	return header;
};
const loadSideBar= function(){
	const sideBar = htmlCreate("div","sideBar","")
	sideBar.appendChild(sideBarContent());
	return sideBar;
};
const loadMain= function(){
	const main = htmlCreate("main","main","")
	main.appendChild(loadSideBar());
	main.appendChild(mainContent());
	return main;

};
const loadFooter= function(){
	const footer = htmlCreate("footer","footer","")
	footer.innerHTML="<h4>Created By <a href=https://github.com/krimoelbahri> Elbahri </a></h4>";
	return footer;
};
const loadWebsite= function(){
	const content = document.getElementById("content");
	content.appendChild(loadHeader());
	content.appendChild(loadMain());
	content.appendChild(loadFooter());   
};

export {loadWebsite};

