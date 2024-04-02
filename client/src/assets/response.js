const faker = require('faker');

let betId = 0;
let over = 1;
let ball = 1;
let score = 0;
let wickets = 0;

const matches = ["MI vs CSK", "RCB vs KKR", "SRH vs DC"];
const zones = Array.from({length: 14}, (_, i) => (i + 1).toString());
const predictions = ["4", "6", "W"];
const correctOptions = Array.from({length: 43}, (_, i) => i);

let genResponse = [];

function generateCommentary(match, over, ball, score, prediction, zone) {
  const batsman = faker.name.findName();
  const bowler = faker.name.findName();
  const phrases = [
    `${batsman} faces ${bowler} in over ${over}.${ball} of the ${match} match.`,
    `The ball goes to zone ${zone}.`,
    `The score is now ${score}.`,
  ];
  switch (prediction) {
    case '4':
      phrases.push(`${batsman} hits a boundary!`);
      break;
    case '6':
      phrases.push(`What a shot! ${batsman} hits a six!`);
      break;
    case 'W':
      phrases.push(`Oh no! ${batsman} gets out!`);
      break;
  }
  return phrases.join(' ');
}

function generateData() {
  const match = matches[Math.floor(Math.random() * matches.length)];
  const runs = Math.floor(Math.random() * 7);
  score += runs;
  if (runs === 0) wickets++;
  const target = `${Math.floor(Math.random() * 250) + score}/${Math.floor(Math.random() * 10) + wickets}`;
  ball++;
  if (ball > 6) {
    over++;
    ball = 1;
  }
  const correctOptionId = correctOptions[Math.floor(Math.random() * correctOptions.length)];
  const zone = zones[Math.floor(Math.random() * zones.length)];
  const prediction = predictions[Math.floor(Math.random() * predictions.length)];
  const commentary = generateCommentary(match, over, ball, `${score}/${wickets}`, prediction, zone);

  const data = {
    betId: betId++,
    match,
    score: `${score}/${wickets}`,
    target,
    over: `${over}.${ball}`,
    ball,
    correctOptionId,
    zone,
    prediction,
    commentary,
  };

  genResponse.push(data);
}

generateData();

setInterval(() => {
  generateData();
  console.log(genResponse);
}, 30000); // 30 seconds milliseconds

export const response = genResponse;