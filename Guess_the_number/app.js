let min = 1,
    max = 10,
    winingNum = getRandom(min,max),
    guessLeft = 3;


const game = document.getElementById('game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//assign the min and max value--------------
minNum.textContent = min;
maxNum.textContent = max;

//EventListener-------------------------

//Play Again
game.addEventListener('mousedown',function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

//guess the number
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter the value between ${min} and ${max}`,'red');
    }
    
    if(guess === winingNum){
        //game over --won
        gameOver(true, `${winingNum} is the correct guess!`,'green');        
    
    }else{
        //game over
        guessLeft -= 1;
       
        if(guessLeft === 0){
            gameOver(false, `Game Over,${winingNum} is the correct answer`,'red')
        }else{
            guessInput.style.borderColor = "red";
            //clear input field
            guessInput.value = '';
            setMessage(`Your guess is wrong, Guess remaining:${guessLeft}`, 'red');
        }
    }
});



//function gameOver-------------------
function gameOver(won, msg){
    let color;
    won === true ? color ='green': color = 'red';
    //disable the input
    guessInput.disabled = true;
    //make border green
    guessInput.style.borderColor = color;
    //set message
    setMessage(msg,color);

    //set play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//generatorn of winning no.
function getRandom(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

//error function-------------------------
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}