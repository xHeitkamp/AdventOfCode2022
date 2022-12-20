// Modules
const fs = require('fs');

//Read file
const lines = fs.readFileSync('Day8/Map.txt', 'utf8').split('\n');
const map = lines.map((line) => line.split('').map((char) => parseInt(char)));

const rows = map.length;
const columns = map[0].length;

//Part1 - visible Trees
let part1 = rows * 2 + (columns - 2) * 2;
let part2 = 0;
for (let i = 1; i < rows - 1; i++) {
	for (let j = 1; j < columns - 1; j++) {
		const element = map[i][j];

		const top = [];
		const bottom = [];
		const right = [];
		const left = [];

		//Get horizontal and vertical trees
		for (let x = 1; x < i + 1; x++) {
			top.push(map[i - x][j]);
		}
		for (let x = 1; x < rows - i; x++) {
			bottom.push(map[i + x][j]);
		}
		for (let x = 1; x < columns - j; x++) {
			right.push(map[i][j + x]);
		}
		for (let x = 1; x < j + 1; x++) {
			left.push(map[i][j - x]);
		}

		//If somethings blocks, add visible
		if (
			Math.max(...top) < element ||
			Math.max(...bottom) < element ||
			Math.max(...right) < element ||
			Math.max(...left) < element
		)
			part1++;

        //Part2
		const trees = [top, bottom, right, left];
		let scenic = 1;
		for (let i = 0; i < trees.length; i++) {
			const coord = trees[i];
			let score = 0;
			for (let j = 0; j < coord.length; j++) {
				const check = coord[j];
				if (check < element) {
					score++;
				} else {
					score++;
					break;
				}
			}
            scenic = scenic * score;
		}
        if (scenic > part2) part2 = scenic;
	}
}

console.log(`Part 1) ${part1} trees are visible from the outside of the grid`);
console.log(`Part 2) The highest scenic score possible is ${part2}`);