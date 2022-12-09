// Modules
const fs = require('fs');

//Read file
const data = fs.readFileSync('Day1/Foods.txt', 'utf8');
const foods = data.split('\n');

// Get sum calories per elf
const elves = [];
let calories = 0;
for (let i = 0; i < foods.length; i++) {
	const food = parseInt(foods[i]);
	if (food) {
        calories += food;
    } else {
        elves.push(calories);
        calories = 0;
    }
}
const sortCalories = elves.sort((a, b) => b - a);

const sumCalories = (arr, times) => {
    let calories = 0;
    for (let i = 0; i < times; i++) {
        calories += arr[i];
    }
    return calories;
}

const part1 = sumCalories(sortCalories, 1);
const part2 = sumCalories(sortCalories, 3);
console.log(`Part 1) The elf with the highest calories has: ${part1} calories`);
console.log(`Part 2) The 3 elves with their highest calories have together: ${part2} calories`);