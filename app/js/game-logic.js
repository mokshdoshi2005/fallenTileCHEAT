import { Random } from "./gameboard.js";
import { GRID_SIZE } from "./gameboard.js";
import { regenerateblock } from "./gameboard.js";

export var playing = true;

const Start_Button = document.querySelector('.START');
const HeroPage_wrapper = document.querySelector("ui")
Start_Button.addEventListener("click", e => {
    console.log("STARTED")
   HeroPage_wrapper.classList.add('STARTED')
    LocatePlayer();
});

export function LocatePlayer() {
    let Ary = []
    let player = document.querySelector('.player')
    var x = player.dataset.x
    var y = player.dataset.y
    console.log('player at',x, y)
    Ary.push(x)
    Ary.push(y)
    return Ary
}

function PlayerLost(playerLocationARY,fallen__blockARY) {
    if (playerLocationARY[0] == fallen__blockARY[0] && playerLocationARY[1] == fallen__blockARY[1]) {
        // let player = document.querySelector('.player')
        // player.style.animation = 'Fall 2s ease 500ms forwards';
        let gameOVER__Sound_effect = document.querySelector("audio",'#game-over-audio');
        gameOVER__Sound_effect.src = 'https://fallingtiles.pages.dev/resources/mixkit-arcade-retro-game-over-213.wav';
        
        let gameOVER = document.querySelector(".OVER");
        gameOVER.style.width = "70vw";
        // gameOVER.style.height = "70vh";
        gameOVER.style.display = "grid"
        gameOVER.showModal()
        
        console.log('GAME OVER')
        playing = false
    }
}

// PlayerLost()

export function Falling_blocks(Fallen_Ary,listOfCells,ListOfFallingTiles,x=undefined,y=undefined) {
    let random = Random()
    let fallen__x = x || random % GRID_SIZE;
    let fallen__y = y || Math.floor(random / GRID_SIZE);
    let fallen_location = [fallen__x,fallen__y]
    let c = 0
    // // new saving random rather than fallen__x and fallen__y

    
    while (ListOfFallingTiles.includes(random)){
        random = Random()
        console.log('new random is',random)
        fallen__x = random % GRID_SIZE;
        fallen__y = Math.floor(random / GRID_SIZE);
        c++
        if (c === 1){
            Fallen_Ary.pop()
        }
    }

    let xy = LocatePlayer()
    
    cellIsFalling(fallen__x,fallen__y,listOfCells)
    PlayerLost(xy , fallen_location)
    ListOfFallingTiles.push(random)
    Fallen_Ary.push(fallen_location)
}


// function UpdateFallen_Ary([fallen__x,fallen__y],Ary) {
//     for (var i = 0; i < Ary.length; i++) {
//         if (Ary[i] === [fallen__x,fallen__y]) {
//             var spliced = Ary.splice(i, 1);
//             console.log(spliced)
//             // document.write("Removed element: " + spliced + "<br>");
//             // document.write("Remaining elements: " + arr);
//         } //if (Ary[i] === []){
//         //     console.log('')
//         // }
//     }
// }

function cellIsFalling(fallen__x,fallen__y,listOfCells){
    for (let loop= 0; loop < listOfCells.length; loop++){
        var data_x = listOfCells[loop].dataset.x
        var data_y = listOfCells[loop].dataset.y
        
        // console.log('here',data_x,data_y,fallen__x,fallen__y)

        if (data_x == fallen__x && data_y == fallen__y) {
            console.log('fallen',listOfCells[loop])
            listOfCells[loop].style.animation = "";
            listOfCells[loop].classList.add("fallen")
        }
    }
}

export function reappearingBlock2 (listOfFallens) {
    var GeneratableBlock = false
    let random = Random()
    let x = random % GRID_SIZE;
    let y = Math.floor(random / GRID_SIZE);
    let block = document.querySelector(`[data-x="${x}"],[data-y="${y}"]`)
    if ( block.classList.contains('fallen')){
        GeneratableBlock = true
        regenerateblock(block)
        console.log(listOfFallens)
        for (let index = 0; index < listOfFallens.length; index++) {
            const element = listOfFallens[index];
            if(element == random) {
                var spliced = listOfFallens.splice(index,1)
                console.log(listOfFallens)
            }
             
        }
    }
    return GeneratableBlock
}
