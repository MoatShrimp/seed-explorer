//helper function to ease selecton HTML elements
function e$(name: string, parent = document): any {
	
	switch (name.charAt(0)) {
		case '.':
			return parent.getElementsByClassName(name.slice(1));
		default:
			return parent.getElementById(name);
	}
}

function e$c(type:string, options?:{}):any {
	if (options) {
		return Object.assign(document.createElement(type),options);
	}
	else {
		return document.createElement(type);
	}
}