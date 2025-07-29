let choice = 3;
const max=3;
const display = document.getElementById("text")
function choose(input){
    choice = input;
    let comp = Math.floor(Math.random()*max)
    if(input==0){
        if(comp==0){
            display.textContent="draw"
        }
        if(comp==1){
            display.textContent="lost"
        }
        if(comp==2){
            display.textContent="win"
        }
    }
    if(input==1){
        if(comp==1){
            display.textContent="draw"
        }
        if(comp==2){
            display.textContent="lost"
        }
        if(comp==0){
            display.textContent="win"
        }
    }
    if(input==2){
        if(comp==2){
            display.textContent="draw"
        }
        if(comp==0){
            display.textContent="lost"
        }
        if(comp==1){
            display.textContent="win"
        }
    }
}
