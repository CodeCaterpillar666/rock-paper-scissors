const buttons = document.querySelectorAll('button');

// we use the .forEach method to iterate through each button
buttons.forEach((button) => {

// and for each one we add a 'click' listener
button.addEventListener('click', () => {
    let playerSelection = button.textContent;
    let roundResult = playRound(playerSelection);

    let playerScore = document.querySelector('#player-score').innerHTML;
    let computerScore = document.querySelector('#computer-score').innerHTML;

    if (roundResult == 1) {  // player wins this round
        document.querySelector('#player-score').innerHTML = Number(playerScore) + 1;
    }
    if (roundResult == -1) {
        document.querySelector('#computer-score').innerHTML = Number(computerScore) + 1;
    }

    playerScore = document.querySelector('#player-score').innerHTML;
    computerScore = document.querySelector('#computer-score').innerHTML;

    if (playerScore == 5) {
        document.querySelector('.announcement').innerHTML = "Player wins!"
    }
    if (computerScore == 5) {
        document.querySelector('.announcement').innerHTML = "Computer wins!"
    }
  });
});


function game() {
    let rounds = 5;
    let playerWinRounds = 0;
    let computerWinRounds = 0;
    for (let i = 0; i < rounds; i++) {
        playerSelection = prompt("Make a selection: Rock, Paper or Scissors?")
        
        let currRoundResult = playRound(playerSelection)
        
        if (currRoundResult == 1) {
            playerWinRounds++;
        } else if (currRoundResult == -1) {
            computerWinRounds++;
        }
    }

    let tie = rounds - playerWinRounds - computerWinRounds;

    let winner;
    let winnerRounds;
    if (playerWinRounds > computerWinRounds) {
        winner = "Player";
        winnerRounds = playerWinRounds;
    } else if (playerWinRounds < computerWinRounds) {
        winner = "Computer";
        winnerRounds = computerWinRounds;
    } else {
        winner = null;
    }

    let result;
    if (winner != null) {
        result = `The winner is ${winner}! He wons ${winnerRounds} rounds!`;
    } else {
        result = "Tie game!";
    }

    return result;
}

function playRound(playerSelection) {
    /*
    0 tie. 1 player win. -1 computer win.
    */
    let computerSelection =  computerPlay();
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.toLowerCase().slice(1);
    if (tie(playerSelection, computerSelection)) {
        console.log( "It's a tie. Try again.");
        return 0;
    } else if (playerWins(playerSelection, computerSelection)) {
        console.log(`You win! ${playerSelection} beats ${computerSelection}!`);
        return 1;
    } else {
        console.log(`You lose! ${computerSelection} beats ${playerSelection}!`);
        return -1;
    }
}

function computerPlay() {
    // random number 0, 1 or 2.
    randomNumber = Math.floor(Math.random() * 3);
    selections = ["Rock", "Paper", "Scissors"];
    return selections[randomNumber];
}

function tie(playerSelection, computerSelection) {
    return playerSelection == computerSelection;
}

function playerWins(playerSelection, computerSelection) {
    return playerSelection == "Rock" && computerSelection == "Scissors" ||
           playerSelection == "Scissors" && computerSelection == "Paper" ||
           playerSelection == "Paper" && computerSelection == "Rock";
}


