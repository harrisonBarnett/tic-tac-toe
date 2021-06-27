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
            let cellClass = element.className;
            for(i = 1; i <= cells; i++) {
                let cell = document.createElement('div');
                cell.className = "cell " + cellClass + "-" + i;
                element.append(cell);
            }
        };
        function clearBoard() {
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.innerHTML = '';
            });
            console.log('cleared the current board');
        }
        // append rows
        const rowOne = document.createElement('div');
        rowOne.className = "row row-one";
        addCell(rowOne, 3);
        const rowTwo = document.createElement('div');
        rowTwo.className = "row row-two";
        addCell(rowTwo, 3);
        const rowThree = document.createElement('div');
        rowThree.className = "row row-three";
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
        player1Score.classname = "player-one-score";
        player1Score.innerHTML = "0";
        player1.append(player1Score);

        const player2 = document.createElement('div');
        player2.className = "player-two-container";
        const player2Title = document.createElement('p');
        player2Title.className = "player-two-title";
        player2Title.innerHTML = p2.name;
        player2.append(player2Title);
        const player2Score = document.createElement('p');
        player2Score.classname = "player-two-score";
        player2Score.innerHTML = "0";
        player2.append(player2Score);

        playerZone.append(player1, player2);
        board.append(playerZone);

    };

    function removeBoard() {
        const board = document.querySelector('.board-container');
        body.removeChild(board);
    }

    // remove setup form
    // display the grid
    // set event listener for cell behavior onclick
    function initCells(p1, p2) {
        form.removeForm();
        displayBoard(p1, p2);
        document.addEventListener('click', function(e) {
            if(e.target.classList.contains('cell')) {
                e.target.innerText = p1.icon;
            }
        });
        // quit button resets the entire game state by running 
        // start() from the beginning
        const quitBtn = document.querySelector('.board-quit-btn');
        quitBtn.onclick = function() {game.start()};
    }
    
    return {displayBoard, initCells, removeBoard};
})();

// player object
const Player = function(name, icon) {
    this.name = name;
    this.icon = icon;
    this.score = 0;
    const playerInfo = () => console.log(name, score);
    return {name, icon, score, playerInfo};
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
    function start() {
        form.displayForm();
        const board = document.querySelector('.board-container');
        if(board) {
            gameBoard.removeBoard();
        } 
        // initialize default player state
        let playerOne = Player("", "");
        let playerTwo = Player("", "");
        
        
        const startBtn = document.querySelector('.start-btn');
        startBtn.onclick = function() {
            // get chosen player name from form
            const playerOneName = document.getElementsByClassName('player-one-input')[0].value;
            const playerTwoName = document.getElementsByClassName('player-two-input')[0].value;

            if(playerOneName) {
                playerOne.name = playerOneName;
            } else {
                playerOne.name = "X";
            }
            playerOne.icon = 'X';

            if (playerTwoName) {
                playerTwo.name = playerTwoName;
            } else {
                playerTwo.name = "O";
            }
            playerTwo.icon = 'O';

            console.log(playerOne);
            console.log(playerTwo);

            gameBoard.initCells(playerOne, playerTwo)
        };

    }

    return {start};
})();
