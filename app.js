let game = {
    newGame(){
        game = {
            ...game,
            turn: 0,
            currentPlayer: 'X',
            board: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            endGame: false
        }
    },
    print(){
        console.log(`
            ${game.board[6]} | ${game.board[7]} | ${game.board[8]}
            ---------
            ${game.board[3]} | ${game.board[4]} | ${game.board[5]}
            ---------
            ${game.board[0]} | ${game.board[1]} | ${game.board[2]}
        `);
    },
    changePlayer(){
        game.currentPlayer = game.currentPlayer == 'X' ? 'O' : 'X';
    },
    move(position){
        if(position > 0 && position < 10 && typeof game.board[position-1] === 'number'){
            game.board[position-1] = game.currentPlayer;
            game.turn++;
            return true;
        }
        return false;
    },
    compare: (a, b, c) => game.board[a] === game.board[b] && game.board[a] === game.board[c],
    winner(){
        return (
            game.compare(0, 1, 2) ||
            game.compare(3, 4, 5) ||
            game.compare(6, 7, 8) ||
            game.compare(0, 3, 6) ||
            game.compare(1, 4, 7) ||
            game.compare(2, 5, 8) ||
            game.compare(0, 4, 8) ||
            game.compare(2, 4, 6) 
        );
    },
    gameOver(){
        const hasWinner = game.winner();
        if(hasWinner){
            console.clear();
            game.print();
            game.changePlayer();
            console.log(`${game.currentPlayer} wins`);
            return true;
        }else if(game.turn >= 9){
            console.clear();
            game.print();
            console.log("Nobody wins");
            return true;
        }
        return false;
    }
};

//below, changes for nodejs

const stdin = process.openStdin();

game.newGame();
console.clear;
game.print();
console.log(`Current Player: ${game.currentPlayer}`);

stdin.addListener('data', line => {
    const position = parseInt(line.toString());

    if(game.endGame || !position){
        stdin.pause();
    }else{
        if(game.move(position)){
            game.changePlayer();
        }
        game.endGame = game.gameOver();
        if(!game.endGame){
            console.clear();
            game.print();
            console.log(`Current Player: ${game.currentPlayer}`);
        }else{
            process.exit();
        }
    }
})
