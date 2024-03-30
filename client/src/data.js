// const matches = ["MI vs CSK", "RCB vs KKR", "SRH vs DC", "CSK vs RCB"];
const zones = Array.from({length: 14}, (_, i) => (i + 1).toString());
const predictions = ["4", "6", "W"];
const correctOptions = Array.from({length: 43}, (_, i) => i);

let betId = 0;
let over = 1;
let ball = 1;
let score = 0;
let wickets = 0;
let genResponse = [];

function generateData() {
  const match = "MI vs CSK";
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
    commentary: "esuesiufriudfsiu"
  };

  genResponse.push(data);
}
generateData();
setInterval(() => {
  generateData();
  console.log(genResponse);
}, 30000); // 30 seconds milliseconds

export const response = genResponse;