
const gameBoard = (() => {
    const board = document.querySelector('.board-container');

    const displayBoard = () => {
        const addCell = (element, cells) => {
            let cellClass = element.className;
            for(i = 1; i <= cells; i++) {
                let cell = document.createElement('div');
                cell.className = "cell " + cellClass + "-" + i;
                element.append(cell);
            }
        };

        const rowOne = document.createElement('div');
        rowOne.className = "row-one";
        addCell(rowOne, 3);
        const rowTwo = document.createElement('div');
        rowTwo.className = "row-two";
        addCell(rowTwo, 3);
        const rowThree = document.createElement('div');
        rowThree.className = "row-three";
        addCell(rowThree, 3);
        board.append(rowOne);
        board.append(rowTwo);
        board.append(rowThree);
    };

    return {displayBoard};
})();
