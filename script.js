const gameContainer = document.getElementById("game");
const startButton = document.querySelector('#start');
const numberSets = document.querySelector('input[name="numbersets"');
const form = document.querySelector('#selectNumSets');
const scoreDiv = document.querySelector('#score-div');
const guessCount = document.querySelector('#guess-count');
const bestScore = document.querySelector('#best-score');
bestScore.innerText = `your best score is ${localStorage.getItem('score')}`;

let gameCounter = 0;
let gameScore = 0;

let COLORS = []; 

form.addEventListener('submit', function (e) {
  e.preventDefault();
  COLORS = fillArrayColors(numberSets.value);
});

function randomColor(){
  let color = Math.floor(Math.random()*256);
  return color;
}

function fillArrayColors(numSets){
  const tempArray = [];
  for(let i = 0; i < numSets; i++){
    tempArray[i] = `rgb(${randomColor()},${randomColor()},${randomColor()})`;
  }

  const newArray = [...tempArray];
  const returnArray = tempArray.concat(newArray);
  // return COLORS
  return returnArray;
}
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}




// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.style.backgroundColor = color;
    newDiv.classList.add('show-color');
    newDiv.classList.add('cards');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

//counts the amount of clicks
let clickCount = 0;
let clickOne;
let clickTwo;
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (!event.target.classList.value.includes('unclickable')) {
    clickCount++;
    if (clickCount <= 2) {
      if (clickCount === 1) {
        clickOne = event;
        showCard(event);
        clickOne.target.classList.toggle('unclickable');
        
      } else if (clickCount === 2) {
        clickTwo = event;
        showCard(event);
        clickTwo.target.classList.toggle('unclickable');
        //keeps count nubmer of guesses
        gameScore++;
        guessCount.innerText = `your current gusss count is ${gameScore}`;

        if (clickOne.target.style.backgroundColor === clickTwo.target.style.backgroundColor) {
          console.log('True')
          //keeps count number of correct guesses
          gameCounter++;

          clickCount = 0;
        } else {
          setTimeout(function () {
            showCard(clickOne);
            showCard(clickTwo);
            clickOne.target.classList.toggle('unclickable');
            clickTwo.target.classList.toggle('unclickable');
            clickCount = 0;
          }, 1000);
        }
      }
    }
    if (gameCounter >= Number(numberSets.value)) {
      let temp = localStorage.getItem('score');
      if (Number(temp) > gameScore) {
        localStorage.setItem('score', gameScore);
      }
      
      const restartButton = document.createElement('button');
      restartButton.classList.add('button');
      restartButton.type = 'submit';
      restartButton.innerText = "Restart";
      scoreDiv.prepend(restartButton);
      restartButton.addEventListener('click', function (e) {
        window.location.reload();
      });

    }
  }
}

function showCard(e) {
  e.target.classList.toggle("show-color");
  console.log(e.target.style.backgroundColor);
  console.log("you just clicked", e.target.classList.value);
}

// when the DOM loads

//createDivsForColors(shuffledColors);

startButton.addEventListener('click', function () {
  //time out gives time for the form to be submited
  setTimeout(function () {
    let shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
    startButton.remove();
    form.remove();
  }, 300);
 

});

// gameContainer.remove();
// document.body.appendChild(gameContainer);



 
