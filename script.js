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

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
});

document.querySelector('.reset-button').addEventListener('click', ()=> {
        resetScore();
});

const buttonPlay = document.querySelector('.auto-play-button');

buttonPlay.addEventListener('click', ()=>{
    autoPlay();
});


document.body.addEventListener('keydown', (event) =>{
    if(event.key === 'r'){
        playGame('rock');
    }else if(event.key === 'p'){
        playGame('paper');
    }else if(event.key === 's'){
        playGame('scissors');
    }else if(event.key === 'a'){
        autoPlay();
    }else if(event.key === 'Backspace'){
        resetScore();
    }
});

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

let isAutoPlaying = false;
let intervalID; 

function autoPlay(){
    if(!isAutoPlaying){
        intervalID = setInterval(function(){
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
        buttonPlay.innerHTML = 'Stop Playing';
    }else{
        clearInterval(intervalID);
        isAutoPlaying = false;
        buttonPlay.innerHTML = 'Auto Play';
    }
}

function resetScore(){
        

            confirmReset(); 

            
        
}

function confirmReset(){

        const confirmation = document.querySelector('.confirmation');
        
        confirmation.innerHTML = '<p class="confim-message">Are you sure you want to reset the score?</p><button class="confirm-button">Yes</button><button class="cancel-button">No</button>';

        document.querySelector('.confirm-button').addEventListener('click', ()=>{
            score.wins = 0;
            score.losses = 0;
            score.ties = 0; 
            localStorage.removeItem('score');
            document.querySelector('.final-result').innerHTML = ' ';
            document.querySelector('.score').innerHTML = 'Wins: 0 | Losses: 0 | Ties: 0';
            confirmation.innerHTML = '';
        });

        

        document.querySelector('.cancel-button').addEventListener('click', ()=>{
            confirmation.innerHTML = '';
        });

}