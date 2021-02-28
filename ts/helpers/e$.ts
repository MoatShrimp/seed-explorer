//helper function to ease selecton HTML elements
function e$(name: string, parent = document): any {
	
	switch (name.charAt(0)) {
		case '#':
			return parent.getElementById(name.slice(1));
		case '.':
			return parent.getElementsByClassName(name.slice(1));
		default:
			return parent.getElementsByTagName(name);
	}
}
