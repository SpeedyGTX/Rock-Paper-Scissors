let userScore = 0; /* Initialize user score in order to keep track. */
let compScore = 0; /* Initialize computer score in order to keep track. */
let i = 0; /* Variable that's incremented in the playRound function in order for the while loop to not count the rounds with an invalid input */

function computerPlay (){
    const myArray = ["rock", "paper", "scissors"];
    return myArray[Math.floor(Math.random() * myArray.length)]; /* Multiply a float between 0 and 1 by the length of myArray and then round down to the closest integer. The integer within [] represents the array's index. */
}

/* The playRound function takes two parameters; userSelection and computerSelection. User selection parameter is lowercased to accommodate the input's style of capitalization. If the computer's selection happens to equal to user's input, then the console will output a draw message. Else if the computer's selection beats user's selection in all 3 varieties, a losing round message will be outputted and both i and compScore incremented. If the user's selection beats computer's selection in all 3 varities, a winning round message will be outputted and both i and userScore incremented. Otherwise, an invalid message will be outputted.*/
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

    /* While i is less than 5, prompt the user to input the selection and then call on the playRound function. Afterwards, compare the scores. That which is higher wins, otherwise it's a draw. */
    function game(){
            function btnchk(e){
                let playerSelection = e.target.innerHTML;
                playRound(playerSelection, computerPlay());
                i += 1;
                displayScore();
            }
            
            const againButton = document.querySelector('#again')
            againButton.style.display = "none";
            document.getElementById("score").style.display = "none";
            const btns = document.querySelectorAll('.button')
            btns.forEach(btn => btn.style.display = "none");
            const startButton = document.querySelector('#start')
            startButton.addEventListener('click', () => {
                fadeEffect();
                
            })

            btns.forEach(btn => btn.addEventListener('click', (e) => {
                btnchk(e);
                scoreCheck();
            }));
            
            const displayScore = function(){
                document.getElementById("usrscr").innerHTML = `User Score: ${userScore}`;
                document.getElementById("cmpscr").innerHTML = `Comp Score: ${compScore}`;
            }

            const scoreCheck = function(){
                if(i === 5){
                    if (userScore > compScore){
                        document.getElementById("notify").innerHTML = 'You win!';
                        playAgain();
                        
                    } else if (userScore < compScore){
                        document.getElementById("notify").innerHTML = 'Computer wins!';
                        playAgain();
                        
                    } else {
                        document.getElementById("notify").innerHTML = 'Tie game.';
                        playAgain();
                        
                    }
                }
            }

            const playAgain = function(){
                btns.forEach(btn => btn.style.display = "none");
                againButton.style.display = "block";
                againButton.addEventListener('click', () => {
                    document.getElementById("notify").innerHTML = '';
                    i = 0;
                    userScore = 0;
                    compScore = 0;
                    displayScore();
                    againButton.style.display = "none";
                    btns.forEach(btn => btn.style.display = "inline-block");
                    
                })
            }

            const fadeEffect = function(){
                const fadeTarget = document.querySelector('#container');
                fadeTarget.classList.toggle('fade');
                setTimeout(function() {
                    document.getElementById("start").style.display = "none";
                    btns.forEach(btn => btn.style.display = "inline-block");
                    document.getElementById("score").style.display = "flex";
                    fadeTarget.classList.toggle('fade');
                }, 500)

                
                

            }



            
        
    }

    game();