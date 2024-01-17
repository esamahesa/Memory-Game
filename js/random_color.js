// Kita bikin function random color ya
const generateNumber = ()=>{return Math.floor((Math.random()*255));};

const generateRandomColor = ()=>{
    return `(${generateNumber()}, ${generateNumber()}, ${generateNumber()})`;
};

let color = [generateRandomColor(), generateRandomColor(), generateRandomColor(), generateRandomColor(), generateRandomColor(), generateRandomColor(), generateRandomColor(), generateRandomColor()];

const generateColor = (color)=>{
    color = color.concat(color);
    for(let i = color.length - 1; i>0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [color[i], color[j]] = [color[j], color[i]];
    };
    for(let i = 0; i<memoryBacks.length; i++){
        memoryBacks[i].style.backgroundColor = `rgb${color[i]}`;
    };
};