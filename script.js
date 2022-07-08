
    

    var game = (function() {

        const cellElements = document.querySelectorAll('[data-index]');
        const container = document.getElementById("container");
        const winningMessageElement = document.getElementById("endgame");
        const winningMessageTextElement = document.querySelector('[data-end-game-text]')
        const restartBtn = document.getElementById('restart')
        const X_class = 'x';
        const O_class = 'o';
        let circleTurn
        const win_combos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [0, 4, 8],
            [2, 4, 6],
        ]


        function play(){
                
                cellElements.forEach(cell => {
                cell.addEventListener('click', handleClick, {once: true})

        

                function handleClick(e) {
                    const cell = e.target
                    const currentClass = circleTurn ? O_class : X_class
                    placemark(cell, currentClass)
                    if (checkWin(currentClass)){
                        endGame(false)
                    } else if (isdraw()) {
                        endGame(true)
                    } else {
                        swapTurns()
                    setContainerHoverClass()
                    }
                    
                }
                function endGame(draw){
                    if (draw) {
                        winningMessageTextElement.innerHTML ="Draw!"
                    } else {
                        winningMessageTextElement.innerHTML= `${circleTurn ? "O's" : "x's"} Wins!`
                    }
                    winningMessageElement.classList.add('show')
                }

                function isdraw() {
                    return [...cellElements].every(cell => {
                        return cell.classList.contains(X_class) || cell.classList.contains(O_class)
                    })
                }

                function placemark(cell, currentClass){
                    cell.classList.add(currentClass)
                }

                function swapTurns(){
                    circleTurn = !circleTurn
                }
                function setContainerHoverClass(){
                    container.classList.remove(X_class)
                    container.classList.remove(O_class)
                    if (circleTurn) {
                        container.classList.add(O_class)
                    } else {
                        container.classList.add(X_class)
                    }
                }
                function checkWin(currentClass) {
                    return win_combos.some(combination =>{
                        return combination.every(index =>{
                            return cellElements[index].classList.contains(currentClass)
                        })
                        })
                }
            });
        }
        return {
            play:play,
            cellElements:cellElements,
            X_class:X_class,
            O_class:O_class,
            circleTurn:circleTurn,
        }
    })();

game.play();
