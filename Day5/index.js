// Modules
const fs = require('fs');

//Read file
const data = fs.readFileSync('Day5/Movements.txt', 'utf8');
const lines = data.split('\n');
const procedures = lines.map((ele) => {
	const parts = ele
		.replace('move ', '')
		.replace(' from ', ',')
		.replace(' to ', ',')
        .split(',');
	return {
		move: parseInt(parts[0]),
		from: parseInt(parts[1]),
		to: parseInt(parts[2]),
	};
});
const stacks= [
    '',
    'TPZCSLQN',
    'LPTVHCG',
    'DCZF',
    'GWTDLMVC',
    'PWC',
    'PFJDCTSZ',
    'VWGBD',
    'NJSQHW',
    'RCQFSLV',
].map(line => line.split(''));
const stacks1 = JSON.parse(JSON.stringify(stacks));
const stacks2 = JSON.parse(JSON.stringify(stacks));

//Part1
for (let i = 0; i < procedures.length; i++) {
    const procedure = procedures[i];
    for (let j = 0; j < procedure.move; j++) {
        const element = stacks1[procedure.from][stacks1[procedure.from].length - 1];
        stacks1[procedure.from].pop();
        stacks1[procedure.to].push(element);
    }
}
let answer1 = '';
for (let i = 1; i < stacks1.length; i++) {
    const stack = stacks1[i];
    answer1 += stack[stack.length - 1];
}

//Part2
for (let i = 0; i < procedures.length; i++) {
    const procedure = procedures[i];
    const elements = stacks2[procedure.from].slice(procedure.move * (-1));
    stacks2[procedure.from].splice(stacks2[procedure.from].length - procedure.move, procedure.move);
    stacks2[procedure.to] = [...stacks2[procedure.to], ...elements];
}
let answer2 = '';
for (let i = 1; i < stacks2.length; i++) {
    const stack = stacks2[i];
    answer2 += stack[stack.length - 1];
}

console.log(`Part 1) The CrateMover 9000 creates the word: ${answer1}`);
console.log(`Part 2) The CrateMover 9001 creates the word: ${answer2}`);
