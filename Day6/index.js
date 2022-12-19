// Modules
const fs = require('fs');

//Read file
const data = fs.readFileSync('Day6/Datastream.txt', 'utf8');
const stream = data.split('');

//Functions
const containDuplicates = (arr) => {
    return (arr.length !== new Set(arr).size);
}

const getMarker = (arr, length) => {
    let answer = {};
    for (let i = 0; i < arr.length; i++) {
        const sliced = arr.slice(i, length+i);
        if (!containDuplicates(sliced)) {
            answer = {marker: i+length, letter: arr[i+length]};
            break;
        }
    }
    return answer;
}

const part1 = getMarker(stream, 4);
const part2 = getMarker(stream, 14);


console.log(`Part 1) ${part1.marker} processed before the first start-of-packet marker ${part1.letter} is detected!`);
console.log(`Part 2) ${part2.marker} processed before the first start-of-message marker ${part2.letter} is detected!`);