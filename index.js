// insantiates the gameboard, including board reset
const gameBoard = (() => {
    const body = document.querySelector('body');

    // display the grid
    const displayBoard = (p1, p2) => {
        const board = document.createElement('div');
        board.className = "board-container";
        body.append(board);

        // appends cells to a row
        const addCell = (element, cells) => {
            for(i = 0; i < cells; i++) {
                let str = element.id;
                let cell = document.createElement('div');
                cell.className = "cell " + i;
                cell.id = str;
                cell.style = "pointer-events: auto";
                cell.onclick = function() {game.placeIcon(cell)};
                element.append(cell);
            }
        };
        function clearBoard() {
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.style = "pointer-events: auto";
                cell.innerHTML = '';
            });
            game.clearBoard();
        }
        // append rows
        const rowOne = document.createElement('div');
        rowOne.className = "row row-one";
        rowOne.id = "row-one";
        addCell(rowOne, 3);
        const rowTwo = document.createElement('div');
        rowTwo.className = "row row-two";
        rowTwo.id = "row-two";
        addCell(rowTwo, 3);
        const rowThree = document.createElement('div');
        rowThree.className = "row row-three";
        rowThree.id = "row-three";
        addCell(rowThree, 3);
        board.append(rowOne);
        board.append(rowTwo);
        board.append(rowThree);

        // create/append reset button and quit button
        const btnContainer = document.createElement('div');
        btnContainer.className = "board-btn-container";
        const resetBtn = document.createElement('button');
        resetBtn.className = "board-reset-btn";
        resetBtn.innerHTML = "RESET";
        resetBtn.onclick = function() {clearBoard()};
        const quitBtn = document.createElement('button');
        quitBtn.className = "board-quit-btn";
        quitBtn.innerHTML = "QUIT";
        quitBtn.onclick = function() {game.start()};
        btnContainer.append(resetBtn);
        btnContainer.append(quitBtn);
        board.append(btnContainer);
        
        // create/append player names/scores
        const playerZone = document.createElement('div');
        playerZone.className = 'player-score-container';

        const player1 = document.createElement('div');
        player1.className = "player-one-container";
        const player1Title = document.createElement('p');
        player1Title.className = "player-one-title";
        player1Title.innerHTML = p1.name;
        player1.append(player1Title);
        const player1Score = document.createElement('p');
        player1Score.className = "player-one-score";
        player1Score.innerHTML = "0";
        player1.append(player1Score);

        const player2 = document.createElement('div');
        player2.className = "player-two-container";
        const player2Title = document.createElement('p');
        player2Title.className = "player-two-title";
        player2Title.innerHTML = p2.name;
        player2.append(player2Title);
        const player2Score = document.createElement('p');
        player2Score.className = "player-two-score";
        player2Score.innerHTML = "0";
        player2.append(player2Score);

        playerZone.append(player1, player2);
        board.append(playerZone);

    };

    function removeBoard() {
        const board = document.querySelector('.board-container');
        body.removeChild(board);
    }
    
    return {displayBoard, removeBoard};
})();

// player object
const Player = function(name, icon, cssSelector) {
    this.name = name;
    this.icon = icon;
    this.score = 0;
    this.cssSelector = cssSelector;
    const playerInfo = () => console.log(name, score);
    return {name, icon, score, cssSelector, playerInfo};
};

// display and remove init setup form
const form = (() => {
    const body = document.querySelector('body');
    //display startup form
    function displayForm() {
        const formContainerContainer = document.createElement('div');
        formContainerContainer.className = "start-form-container-container";
        const formContainer = document.createElement('form');
        formContainer.className = "start-form-container";

        function playerSetup(playerCSS, playerTitle) {
            const playerContainer = document.createElement('div');
            playerContainer.className = "player-container " + playerCSS + "-container";

            // input name
            const name = document.createElement('input');
            name.className = playerCSS + "-input";
            name.name = playerCSS + "-input";
            name.id = playerCSS + "-input";
            const nameLabel = document.createElement('label');
            nameLabel.innerHTML = playerTitle;
            nameLabel.htmlFor = playerCSS + "-input"; 

            playerContainer.append(nameLabel, name);
            formContainer.append(playerContainer);
        }
        playerSetup('player-one', "Player One");
        playerSetup('player-two', "Player Two");

        const startBtn = document.createElement('button');
        startBtn.className = 'start-btn';
        startBtn.innerHTML = 'START';

        formContainer.append(startBtn);
        formContainerContainer.append(formContainer);
        body.append(formContainerContainer);
    }

    function removeForm() {
        const formContainerContainer = document.querySelector('.start-form-container-container');
        body.removeChild(formContainerContainer);
    }
    return {displayForm, removeForm};
})();

const game = (() => {
    // initialize default player state
    let playerOne = Player("", "X", "player-one");
    let playerTwo = Player("", "O", "player-two");

    // set the "current" player
    let currentPlayer = playerOne;

    // swap player between placing icons
    function swapPlayer(player) {
        currentPlayer = player;
    }

    // onclick event for each cell that places the current player's icon
    // makes the button unclickable
    function placeIcon(element) {
        if(currentPlayer == playerOne) {
            element.innerHTML = "X";
            element.style = "pointer-events: none";
            currentPlayer = playerTwo;
        } else {
            element.innerHTML = "O";
            element.style = "pointer-events: none";
            currentPlayer = playerOne;
        }
        checkBoard(element);
    }

    // this is a local parsable representation of the current gameboard
    let rowOne = [1, 2, 3];
    let rowTwo = [4, 5, 6];
    let rowThree = [7, 8, 39];
    // helper fxn swaps the current player around
    function opposite(currentPlayer) {
        if(currentPlayer == playerOne){
            return playerTwo;
        } else {
            return playerOne;
        }
    }
    // clear the board between rounds
    // set the current player to last round's winner
    function clearBoard() {
        rowOne = [1, 2, 3];
        rowTwo = [4, 5, 6];
        rowThree = [7, 8, 39];
        currentPlayer = opposite(currentPlayer);
    }
    // add the placed icon to the above array
    // parse arrays for row, column and diagonal matches
    // declare winner
    function declareWinner() {
        winner = opposite(currentPlayer);
        console.log(winner.name + " is the winner!");
        winner.score++;
        document.querySelector("." + winner.cssSelector + "-score").innerHTML = winner.score;
    }
    function checkBoard(element) {
        switch(element.id) {
            case "row-one":
            rowOne[element.classList[1]] = element.innerHTML;
                break;
            case "row-two":
            rowTwo[element.classList[1]] = element.innerHTML;
                break;
            case "row-three":
            rowThree[element.classList[1]] = element.innerHTML;
                break;
            default:
                alert("something went wrong");
                start();
        }
        if(rowOne[0] == rowOne[1] && rowOne[0] == rowOne[2]) {
            declareWinner();
        } else if (rowTwo[0] == rowTwo[1] && rowTwo[0] == rowTwo[2]) {
            declareWinner();
        } else if (rowThree[0] == rowThree[1] && rowThree[0] == rowThree[2]) {
            declareWinner();
        } else if (rowOne[0] == rowTwo[0] && rowOne[0] == rowThree[0]) {
            declareWinner();
        } else if (rowOne[1] == rowTwo[1] && rowOne[1] == rowThree[1]) {
            declareWinner();
        } else if (rowOne[2] == rowTwo[2] && rowOne[2] == rowThree[2]) {
            declareWinner();
        } else if (rowOne[0] == rowTwo[1] && rowOne[0] == rowThree[2]) {
            declareWinner();
        } else if (rowOne[2] == rowTwo[1] && rowOne[2] == rowThree[0]) {
            declareWinner();
        } else {
            return;
        }
    }

    function start() {
        // clear all variables for a fresh game
        clearBoard();
        playerOne = Player("", "X", "player-one");
        playerTwo = Player("", "O", "player-two");
        currentPlayer = playerOne;

        const board = document.querySelector('.board-container');
        if(board) {
            gameBoard.removeBoard();
        } 

        // display form before the beginning of every game
        form.displayForm();
        // parse names from form on click and then initiate game board
        const startBtn = document.querySelector('.start-btn');
        startBtn.onclick = function() {
            // get player names from form
            const playerOneName = document.getElementsByClassName('player-one-input')[0].value;
            const playerTwoName = document.getElementsByClassName('player-two-input')[0].value;
            // set default player names
            if(playerOneName) {
                playerOne.name = playerOneName;
            } else {
                playerOne.name = "X";
            }

            if (playerTwoName) {
                playerTwo.name = playerTwoName;
            } else {
                playerTwo.name = "O";
            }
            // remove form and initialize initial board state
            form.removeForm();
            gameBoard.displayBoard(playerOne, playerTwo);
        };

    }

    return {start, swapPlayer, placeIcon, clearBoard};
})();

game.start();