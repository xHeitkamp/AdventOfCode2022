//For this day I need to give credits to Iván R. Artiles (https://ivanr3d.com/)
//I could not think of a good solution. Maybe because it was late or I had a brain fart. Only god knows.
//His solutions: https://codepen.io/ivanr3d/pen/ExRrXzG

// Modules
const fs = require('fs');

//Read file
const output = fs.readFileSync('Day7/TerminalOutput.txt', 'utf8');

containsNumbers = (input) => {
	return /\d/.test(input);
};

//Get data from input
let counter = 0;
let data = new Array();
let value = '';
for (let i = 0; i < output.length; i++) {
	if (output[i] == '\n') {
		data.push(value);
		value = '';
		counter++;
	} else {
		value += output[i];
	}
}

//Create file tree
let dir = '';
let lastDir = '';
let dirs = {};
let dirCounter = 0;
let dirNames = new Array();
value = '';
for (let i = 0; i < data.length; i++) {
	if (data[i].includes('$ cd') && data[i].includes('$ cd ..') == false) {
		if (Object.keys(dirs).length >= 1) {
			lastDir = dir;
		}
		dir += data[i].slice(data[i].indexOf('d') + 2);

		if (dir[0] != '/') {
			dir = '/' + dir;
		}
		if (Object.keys(dirs).includes(dir)) {
		} else {
			dirs[dir] = 0;
			dirNames.push(data[i].slice(data[i].indexOf('d') + 2));
		}
		dirCounter++;
	} else if (data[i].includes('$ cd ..')) {
		dirCounter--;
		dir = dir.slice(0, dir.length - dirNames[dirNames.length - 1].length);
		lastDir = Object.keys(dirs)[dirCounter - 1];
	} else if (containsNumbers(data[i])) {
		for (let j = 0; j < data[i].length; j++) {
			if (containsNumbers(data[i][j])) {
				value += data[i][j];
			} else {
				break;
			}
		}
		dirs[dir] += Number(value);
		value = '';
	}
}

counter = 0;
for (let e = 0; e < Object.keys(dirs).length; e++) {
	for (let i = 0; i < Object.keys(dirs).length; i++) {
		if (Object.keys(dirs)[counter] != Object.keys(dirs)[i]) {
			if (Object.keys(dirs)[i].includes(Object.keys(dirs)[counter])) {
				dirs[Object.keys(dirs)[counter]] += dirs[Object.keys(dirs)[i]];
			}
		}
	}
	counter++;
}

//Part1
let part1 = 0;
for (let i = 0; i < Object.keys(dirs).length; i++) {
	dirs[Object.keys(dirs)[i]] <= 100000
		? (part1 += dirs[Object.keys(dirs)[i]])
		: null;
}

//Part2
let totalSpace = 70000000;
let neededSpace = 30000000;
let usedSpace = dirs['/'];
let freeSpace = totalSpace - usedSpace;
let dirsToDelete = new Array();

Array.prototype.min = function () {
    return Math.min.apply(null, this);
};

for (let i = 0; i < Object.keys(dirs).length; i++) {
	freeSpace + dirs[Object.keys(dirs)[i]] >= neededSpace
		? dirsToDelete.push(dirs[Object.keys(dirs)[i]])
		: null;
}
const part2 = dirsToDelete.min();

//Answers
console.log(
	`Part 1) Total size of directories with at least the size of 100.000. Count: ${part1}`
);
console.log(`Part 2) Total size of the directory, which you should delete is: ${part2}`);
