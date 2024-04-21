//get id
const smth = document.getElementById("disapear-text");
const wordAr = ["Hello!", "Welcome to my website", "Have a look around :3"];
var opacity = 0;

function fadeOut(){
    if(opacity <= 0){
        return;
    }
    opacity -= 0.03;
    smth.style.opactiy = opacity;
    requestAnimationFrame(fadeOut);
}

function fadeIn(){
    opacity += 0.01;
    smth.style.opacity = opacity;
    requestAnimationFrame(fadeIn);
    return;
}

start(0);
function start(i){
    if(wordAr.length > i){
        setTimeout(() => {
            document.getElementById("disapear-text").textContent = wordAr[i];
            start(++i);
        }, 1000); //1 second in miliseconds
    }else if(wordAr.length == i){
        start(0);
    }
}