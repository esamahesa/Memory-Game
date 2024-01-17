const leftSection = document.querySelector('.left-section');
const colorLeft = document.querySelectorAll('.color-left');

const generateSection = (color)=>{
    for(let i = 0; i<color.length; i++){
        let divElement = document.createElement('div');
        divElement.classList.add('color-left');
        leftSection.appendChild(divElement);

        divElement.style.backgroundColor = `rgb${color[i]}`;
    };
};

const checkColor = (colorMatched)=>{
    let theColor;
    let colorArray = [];
    const colorLeft = document.querySelectorAll('.color-left');
    for(let i = 0; i<colorLeft.length; i++){
        theColor = window.getComputedStyle(colorLeft[i]).backgroundColor;
        colorArray.push(theColor);
    };
    for(let i = 0; i<colorArray.length; i++){
        if(colorArray.indexOf(colorMatched[i]) !== -1){
            colorLeft[colorArray.indexOf(colorMatched[i])].style.display = 'none';
            sumDisplayNone++;
        };
    };
    if(sumDisplayNone === 36){
        for(let i = 0; i<colorLeft.length; i++){
            colorLeft[i].remove();
        };
        sumDisplayNone = 0;
    };
};