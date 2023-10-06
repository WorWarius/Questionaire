const questionData = require('./questions.json')
const grabAnswerData = require('./storedAnswers.json')
const fs = require('fs');
const prompt = require('prompt-sync')({ sigint: true })

let theStoredData = []
theStoredData[0] = grabAnswerData;

let cat = 0;
let dog = 0;
let rabbit = 0;
let fish = 0;
let allAnimals = 0;

console.log(`Hello and welcome to this quiz about which animalsScores would suit you the best
Tell me. What is your name?`)
const playerName = prompt();
console.log(`${playerName}? Very well. I hope you enjoy`)

for (let i = 0; i < questionData.length; i++) {
  console.log(questionData[i].theQuestion)
  console.log(`Alternative:
    1. Yes
    2. No`)
  const answer = parseInt(prompt())
  if (answer == 1) {

    dog = dog + questionData[i].alternativeOne.hund
    cat = cat + questionData[i].alternativeOne.katt
    rabbit = rabbit + questionData[i].alternativeOne.kanin
    fish = fish + questionData[i].alternativeOne.fisk

  } else if (answer == 2) {

    dog = dog + questionData[i].alternativeTwo.hundAlt
    cat = cat + questionData[i].alternativeTwo.kattAlt
    rabbit = rabbit + questionData[i].alternativeTwo.kaninAlt
    fish = fish + questionData[i].alternativeTwo.fiskAlt

  } else {
    console.log("You did not put in a valid number. Answer the question again with a valid answer")
    i--;
  }
}

allAnimals = dog + cat + rabbit + fish;
let animalsScores = [{ name: "Dog", "score": dog }, { name: "Cat", "score": cat }, { name: "Rabbit", "score": rabbit }, { name: "Fish", "score": fish }]
animalsScores.sort((a, b) => b.score - a.score);

let today = new Date();
const dateOfQuiz = today.toLocaleString()

console.log(animalsScores)
console.log("The animal for you is:", animalsScores[0].name, "With a score of", animalsScores[0].score / allAnimals * 100, "%");
console.log("Thanks for doing the quiz!");

let playerData = {
  'name': playerName,
  'animalsScores': animalsScores,
  'quizTime': dateOfQuiz
}

theStoredData.push(playerData);

fs.writeFile('./storedAnswers.json', JSON.stringify(theStoredData, null, 2), (err) => {
  if (err) throw err;
  console.log('Data written to file');
});
