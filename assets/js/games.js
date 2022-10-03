/* Simple anonymous function that is self-invoked*/

const myModule = (() => {
    'use strict'

    const tipes = ['C', 'D', 'H', 'S'],
          specials = ['A', 'J', 'Q', 'K'];

    let deck = [],
        playerPoints = [];
    
    /* HTML references */
    const btnAsk = document.querySelector('#btnAsk'),
          btnStop = document.querySelector('#btnStop'),
          btnNew = document.querySelector('#btnNew'),
          htmlPoints = document.querySelectorAll('small'),
          divCards = document.querySelectorAll('.divCards');
    
    /* This function initializes the game */      
    const initializeGame  = ( playersNum = 2 ) => { 

        deck = [];
        deck = crearDeck();
        playerPoints = [];

        for(let i = 0; i < playersNum ; i ++) {
            playerPoints.push(0);
            htmlPoints[i].innerText = 0;
            divCards[i].innerHTML = '';
        }

        btnAsk.disabled = false;
        btnStop.disabled = false;
    }

    /* This function creates a new deck */
    const crearDeck = () => {
        deck = [];

        for(let i = 2; i <=10 ; i++) {
            for(let tipe of tipes){
                deck.push(i + tipe); 
            }
        }

        for(let tipe of tipes) {
            for (let special of specials) {
                deck.push(special + tipe);
            }
        }

        //TODO: Cambiar el shuffle para que sea manual 
        return  _.shuffle(deck);
    };

    /* This function allows me to take a card */
    const takeCard = () => {
        return (deck.length === 0 )
        ? (function(){throw 'There are no cards in the deck';}())
        : deck.pop();
    };

    /* This function allows me to know the value of the card */
    const valueCard = (card) => {
        const value = card.substring(0,card.length-1);
        return (isNaN(value)) 
            ? (value === 'A') ? 11 : 10
            : value * 1; 
    };

    /*   Optimizing code
      * Shift 0 = The first player.
      * The last players is always the computer.
    */

    const accumulatePoints = (card, shift ) => {
        playerPoints[shift] += valueCard(card);
        htmlPoints[shift].innerText = playerPoints[shift];
        return playerPoints[shift];
    };

    const createCard = (card, shift) => {
        const cardImg = document.createElement('img');
        cardImg.src = `assets/cards/${card}.png`;
        cardImg.classList.add('cards');
        divCards[shift].append(cardImg); 
    }

    const determinateWinner = () => {

        const [minimumPoints, computerPoints] = playerPoints;

        setTimeout( ()=> {
            if(computerPoints === minimumPoints) {
                alert('Nobody wins :(');
            } else if( minimumPoints >21) {
                alert('Computer wins')
            } else if(computerPoints > 21) {
                alert('Player wins');
            } else if ( (computerPoints > minimumPoints) && (computerPoints<=21)){
                alert('Computer wins');
            } else {
                alert('Player wins');
            }
        }, 50);
    }

     /* ************************************************************** */

    /* Computer Shift */
    const computerShift = ( minimumPoints ) => {

        let computerPoints = 0;

        do {
            const card = takeCard();
            computerPoints = accumulatePoints(card, playerPoints.length-1);
            createCard(card, playerPoints.length-1);

        } while((computerPoints < minimumPoints) && (minimumPoints<=21));

        determinateWinner();
    }

    /* HTML Events */

    btnAsk.addEventListener('click', function(){
        const card = takeCard();
        const playerPoints = accumulatePoints(card, 0);
        createCard(card, 0);

        if(playerPoints > 21) { 
            btnAsk.disabled = true;
            btnStop.disabled = true;
            computerShift(playerPoints);
         }
        else if (playerPoints === 21) {
            btnAsk.disabled = true;
            btnStop.disabled = true;
            computerShift(playerPoints);
        }
    });

    btnStop.addEventListener('click', function(){ 
        btnAsk.disabled = true;
        btnStop.disabled = true;
        computerShift(playerPoints[0]);
    });

    btnNew.addEventListener('click', function() { initializeGame(); });

    return {
        newGame: initializeGame
    };

})();