

// insantiates the gameboard, including board reset
const gameBoard = (() => {
    const board = document.querySelector('.board-container');

    const displayBoard = () => {
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
            // remove innerHTML of all cells
            // const cells = document.querySelectorAll('.cell');
            // cells.forEach(cell) => {
            //     cell.remove();
            // }
            console.log('cleared the board');
        
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
        // create/append reset button
        const btnContainer = document.createElement('div');
        btnContainer.className = "board-btn-container";
        const resetBtn = document.createElement('button');
        resetBtn.className = "board-reset-btn";
        resetBtn.innerHTML = "RESET";
        resetBtn.onclick = function() {clearBoard()};
        btnContainer.append(resetBtn);
        board.append(btnContainer);
        
    };

    return {displayBoard};
})();

gameBoard.displayBoard();

const displayController = (() => {
    // set event listener to react to player clicks
    document.addEventListener('click', function(e) {
        if(e.target.classList.contains('cell')) {
            e.target.innerHTML = "<span>X</span>";
        }
    });
})();



