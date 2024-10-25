"use strict";

//Assist functions
const isNumber = (input) => typeof input ==='number' && !isNaN(input);
const isNumberAndInt = (input) => isNumber(input) && Number.isInteger(input);

//dom declarations
const evenOrOdd = document.querySelector("#evenOrOdd");

const simpleCountdownTimerBtn = document.querySelector("#simpleCountdownTimer");
const simpleCountTimerNum = document.querySelector("#simpleCountTimerNum");

const guessTheNumberGame = document.querySelector("#guessTheNumberGame");
const guessTheNumberGameNum = document.querySelector("#guessTheNumberGameNum");

const simpleStopWatch= document.querySelector("#simpleStopWatch");

const delayedGreeting = document.querySelector("#delayedGreeting");
const delayedGreetingNameInput = document.querySelector("#delayedGreetingNameInput");

const repeatedFunctionExec = document.querySelector("#repeatedFunctionExec");
const numOfTheFunction = document.querySelector("#numOfTheFunction");
const numOfIterations = document.querySelector("#numOfIterations");

//bind listeners
evenOrOdd.addEventListener("click",evenOrOddLoop);
simpleCountdownTimerBtn.addEventListener("click",simpleCountdownTimer);
guessTheNumberGame.addEventListener("click",guessTheNumber);
simpleStopWatch.addEventListener("click",stopWatch);
delayedGreeting.addEventListener("click",myDelayedGreeting);
repeatedFunctionExec.addEventListener("click",repeatFunction);
// 1. Even or Odd Function
const isEven = (n1) => n1 % 2 ===0;

function evenOrOddLoop(){

    for(let i = 0 ; i <=20 ; i++){
        const evenOrOddResult = ( isEven(i) ? "even" : "odd" );
        console.log(`${i} is ${evenOrOddResult}`);
    }
}



//2. Simple Countdown Timer

function simpleCountdownTimer(){

    let theValue = parseInt(simpleCountTimerNum.value, 10);



    //checking first if input is a not a number or it is not an integer.
    if ( !isNumberAndInt(theValue) ){
        console.log("invalid input. (This should be normally replaced with an Error)");
        return;
    }

    //checking for positive num...
    if(theValue  <= 0){
        console.log("Countdown starting value should be a positive number between 1-10")
        return;
    }

    console.log(theValue);

    const theInterval = setInterval( ()=>{
        if (theValue<=1){
            console.log("Times up");
            clearInterval(theInterval);
            return;
        }
        console.log(--theValue);
    },1000)
}



//3. Guess the Number Game 

//generating the value
let generatedValue= Math.floor( Math.random() * 10 ) + 1;
//attempts counter
let attempts = 0;
//max attempts
const maximumAttempts = 3;

function guessTheNumber(){

    //taking the value from the input turning it into an Int (if valid)
    let theValue = parseInt(guessTheNumberGameNum.value);

    //checking if input is valid
    if ( !isNumberAndInt(theValue) ){
        console.log("invalid input. (This should be normally replaced with an Error)");
        return;
    }

    if (theValue === generatedValue){
        console.log("Congratulations! You guessed it.");
        attempts = 0;
        generatedValue = Math.floor( Math.random() * 10 ) + 1;
        console.log("Generated new value and resetted the attempts");
        return;
    }

    //increase attempt after failing to guess.
    ++attempts;

    //checks the updated number of attempts, if all 3 attempts are wasted it resets
    //the generated value and the attempts,if not it reports the current state of attempts.
    if(attempts >= 3){
        console.log("You lost. The generated value was" , generatedValue);
        attempts = 0;
        generatedValue = Math.floor( Math.random() * 10 ) + 1;
        console.log("Generated new value and resetted the attempts");
        return;
    }else{
        let remainingAttempts = maximumAttempts - attempts;
        const comparementStatus = (theValue > generatedValue ? "Too high" : "Too low");
        console.log(`${comparementStatus} .You have ${remainingAttempts} remaining attempt left...`);
    }

}


//4. Simple Stop Watch(better say counter for obvious reasons...)
function stopWatch(){
   
    let counter = 0;
    const theInterval = setInterval( () => {
    //using Pre-increment, since setInterval start "after" 1s makes no sense to start from 0
        console.log(++counter);
        if (counter >= 5) clearInterval(theInterval);
    }
        , 1000);
    
}

//5 delayed greeting.
function myDelayedGreeting(){
    //...(used to call it sanitization)
    //it replaces any other char that its not in the groups a-z AZ 0-9.
    let theName = delayedGreetingNameInput.value.replace(/[^a-zA-Z0-9 ]/g, "");
    //remove the spaces and check if valid, if not then switch to default.
    theName = theName.trim() ? theName : "stranger";

    setTimeout( () => console.log(`Hello, ${theName}`) ,3000);
}

//6. Repeated Function Execution

//I chose a bit abnormal way to do this...by having a recursion with 1s delay;
//I assume the most "correct" way would have been to multiply the setTimeout delay
//on a for loop with counter being the number given...

function repeatFunction () {
    let theValueForIter = parseInt(numOfIterations.value, 10);

    // iteration number between 1 and 3
    if (!isNumberAndInt(theValueForIter) || theValueForIter < 1 || theValueForIter > 3) {
        console.log("Invalid input for iterations");
        return;
    }

    // parsing it to Int
    let numOfTheFuncToBeConverted = parseInt(numOfTheFunction.value, 10);

    //using the number of the function given to get its name
    //1 for EvenOrOdd, 2 for simpleCount ...  e.t.c
    const theFunctionChosen =( ()=> {
        switch(numOfTheFuncToBeConverted){
                case 1: return evenOrOddLoop;
                case 2: return simpleCountdownTimer;
                case 3: return guessTheNumber ; 
                case 4: return stopWatch ; 
                case 5: return myDelayedGreeting;
                default:return myDelayedGreeting ;
            }
        })();
        //starting delay of the 1 sec
    setTimeout(()=> {
        executeRepeatedly(theFunctionChosen, theValueForIter);
    },1000);
    
}

//Its important here to have funcToRepeat() After the setTimeout

//Would it  work on the way arround ; yes it would because listeners
//and their callbacks are also async... anyway its better to not mess
//with it.
function executeRepeatedly(funcToRepeat, timesToRepeat) {
    if (timesToRepeat <= 0) return;
    setTimeout(() => {
        executeRepeatedly(funcToRepeat, timesToRepeat-1);                
     }, 1000);
     funcToRepeat();
}


