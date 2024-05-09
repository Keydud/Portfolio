//Insert the code for image expand
var str = '<div class="popup-img"><button><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button><img src="../../resources/visualarts/rand/juan-laseter-rapscalion.jpg" alt=""></div>';
const body = document.body;
body.insertAdjacentHTML('beforeend', str);

//Popup img styling//
document.querySelector('.popup-img').style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .8);
    backdrop-filter: blur(4px);
    z-index: 900;
    display: none;
    justify-content: center;
    align-items: center;`;

document.querySelector('.popup-img img').style.cssText = `
    width: auto;
    height: 80vh; 
    `;

document.querySelector('.popup-img button').style.cssText = `
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    position: fixed;
    z-index: +1;
    top: 40px;
    right: 40px;
    background-color: var(--background-primary);
    filter: drop-shadow(0 0.05rem .3rem rgb(203, 203, 203));
    border: none;
    opacity: 1 
    `;

document.querySelector('.popup-img button svg').style.cssText = `
    transform: translate( 0px, 2px);
    `;

document.querySelectorAll('.process-images-of-final-work img').forEach(image =>{
    image.onclick = () =>{
        document.querySelector('.popup-img').style.display = 'flex';
        document.querySelector('.popup-img img').src = image.getAttribute('src');
}});

document.querySelector('.popup-img button').onclick = () =>{
    document.querySelector('.popup-img').style.display = 'none';
}