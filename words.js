const inputsContainer=document.querySelector(".inputs"),
    discT=document.querySelector(".disc"),
    numberTrials=document.querySelector(".number_trails"),
    btn=document.querySelector(".btn"),
    typing=document.querySelector(".typing"),
    success= new Audio("audio.mp3"),
    winner=document.querySelector(".winner"),
    seconContainer=document.querySelector(".container");


    // all words
    const words=[
        {word:"react",
        disc:"javascript library"
        },
        {word:"vue",
        disc:"javascript framework"
        },
        {word:"angular",
        disc:"javascript MVW framework"
        },
        {word:"nodejs",
        disc:"javascript runtime environment"
        },
        {word:"php",
        disc:"general-purpose scripting language "
        },
        {word:"ruby",
        disc:"open source programming language"
        },
        {word:"python",
        disc:" programming language"
        },
        {word:"tailwind",
        disc:"a utility-first css framework"
        },
        {word:"bootstrap",
        disc:"world s most famous free CSS framework"
        },
    ]

 
document.addEventListener("keydown",()=> typing.focus())
typing.addEventListener("input",startGame);
btn.addEventListener("click",getRandomWord)

let word;
let countWin=[];
let maxGuess=12;


function startGame(e){
    let char=e.target.value;
    if(!char.match(/[a-z]/i))return;

    if(word.includes(char)){
        for(let i=0;i<word.length;i++){
            if(word[i]===char&&!inputsContainer
                .querySelectorAll("input")[i].value){
                inputsContainer.querySelectorAll("input")[i].value=char;
                countWin.push(char);
                inputsContainer.querySelectorAll("input")[i].classList.toggle("main-input");
            }
        }
    }
    else{
        maxGuess=maxGuess-1;
    }
    typing.value="";
    numberTrials.innerText=maxGuess;

    if(countWin.length=== word.length){
        winner.classList.remove("hidden")
        success.play();
        seconContainer.classList.add("second-div");
        countWin=[];
    }
    setTimeout(()=>
    {
         if(maxGuess<=0){
        alert("try again")
        for(let i=0 ;i<word.length;i++){
            inputsContainer.querySelectorAll("input")[i].value=word[i]
        }
    }})
}

// random word


function getRandomWord(){
   reset ();
    let randomWord=words[Math.floor(Math.random() * words.length)]
    , disc=randomWord.disc;
     word=randomWord.word;

    discT.innerHTML=disc;
   
    
    // random inputs
    let inputs="";
    for(let i=0;i<word.length;i++){
        inputs += `<input type="text" disabled>`
    }
    inputsContainer.innerHTML=inputs;
    numberTrials.innerText=maxGuess;
}
getRandomWord();

function reset(){
    maxGuess=12;
    winner.classList.add("hidden");
    countWin=[];
    success.pause();
}
