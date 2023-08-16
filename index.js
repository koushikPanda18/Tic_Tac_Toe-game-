const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameStatus;
const winningStatus=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function iniyialize(){
    currentPlayer="X";
    gameStatus=["","","","","","","","",""];
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
}

iniyialize();

console.log("first");
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});
console.log("second");
function handleClick(index){
    if(gameStatus[index] === ""){
        boxes[index].innerText=currentPlayer;
        gameStatus[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        console.log("check");
        changePlayer();
        console.log("third");
        gameOver();
    }
}

function changePlayer(){
    if(currentPlayer=="X"){
        currentPlayer="0";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
function gameOver(){
    let answer="";
    winningStatus.forEach((position)=>{
        if((   gameStatus[position[0]]  != ""    &&   gameStatus[position[1]]    !=""   &&   gameStatus[position[2]]   !=""  ) && (  (gameStatus[position[0]] === gameStatus[position[1]])   &&   (gameStatus[position[1]] === gameStatus[position[2]]))){
            if(gameStatus[position[0]] ==="0"){
                answer="0";
            }
            else{
                answer="X";
            }
            boxes.forEach((box) =>{
                box.style.pointerEvents="none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            console.log("fourth");

        }
    });
    if(answer !=""){
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        console.log("fifht");
        return;
    }
    let counter=0;
    gameStatus.forEach((box) => {
        if(box !== "" )
            counter++;
    });
    if(counter === 9){
        gameInfo.innerText="Match Tied !";
        newGameBtn.classList.add("active");
    }
}

newGameBtn.addEventListener('click',()=>{
    iniyialize();
})