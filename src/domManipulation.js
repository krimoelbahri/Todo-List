const htmlCreate= function(htmlElement,id,_innerHtml,_class){
    let element= document.createElement(htmlElement);
	element.setAttribute("id",id);
	element.innerHTML=_innerHtml;
    if(!_class){
        return element;
    }else{
        element.classList.add(_class);
    }
	return element;
}
const showHideElement= function(id,_class){
    let element=document.getElementById(id);
	element.classList.toggle(_class);
}
export {htmlCreate};
export {showHideElement};