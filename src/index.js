import './styles/index.css'

let options = document.querySelectorAll(".dialogue__option")
options.forEach((element) => {
    element.onmouseenter = function(){
        playSound("sound__focus");
    }
    element.onmouseout = function(){
        stopSound("sound__focus");
    }
    element.onclick = function(){
        playSound("sound__ok");
    }
})

function playSound(soundName){
    let sound = document.getElementById(soundName);
    sound.currentTime = 0;
    sound.play();
}

function stopSound(soundName){
    let sound = document.getElementById(soundName);
    sound.pause();
    sound.currentTime = 0;
}
