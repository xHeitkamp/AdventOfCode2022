// Modules
const fs = require('fs');

//Read file
const data = fs.readFileSync('Day2/Fightplan.txt', 'utf8');
const lines = data.split('\n');
const games = lines.map((game) => {
	const choices = game.split(' ');
	let oppChoice, meChoice;
	switch (choices[0]) {
		case 'A': //Rock
			oppChoice = 1;
			break;
		case 'B': //Paper
			oppChoice = 2;
			break;
		case 'C': //Scissors
			oppChoice = 3;
			break;
	}
	switch (choices[1]) {
		case 'X': //Rock
			meChoice = 1;
			break;
		case 'Y': //Paper
			meChoice = 2;
			break;
		case 'Z': //Scissors
			meChoice = 3;
			break;
	}
	return { opponent: oppChoice, me: meChoice };
});

const calcScore = (opponent, me) => {
    let score = me;
    if ((opponent == 1)) { //Rock
        if ((me == 1)) { //Rock
            score += 3;
        } else if ((me == 2)) {
            score += 6;
        } else if ((me == 3)) { //Scissor
            score += 0;
        }
    } else if ((opponent == 2)) { //Paper
        if ((me == 1)) { //Rock
            score += 0;
        } else if ((me == 2)) { //Paper
            score += 3;
        } else if ((me == 3)) { //Scissor
            score += 6;
        }
    } else if ((opponent == 3)) { //Scissor
        if ((me == 1)) { //Rock
            score += 6;
        } else if ((me == 2)) { //Paper
            score += 0;
        } else if ((me == 3)) { //Scissor
            score += 3;
        }
    }
    return score;
}
// Check each game
let part1Score = 0;
let part2Score = 0;
for (let i = 0; i < games.length; i++) {
	const game = games[i];

    //Part1
    const score1 = calcScore(game.opponent, game.me);
	part1Score += score1;

    //Part2: 1->Lose, 2->Draw, 3->Win
    if(game.me == 1) {
        if ((game.opponent == 1)) { //Rock
            game.me = 3;
        } else if ((game.opponent == 2)) { //Paper
            game.me = 1;
        } else if ((game.opponent == 3)) { //Scissor
            game.me = 2;
        }       
    } else if(game.me == 2) {
        if ((game.opponent == 1)) { //Rock
            game.me = 1;
        } else if ((game.opponent == 2)) { //Paper
            game.me = 2;
        } else if ((game.opponent == 3)) { //Scissor
            game.me = 3;
        }       
    } else if(game.me == 3) {
        if ((game.opponent == 1)) { //Rock
            game.me = 2;
        } else if ((game.opponent == 2)) { //Paper
            game.me = 3;
        } else if ((game.opponent == 3)) { //Scissor
            game.me = 1;
        }       
    }
    const score2 = calcScore(game.opponent, game.me);
	part2Score += score2;
}

console.log(`Part 1) The total score after all games is: ${part1Score}`);
console.log(`Part 2) The total score after all games is: ${part2Score}`);