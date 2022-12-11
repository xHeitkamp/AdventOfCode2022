// Modules
const fs = require('fs');

//Read file
const data = fs.readFileSync('Day4/Assignments.txt', 'utf8');
const assignments = data.split('\n');
const pairs = assignments.map((ele) => {
	const parts = ele.split(',');
	const first = parts[0].split('-').map(Number);
	const second = parts[1].split('-').map(Number);
	return { first: first, second: second };
});

//Part1
let fullyContain = 0;
for (let i = 0; i < pairs.length; i++) {
	const pair = pairs[i];
	if (
		(pair.first[0] >= pair.second[0] && pair.first[1] <= pair.second[1]) ||
		(pair.second[0] >= pair.first[0] && pair.second[1] <= pair.first[1])
	) {
		fullyContain++;
	}
}

//Part2
let partlyContain = 0;
for (let i = 0; i < pairs.length; i++) {
	const pair = pairs[i];
	if (
        (pair.first[0] >= pair.second[0] && pair.first[0] <= pair.second[1]) ||
        (pair.first[1] >= pair.second[0] && pair.first[1] <= pair.second[1]) ||
        (pair.second[0] >= pair.first[0] && pair.second[0] <= pair.first[1]) ||
        (pair.second[1] >= pair.first[0] && pair.second[1] <= pair.first[1])
    ) {
		partlyContain++;
	}
}

console.log(
	`Part 1) ${fullyContain} assignments are fully contain in the other`
);
console.log(
	`Part 2) ${partlyContain} assignments are partly contain in the other`
);
