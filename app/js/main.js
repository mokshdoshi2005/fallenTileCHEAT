import Grid, { regenerateblock } from "./gameboard.js";
import { GRID_SIZE } from "./gameboard.js";
import { Random } from "./gameboard.js";
import { Falling_blocks } from "./game-logic.js";
import { playing } from "./game-logic.js";
import { LocatePlayer } from "./game-logic.js";
import { reappearingBlock2 } from "./game-logic.js";

const Gameboard = document.getElementById('GameBoard');
console.log(Gameboard)
const grid = new Grid(Gameboard)

const GAMEPADUP = document.querySelector('#GAMEPAD-UP');
const GAMEPADRIGHT = document.querySelector('#GAMEPAD-RIGHT');
const GAMEPADLEFT = document.querySelector('#GAMEPAD-LEFT');
const GAMEPADDOWN = document.querySelector('#GAMEPAD-DOWN');

var cheatNumber = Math.floor(Math.random() * 4)
console.log(cheatNumber)


let Mod_status = false
console.log('a')
const MODS = document.querySelectorAll('#mod')
MODS.forEach(element => {
    element.addEventListener('click', e=> {
        console.log('clicked mod')
        if (!Mod_status) {
            Mod_status = true
            console.log('Mod_stautus is new true')
            
        } else {
            Mod_status = false
        }
    })
});

let fallen__block = document.querySelectorAll('.cell');
let Fallen_Ary = []
var FallingTiles = []
let score_board = document.querySelector('.score-board');
let GeneratableBlock = false

// //Moblie only 
if (screen.width <= 800) {
    GAMEPADUP.addEventListener('click' ,() => {
        var player = document.querySelector('.player')
        let Ary = LocatePlayer()
        let validArg = validMove(parseInt(Ary[0]),(parseInt(Ary[1]) - 1))
        if (Ary[1] > 0 && validArg){
            moveup(player)
            ALLGAMERUN()
        }
    });
    
    GAMEPADLEFT.addEventListener('click' ,() => {
        var player = document.querySelector('.player')
        let Ary = LocatePlayer()
        let validArg = validMove(parseInt(Ary[0]) - 1,parseInt(Ary[1]))
        if (Ary[0] > 0 && validArg){
            moveleft(player)
            ALLGAMERUN()
        }
    });
    
    GAMEPADRIGHT.addEventListener('click' ,() => {
        var player = document.querySelector('.player')
        let Ary = LocatePlayer()
        let validArg = validMove(parseInt(Ary[0]) + 1,parseInt(Ary[1]))
        if (Ary[0] < (GRID_SIZE - 1) && validArg){
            moveright(player)
            ALLGAMERUN()
        }
    });
    
    GAMEPADDOWN.addEventListener('click' ,() => {
        var player = document.querySelector('.player')
        let Ary = LocatePlayer()
        let validArg = validMove(parseInt(Ary[0]),parseInt(Ary[1]) + 1)
        if (Ary[1] < (GRID_SIZE - 1) && validArg){
            movedown(player)
            ALLGAMERUN()
        }
    });
}


// // USER INPUT
document.addEventListener("keypress", e => {
    console.log(e.key)
    // left = 37
    // up = 38      keycode
    // right = 39
    // down = 40
    if (e.key == 'w' || e.key === 'W' || e.key === "ArrowUp" || e.key === "8") {
        var player = document.querySelector('.player')
        let Ary = LocatePlayer()
        let validArg = validMove(parseInt(Ary[0]),(parseInt(Ary[1]) - 1))
        if (Ary[1] > 0 && validArg){
            moveup(player)
            ALLGAMERUN()
        }
    }
    else if (e.key == 's' || e.key === "ArrowDown" || e.key === "S" || e.key === "2") {
        var player = document.querySelector('.player')
        let Ary = LocatePlayer()
        let validArg = validMove(parseInt(Ary[0]),parseInt(Ary[1]) + 1)
        if (Ary[1] < (GRID_SIZE - 1) && validArg){
            movedown(player)
            ALLGAMERUN()
        }
    }
    else if (e.key == 'a' || e.key == "ArrowLeft" || e.key === "A" || e.key === "4") {
        var player = document.querySelector('.player')
        let Ary = LocatePlayer()
        let validArg = validMove(parseInt(Ary[0]) - 1,parseInt(Ary[1]))
        if (Ary[0] > 0 && validArg){
            moveleft(player)
            ALLGAMERUN()
        }
    }
    else if (e.key == 'd' || e.key == "ArrowRight" || e.key === "D" || e.key === "6") {
        var player = document.querySelector('.player')
        let Ary = LocatePlayer()
        let validArg = validMove(parseInt(Ary[0]) + 1,parseInt(Ary[1]))
        if (Ary[0] < (GRID_SIZE - 1) && validArg){
            moveright(player)
            ALLGAMERUN()
        }
    };
});

// // movement functions
function moveup(player) {
    var x = player.dataset.x
    var y = player.dataset.y
    let new_y = parseInt(y) - 1
    player.style.setProperty("--y",new_y);
    player.dataset.y = new_y       
}
function moveleft(player) {
    var x = player.dataset.x
    var y = player.dataset.y
    let new_x = parseInt(x) - 1 
    player.style.setProperty("--x",new_x);
    player.dataset.x = new_x
}
function movedown(player) {
    var x = player.dataset.x
    var y = player.dataset.y
    let new_y = parseInt(y) + 1
    player.style.setProperty("--y",new_y);
    player.dataset.y = new_y       
}
function moveright(player) {
    var x = player.dataset.x
    var y = player.dataset.y
    let new_x = parseInt(x) + 1 
    player.style.setProperty("--x",new_x);
    player.dataset.x = new_x
}

function updateClass(player, newPlayer){
    player.classList.remove('.player')
    newPlayer.classList.add(".player")
}

function updateScore() {
    if(playing === true) {
        score_board.dataset.score = parseInt(score_board.dataset.score) + 1;
        score_board.innerHTML = score_board.dataset.score
    }
};

function validMove(x,y) {
    // x = parseInt(x)
    // y = parseInt(y)
    let tileNumber = (GRID_SIZE * y) + x;
    if (FallingTiles.includes(tileNumber)) {
        return false
    } else {
        return true
    }
}

function ALLGAMERUN() {
    mods(Mod_status)
    updateScore()
    GeneratableBlock = reappearingBlock2(FallingTiles)
    console.log(GeneratableBlock)
    if (GeneratableBlock !== true) {
        Falling_blocks(Fallen_Ary,fallen__block,FallingTiles)
    }
    RESET()
}

function RESET() {
    let fallenTile = document.querySelectorAll('.fallen');

    if (fallenTile.length === (GRID_SIZE * (GRID_SIZE - 2))) {
        console.log('generating ALL')
        for (let index = 0; index < fallenTile.length; index++) {
            const block = fallenTile[index];
            regenerateblock(block);   
        }
        FallingTiles = []
        Fallen_Ary = []
    }
        
}

function mods(e) {
    if (!e) {
        
        if (parseInt(score_board.dataset.score) == cheatNumber){
            let Ary = LocatePlayer()
            let gameOVER__Sound_effect = document.querySelector("audio",'#game-over-audio');
            gameOVER__Sound_effect.src = 'https://fallingtiles.pages.dev/resources/mixkit-arcade-retro-game-over-213.wav';
            
            let gameOVER = document.querySelector(".OVER");
            gameOVER.style.width = "70vw";
            // gameOVER.style.height = "70vh";
            gameOVER.style.display = "grid"
            gameOVER.showModal()
            
            console.log('GAME OVER')
            playing = false
            Falling_blocks(Fallen_Ary,fallen__block,FallingTiles,Ary[0],Ary[1])
        }
    }
}
