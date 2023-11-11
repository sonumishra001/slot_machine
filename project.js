// 1. Deposit some Money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play again



// import module from prompt-sync for user-input from node module folder (npm i prompt-sync)
const prompt = require("prompt-sync")();

//deckaring some global variable

const ROWS = 3
const COLS = 3

const SYMBOLS_COUNT = {
    "A":2,
    "B":4,
    "C":6,
    "D":8,
}

const SYMBOLS_VALUES = {
    "A":5,
    "B":4,
    "C":3,
    "D":2,
}





//------------------------step-1------------------------
//deposit/ balance ammount
const deposit = ()=>{
    while(true)
    {
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount) //"hello"-- NaN
    //check the number entered by user should not be NaN and 0
        if(isNaN(numberDepositAmount) || numberDepositAmount<=0){
            console.log("Invalid Deposit amount, try again");
        }
    // if user input correct element then else part will be executed
        else{
            return numberDepositAmount
        }

    }
} 
//number of lines user want to enter
const getNumberOfLines = ()=>{

        while(true)
        {
            const lines = prompt("Enter the number of lines to bet on (1-3): ");
            const numberOfLines = parseFloat(lines) //"hello"-- NaN
        //check the number entered by user should not be NaN and 0
            if((numberOfLines===NaN) || numberOfLines<=0 || numberOfLines>3){
                console.log("Invalid Number of lines, try again");
            }
        // if user input correct element then else part will be executed
            else{
                return numberOfLines
            }
        }
    }

//total amount to bet
const getBet = (balance, lines)=>{
    while(true)
        {
            const bet = prompt("Enter total bet per line: ");
            const numberBet = parseFloat(bet) //"hello"-- NaN
        //check the number entered by user should not be NaN and 0
            if(isNaN(numberBet) || numberBet<=0 || numberBet>balance/lines){
                console.log("Invalid bet, try again. ");
            }
        // if user input correct element then else part will be executed
            else{
                return numberBet
            }
        }
}

//spin the slot
const spin = ()=>{
    const symbols = []
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i< count; i++){
            symbols.push(symbol)
        }
    }
    const reels = []
    for(let i=0 ; i<COLS ; i++){
        reels.push([])
        const reelSYmbols = [...symbols]
        for(let j = 0; j<ROWS; j++){
            const randomIndex = Math.floor(Math.random()*reelSYmbols.length)
            const selectedSYmbol = reelSYmbols[randomIndex]
            reels[i].push(selectedSYmbol)
            reelSYmbols.splice(randomIndex, 1)
        }
    }
    return reels
}

//transpose matrix (from column to row)
const transpose = (reels)=>{
    const rows = []

    for(let i = 0; i<ROWS; i++){
        rows.push([])
        for(let j = 0; j< COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows
    
}
//printing rows
const printRows = (rows)=>{
    for(const row of rows ){
        let rowString = ""
        for (const [i, symbol] of row.entries()){
        rowString+= symbol
        if(i != row.length-1){
            rowString += " | "
        }
    }
        console.log(rowString);
    }
}
// get winner
const getWinnings = (rows, bet, lines)=>{
    let winnings = 0
    
    for(let row=0 ; row<lines; row++){
        const symbols = rows[row]
        let allSame = true

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false
                break;
            }
        }
        if (allSame){
            winnings+= bet * SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winnings;
}

const game = ()=>{
let balance = deposit();

while(true){
    console.log(`You have a balance of $${balance}`);
const numberOfLines = getNumberOfLines()

const bet = getBet(balance,numberOfLines)
balance-= bet*numberOfLines
const reels = spin()
const rows = transpose(reels)
// console.log(reels);
// console.log(rows);
printRows(rows)
const winnings = getWinnings(rows, bet, numberOfLines)
balance+=winnings
console.log(`You won, $${winnings.toString()}`);
if(balance<=0){
    console.log("You ran out of money!");
    break;
    }
    const playAgain = prompt("Do you want to play again (y/n): ")
    if(playAgain!="y") break;
}

}

game()
