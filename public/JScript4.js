let playerScore = 0;
let computerScore = 0;
let playerScore_span = document.getElementById("playerScore");
let computerScore_span = document.getElementById("computerScore");
let batu_id = document.getElementById("batu");
let kertas_id = document.getElementById("kertas");
let gunting_id = document.getElementById("gunting");
let batuCom_id = document.getElementById("batuCom");
let kertasCom_id = document.getElementById("kertasCom");
let guntingCom_id = document.getElementById("guntingCom");
let vs_span = document.getElementById("VS");


function getComputerChoice(){
    let choices = ["gunting", "kertas", "batu"]
    let randomNumber = (Math.floor(Math.random() * 3));
    return choices[randomNumber];
}

function win(){
    playerScore++;
    playerScore_span.innerHTML = playerScore;
    document.getElementById("VS").className = "win";
    vs_span.innerHTML = "Player 1 Win";
    console.log("Player 1 Win !!")
}
function lose(){
    computerScore++;
    computerScore_span.innerHTML = computerScore;
    document.getElementById("VS").className = "win";
    vs_span.innerHTML = "Computer Win";
    console.log("Player 1 Lose :<")
}
function draw(){
    vs_span.innerHTML = "Draw";
    document.getElementById("VS").className = "draw";
    console.log("Draw..")
}


function game(playerChoice){
    let computerChoice = getComputerChoice();
    
    if(computerChoice === "gunting"){
        guntingCom_id.style.backgroundColor = "#C4C4C4"
        }
        else if(computerChoice === "kertas"){
        kertasCom_id.style.backgroundColor = "#C4C4C4"
        }
        else if(computerChoice === "batu"){
        batuCom_id.style.backgroundColor = "#C4C4C4"
        }

     switch(playerChoice + computerChoice){
         case "batugunting":
         case "kertasbatu":
         case "guntingkertas":
    win();
    break;

        case "kertasgunting":
        case "guntingbatu":
        case "batukertas":
    lose();
    break;

        case "guntinggunting":
        case "kertaskertas":
        case "batubatu":
    draw();
    break;

     }
}


function main(){

        batu_id.addEventListener('click', function(){
            batu_id.style.backgroundColor = "#C4C4C4" 
            game("batu")
        })
        kertas_id.addEventListener('click', function(){
            kertas_id.style.backgroundColor = "#C4C4C4" 
            game("kertas")
        })
        gunting_id.addEventListener('click', function(){
            gunting_id.style.backgroundColor = "#C4C4C4" 
            game("gunting")
        })

}

main();