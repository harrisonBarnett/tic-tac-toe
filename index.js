// insantiates the gameboard, including board reset
const gameBoard = (() => {
    const body = document.querySelector('body');

    // display the grid
    const displayBoard = () => {
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
    };

    function removeBoard() {
        const board = document.querySelector('.board-container');
        body.removeChild(board);
    }

    // remove setup form
    // display the grid
    // set event listener for cell behavior onclick
    function initCells() {
        form.removeForm();
        displayBoard();
        document.addEventListener('click', function(e) {
            if(e.target.classList.contains('cell')) {
                e.target.innerHTML = "<span>X</span>";
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
    const playerInfo = () => console.log(name, score);
    return {name, icon, playerInfo};
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
            
            // options container (X or O player pieces)
            const optionsContainer = document.createElement('div');
            optionsContainer.className = playerCSS + "-options";

            const optionX = document.createElement('input');
            optionX.type = 'checkbox';
            optionX.className = playerCSS + "-optionX";
            optionX.name = playerCSS + "-optionX";
            optionX.id = playerCSS + "-optionX";
            const optionXlabel = document.createElement('label');
            optionXlabel.htmlFor = playerCSS + "-optionX";
            optionXlabel.innerHTML = "X";
            optionsContainer.append(optionXlabel, optionX);

            const optionO = document.createElement('input');
            optionO.type = 'checkbox';
            optionO.className = playerCSS + "-optionO";
            optionO.name = playerCSS + "-optionO";
            optionO.id = playerCSS + "-optionO";
            const optionOlabel = document.createElement('label');
            optionOlabel.htmlFor = playerCSS + "-optionO";
            optionOlabel.innerHTML = "O";
            optionsContainer.append(optionOlabel, optionO);


            playerContainer.append(nameLabel, name, optionsContainer);
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
        // get chosen player name from form
        const playerOneName = document.getElementsByClassName('player-one-input')[0].value;
        const playerTwoName = document.getElementsByClassName('player-two-input')[0].value;

        playerOne.name = playerOneName;
        playerOne.icon = 'X';

        playerTwo.name = playerTwoName;
        playerTwo.icon = 'O';
        
        const startBtn = document.querySelector('.start-btn');
        startBtn.onclick = function() {gameBoard.initCells()};

    }

    return {start};
})();
