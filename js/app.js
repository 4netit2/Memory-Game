
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*
 * Create a list that holds all of your cards
 */

let card = document.getElementsByClassName('card');
let cardsArray = [...card];  //create an array with all cards

const deck = document.querySelector('.deck'); 
let timer = document.querySelector('.timer');
let modTime = document.querySelector('.Modtime');
let counter;
let timeStart = false;
let starsModal = document.querySelector('.starsnumber');
const restart = document.querySelector(".restart");
const stars = document.querySelector(".stars");
const movesCount = document.querySelector(".moves");
let openedCards = []; //create an empty array for opened cards
let matchedCards = [];
const button = document.querySelector('.newgamebtn');
let moves = 0;



//deck.innerHTML = ''; //empty deck   //.innerHtml represent the icons



/*
 *  function to start the game 
 */


function startGame() {
    cardsArray = shuffle(cardsArray); //shuffle the cards
    //loops over each card creates it's HTML and add it to the deck
    for (let card of cardsArray){ //loop over cards array
        card.classList.remove('show', 'open', 'match', 'disabled'); 
        click(card); // add click event to each card
  }

}
  
/*
  *  Shuffle function
  */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


  /*
  * Function Click - add event for each card
  */    
function click(card){

       card.addEventListener("click", function() { //Add Event Listener for clicking the card
      
       const firstCard = openedCards[0]; //refers to first element
       const secondCard = this;  //refers to second element

        if(openedCards.length === 1) {  //check if exists any element in openedCares
           
            card.classList.add("show","open","disabled"); //add from css open and show property to show images
            openedCards.push(this); //we will push our cliked card into openCards(this refers to "card")
            matched(secondCard, firstCard);   //call matched function
     
        } else {    

            card.classList.add("show","open","disabled"); //if we don't have opened cards add some classes
            openedCards.push(this);
 }

    });
}

/*
 * Compare the 2 opened cards 
 *   
 */
function matched(secondCard, firstCard){

     
   if (secondCard.innerHTML === firstCard.innerHTML) { // compare the 2 opened cards

        secondCard.classList.add("match"); //add class for matched card to each card compared
        firstCard.classList.add("match");

        matchedCards.push(secondCard,firstCard); //store  matched cards to an array

        openedCards = []; //reset the opened cards - to have 2 open cards only

        stopGame(); // call function stopGame to check if the game is over
   
    } else {

    setTimeout(function(){ //delay action to see the cards - wait 500 ms then do the action

       secondCard.classList.remove("open", "show","disabled"); //if doesn't match remove showing classes 
       firstCard.classList.remove("open", "show","disabled");
       
    }, 500); // slow to see animation
    
        openedCards = []; //reset the opened cards
}
        countMoves(); //call function to add moves - no mather if the cards matched or not
}

/*
 * Function -Count the moves. When the moves increase remove stars
 */


function countMoves(){
    
    moves++; //increment moves
    movesCount.innerHTML = moves; //add moves to counter 
    if (!timeStart) {
        startTimer();
        timeStart= true;
      };
      rating(); //call the rating to update de stars after each move
    }

/*
 *Function startTimer 
 */

function startTimer() {
    let second = 0;
    let minute = 0;
	interval = setInterval(function() { 
		modTime.innerHTML = timer.innerHTML
		second++;
		if (second == 60) {     //define a minute
			minute++;
			second = 0;
		}
		timer.innerHTML = minute +' minute '+ second + ' seconds'; //set the new value on the HTML counter with innerHtml
    
    }, 800); 
    
}

/*
 *Function stopTimer 
 */

function stopTimer(){
    clearInterval(interval);
    second = 0;
    minute = 0;
  }


/*
 * Function for setting the rating 
 */

function rating() {
    let count =0; //counter for modal
    if( moves < 9) {
        stars.innerHTML = `<li><i class="fa fa-star"></i></li>` + `<li><i class="fa fa-star"></i></li>` + `<li><i class="fa fa-star"></i></li>`;
        count =3;
        
    } else if( moves < 15) {
        stars.innerHTML = `<li><i class="fa fa-star"></i></li>` + `<li><i class="fa fa-star"></i></li>`;
        count =2;
        
    } else {
        stars.innerHTML = `<li><i class="fa fa-star"></i></li>`;
        count =1;
        
    }
    starsModal.innerText=count;
}

/*
 *  Function to reload the page and restart game
 * https://www.w3schools.com/jsref/met_loc_reload.asp
 */
function gameRestart(){
    location.reload();   //reload the page
}

/*
 *Restart button - add event listener
 */

restart.addEventListener("click", function() {
    location.reload();  //reload the page
})
/*
 *  Modal
 * https://www.w3schools.com/howto/howto_css_modals.asp
 */

function modal() {
    const modal = document.querySelector('.modal');
    modal.style.display = "block"; 
    button.onclick = function() {
        modal.style.display = "none"; //close modal in restart game
        gameRestart();
    }
}


/*
 *  Check if the game is over
 */

 function stopGame() {
    if(matchedCards.length === cardsArray.length) { //check if open cards are equals with out total cards
        stopTimer(); 
        modal();
    }
}

 
 startGame(); //Start the game



 




