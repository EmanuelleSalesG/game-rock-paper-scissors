let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
}


let computerMoveAux = '';
let result = '';

function pickComputerMove(){
    
    let computerMove = '';   
    let randomNumber = Math.random();
    
    
    if(randomNumber >= 0 && randomNumber < 1/3){
        computerMove = 'rock';
    }else if(randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove = 'paper';
    }else if(randomNumber >= 2/3 && randomNumber < 1){
        computerMove = 'scissors';
    }

    return computerMove;
}

function playGame(playerMove){
                
    const computerMoveAux = pickComputerMove();

    if(playerMove === 'scissors'){
        if(computerMoveAux === 'rock'){
            result = 'You lose.';
        }else if(computerMoveAux === 'paper'){
            result = 'You Win.';
        }else if(computerMoveAux === 'scissors'){
            result = 'Tie.';
        }
    }else if(playerMove === 'paper'){

        if(computerMoveAux === 'rock'){
            result = 'You win.';
        }else if(computerMoveAux === 'paper'){
            result = 'Tie.';
        }else if(computerMoveAux === 'scissors'){
            result = 'You lose.';
        }
    }else if(playerMove === 'rock'){
        
        if(computerMoveAux === 'rock'){
            score.ties = score.ties + 1;
        }else if(computerMoveAux === 'paper'){
            score.losses = score.losses + 1;
        }else if(computerMoveAux === 'scissors'){
            score.wins = score.wins + 1;
        }
    }

    if(result === 'You win.')
        score.wins += 1;
    else if(result === 'You lose.')
        score.losses += 1;
    else if(result === 'Tie.')
        score.ties += 1;
    
    localStorage.setItem('score', JSON.stringify(score));

        document.querySelector('.final-result').innerHTML = result + "<br><br>";

        document.querySelector('.score').innerHTML = "You: " + '<img class="move-icon" src="/img/' + playerMove + '-emoji.png" ></img>' + "                    " + "Computer: " + '<img class="move-icon" src="/img/' + computerMoveAux + '-emoji.png" ></img>' + "<br><br>" + "Wins: "+ score.wins + " | " + "Losses: " + score.losses + " | " +  "Tie: " + score.ties;        
}