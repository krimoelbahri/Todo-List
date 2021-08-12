import { formatISO } from "date-fns";
import { add } from "date-fns";

const htmlCreate = function (htmlElement, id, _innerHtml, _class) {
	let element = document.createElement(htmlElement);
	if (!id) {
	} else {
		element.setAttribute("id", id);
	}
	element.innerHTML = _innerHtml;
	if (!_class) {
	} else {
		element.classList.add(_class);
	}
	return element;
};
const showHideElement = function (id, _class) {
	let element = document.getElementById(id);
	element.classList.toggle(_class);
};
const filterArray = function (arr, str) {
	if (str !== "today" && str !== "this week") {
		let filtered = arr.filter(
			(obj) => obj.project.toLowerCase() === str
		);
		return filtered;
	}
	if (str === "today") {
		let filtered = arr.filter(
			(obj) =>
				obj.date === formatISO(new Date(), { representation: "date" })
		);
		return filtered;
	}
	if (str === "this week") {
		let filtered = arr.filter(
			(obj) =>
				obj.date >= formatISO(new Date(), { representation: "date" }) &&
				obj.date <
					formatISO(add(new Date(), { days: 7 }), {
						representation: "date",
					})
		);
		return filtered;
	}
};
export { htmlCreate };
export { showHideElement };
export { filterArray };
