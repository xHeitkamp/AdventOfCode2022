// Modules
const fs = require('fs');

//Read file
const data = fs.readFileSync('Day3/Rucksacks.txt', 'utf8');
const rucksacks = data.split('\n');
const compartments = rucksacks.map((rucksack) => {
	const splitted = rucksack.split('');
	const half = rucksack.length / 2;
	const first = splitted.splice(0, half);
	const second = splitted.splice(-half);
	return { first: first, second: second };
});

const char2Number = (char) => {
    let number = 0;
    if (char == char.toUpperCase()) {
		number = char.charCodeAt(0) - 38;
	}
	if (char == char.toLowerCase()) {
		number = char.charCodeAt(0) - 96;
	}
    return number;
};

//Part1
let sumPriorities = 0;
for (let i = 0; i < compartments.length; i++) {
	const comp = compartments[i];
	const letters = comp.first.filter((element) =>
		comp.second.includes(element)
	);
	const same = [...new Set(letters)].join('').toString();
	sumPriorities += char2Number(same);
}

//Part2
let badgePriorities = 0;
for (let i = 0; i < rucksacks.length; i = i + 3) {
    const bag1 = [...new Set(rucksacks[i].split(''))];
    const bag2 = [...new Set(rucksacks[i+1].split(''))];
    const bag3 = [...new Set(rucksacks[i+2].split(''))];
    bag1.forEach(char => {
        if(bag2.includes(char) && bag3.includes(char)){
            badgePriorities += char2Number(char);
            return;
        }
    });
}

console.log(`Part 1) The sum of the priorities is: ${sumPriorities}`);
console.log(`Part 2) ${badgePriorities}`);