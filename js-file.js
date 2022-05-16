let userScore = 0; /* Initialize user score in order to keep track. */
let compScore = 0; /* Initialize computer score in order to keep track. */

function computerPlay (){
    const myArray = ["rock", "paper", "scissors"];
    return myArray[Math.floor(Math.random() * myArray.length)]; /* Multiply a float between 0 and 1 by the length of myArray and then round down to the closest integer. The integer within [] represents the array's index. */
}

/* The playRound function takes two parameters; userSelection and computerSelection. If the computer's selection happens to equal to user's input, then the console will output a draw message. Else if the computer's selection beats user's selection in either of the 3 varieties, a losing round message will be outputted and compScore incremented. If the user's selection beats computer's selection in either of the 3 varities, a winning round message will be outputted and userScore incremented.*/
function playRound (userSelection, computerSelection){
    userSelection = userSelection.toLowerCase();
    if (computerSelection === userSelection){
        document.getElementById("notify").innerHTML = "It's a draw!";
    } else if (
        (computerSelection === "rock" && userSelection === "scissors") || (computerSelection === "scissors" & userSelection === "paper") || (computerSelection === "paper" && userSelection === "rock")
    ){
        compScore += 1;
        document.getElementById("notify").innerHTML = `You lose this round! ${capitalize(computerSelection)} beats ${userSelection}.`;
    } else if (
        (userSelection === "rock" && computerSelection === "scissors") || (userSelection === "scissors" & computerSelection === "paper") || (userSelection === "paper" && computerSelection === "rock")
    ){
        userScore += 1;
        document.getElementById("notify").innerHTML = `You win this round! ${capitalize(userSelection)} beats ${computerSelection}.`;
    }}

    function capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1); /* charAt picks the first letter of a string and capitalizes it. slice cuts and returns a string from the chosen index. Both strings are then added and returned. */
    }

    function game(){

            const againButton = document.querySelector('#again')
            againButton.style.display = "none";
            document.getElementById("score").style.display = "none";
            const btns = document.querySelectorAll('.button')
            btns.forEach(btn => btn.style.display = "none");

            document.getElementById('start').addEventListener('click', () => {
                startGame();
            })

            function btnchk(e){
                let playerSelection = e.target.innerHTML;
                playRound(playerSelection, computerPlay());
                displayScore();
            }

            btns.forEach(btn => btn.addEventListener('click', (e) => {
                btnchk(e);
                scoreCheck();
            }));
            
            const displayScore = function(){
                document.getElementById("usrscr").innerHTML = `User Score: ${userScore}`;
                document.getElementById("cmpscr").innerHTML = `Comp Score: ${compScore}`;
            }

            const scoreCheck = function(){
                if(compScore === 5 || userScore === 5){
                    btns.forEach(btn => btn.disabled = true);
                    if (userScore > compScore){
                        playAgain();
                        setTimeout(function(){
                            document.getElementById("notify").innerHTML = 'You win!';
                        }, 800)
                        
                    } else if (userScore < compScore){
                        playAgain();
                        setTimeout(function(){
                            document.getElementById("notify").innerHTML = 'Computer wins!';
                        }, 800)
                         
                    } else {
                        playAgain();
                        setTimeout(function(){
                            document.getElementById("notify").innerHTML = 'Tie game.';
                        }, 800)
                        
                    }
                }
            }

            const playAgain = function(){
                const fadeTarget = document.querySelector('#container');
                setTimeout(function(){
                    fadeTarget.classList.toggle('fade');
                    setTimeout(function(){
                        btns.forEach(btn => btn.style.display = "none");
                        againButton.style.display = "block";
                        fadeTarget.classList.toggle('fade');
                        againButton.addEventListener('click', () => {
                            fadeTarget.classList.toggle('fade');
                            setTimeout(function(){
                                btns.forEach(btn => btn.disabled = false);
                                document.getElementById("notify").innerHTML = '<br>';
                                i = 0;
                                userScore = 0;
                                compScore = 0;
                                displayScore();
                                againButton.style.display = "none";
                                btns.forEach(btn => btn.style.display = "inline-block");
                                fadeTarget.classList.toggle('fade');
                            }, 400)  
                        })
                    },400)
                    },500)
                
            }

            const startGame = function(){
                const fadeTarget = document.querySelector('#container');
                fadeTarget.classList.toggle('fade');
                setTimeout(function() {
                    document.getElementById("start").style.display = "none";
                    btns.forEach(btn => btn.style.display = "inline-block");
                    document.getElementById("score").style.display = "flex";
                    fadeTarget.classList.toggle('fade');
                }, 400)
            }
    }

    game();