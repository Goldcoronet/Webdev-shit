//Calculator program
//func : appendToDisplay, calculate, clearDisplay

const display = document.getElementById("display");

function appendToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value = "";
}

function calculate(){
    try{
    display.value= eval(display.value);
    }
    catch(error){
        document.getElementById("errorSound").play();
        let messages = [
            "No..",
            "No",
            "What are you doing??",
            "wut r u doin",
            "stopp",
            "no-",
            "ahhhhhhhh",
            "*painful noises*",
            "*inaudible*",
            "*screams*",
            "more screams",
            "aahhhhhhhhhhhhhhh",
            "hhhhhhhhhhhhhhhh",
            ""
        ];
        let index = 0;

        const intervalId = setInterval(() => {
            display.value = messages[index++];
            if (index >= messages.length) {
                clearInterval(intervalId);
            }
        }, 700);

         setTimeout(() => {
            const video = document.getElementById("errorVideo");
            video.style.display = "block";
             video.playbackRate = 1.5;
            video.play();

             video.onended = () => {
                video.style.display = "none";
            };
        }, 10000);
    }
}