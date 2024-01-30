const scoreObjectValue = {
    "Very Easy": {
        "RGB Color": 1,
        "Linear Gradient": 2,
        "Radial Gradient": 3,
        "Conic Gradient": 4
    }, 
    "Easy": {
        "RGB Color": 2,
        "Linear Gradient": 3,
        "Radial Gradient": 4,
        "Conic Gradient": 5
    }, 
    "Medium": {
        "RGB Color": 3,
        "Linear Gradient": 4,
        "Radial Gradient": 5,
        "Conic Gradient": 6
    }, 
    "Hard": {
        "RGB Color": 4,
        "Linear Gradient": 5,
        "Radial Gradient": 6,
        "Conic Gradient": 7
    }, 
    "Fucking Hard": {
        "RGB Color": 5,
        "Linear Gradient": 6,
        "Radial Gradient": 7,
        "Conic Gradient": 8
    }
};

// lets make a function that counting a total score
const scoreCounting = (scoreObjectValue, arrayColorTracker, timeLeft)=>{
    let difficulty = getDifficulty(document.querySelectorAll('.difficulty-option'))[0];
    let objectDifficulty = scoreObjectValue[difficulty];
    let countScore = 0;
    for(let color of arrayColorTracker){
        for(let colorProperty in objectDifficulty){
            if(color === colorProperty){
                // so add the color value to the countscore
                countScore += objectDifficulty[colorProperty];
            };
        };
    };

    return countScore + timeLeft;
};

const getValueInScoreObject = (scoreObject, arrayPoint = [])=>{
    for(let property in scoreObject){
        arrayPoint.push(scoreObject[property]["Point"]);
    };

    return arrayPoint;
};

const checkHighScore = (scoreObject, highScoreObject)=>{
    let highScore = highScoreObject["High Score"];
    let scoreArray = getValueInScoreObject(scoreObject);

    for(let i = 0; i < scoreArray.length - 1; i++){
        if(scoreArray[i] > highScore){
            highScore = scoreArray[i];
        };
    };

    if(scoreArray[scoreArray.length - 1] > highScore){
        let index = 0;
        for(let indexScore in scoreObject){
            for(let property in indexScore){
                if(scoreObject[indexScore]["Point"] === scoreArray[scoreArray.length - 1]){
                    index = indexScore;
                };
            };
        };

        highScoreObject["High Score"] = scoreObject[index]["Point"];
        highScoreObject["Difficulty"] = scoreObject[index]["Difficulty"];
        highScoreObject["Mode"] = scoreObject[index]["Mode"];
        highScoreObject["Time Start"] = scoreObject[index]["Time Start"];
        highScoreObject["Time Pass"] = scoreObject[index]["Time Pass"];
        highScoreObject["Time Left"] = scoreObject[index]["Time Left"];
        highScoreObject["Color"] = scoreObject[index]["Color"];

        // Is new highscore true!
        highScoreObject["Is New High Score"] = true;

        return highScoreObject;
    } else{
        // Is new highscore false!
        highScoreObject["Is New High Score"] = false;

        return highScoreObject;
    };
};

// lets make a function that can print the score and the high score to the html document
const printTheHighScore = (difficulty, point)=>{
    if(!document.querySelector('.high-score')){
        // if the element doesnt exist so we create it instead
        const scoreAndHighScoreWrapper = document.querySelector('.score-and-high-score-wrapper');
        const divHighScore = document.createElement('div');

        divHighScore.className = "high-score";
        divHighScore.innerHTML = `<span class="bold">High Score</span>: <span class="difficulty-score bold">${difficulty}</span> => ${point} Point`;
        scoreAndHighScoreWrapper.appendChild(divHighScore);
    } else{
        // if the element does exist, we change the value of difficulty and the point
        const divHighScore = document.querySelector('.high-score');
        divHighScore.innerHTML = `<span class="bold">High Score</span>: <span class="difficulty-score bold">${difficulty}</span> => ${point} Point`;
    };
};

const printTheScoreHistory = (difficulty, point, mode, dataIndex = [])=>{
    if(!document.querySelector('.score-history-container')){
        const scoreAndHighScoreWrapper = document.querySelector('.score-and-high-score-wrapper');
        const scoreHistoryContainer = document.createElement('div');
        scoreAndHighScoreWrapper.appendChild(scoreHistoryContainer);
        scoreHistoryContainer.className = "score-history-container";

        const scoreSection = document.createElement('div');
        scoreSection.className = "score-section";

        const unorderedList = document.createElement('ul');
        unorderedList.setAttribute('id', 'score-list');

        const list = document.createElement('li');

        scoreHistoryContainer.appendChild(scoreSection);
        scoreSection.appendChild(unorderedList);
        unorderedList.appendChild(list);
        
        list.innerHTML = `Score: <span class="difficulty-score bold">${difficulty}</span> => ${point} Point => ${mode}`;

        // set the data index 
        for(let i = 1; i <= document.getElementById('score-list').children.length; i++) dataIndex.push(i);
        list.setAttribute('data-index', dataIndex[dataIndex.length - 1]);
    } else{
        const unorderedList = document.getElementById('score-list');
        const list = document.createElement('li');

        unorderedList.appendChild(list);
        list.innerHTML = `Score: <span class="difficulty-score bold">${difficulty}</span> => ${point} Point => ${mode}`;

        // set the data index 
        for(let i = 1; i <= document.getElementById('score-list').children.length; i++) dataIndex.push(i);
        list.setAttribute('data-index', dataIndex[dataIndex.length - 1]);
    };
};

// lets make a function that can handle the score section!
let isScoreOpen = false;
const openScoreHistory = ()=>{
    const elementScoreWrapper = document.querySelector('.score-and-high-score-wrapper');
    if(!isScoreOpen && document.querySelector('.score-icon-wrapper').dataset.disabled === "false"){
        elementScoreWrapper.style.display = 'block';
        isScoreOpen = !isScoreOpen;
    } else{
        elementScoreWrapper.style.display = 'none';
        isScoreOpen = !isScoreOpen;
    };
};

const clickWindowWhenScoreDisplay = (e)=>{
    if(!isScoreOpen) return;
    
    const objectOfScoreElement = {
        "Icon Section": {
            "Score Icon Wrapper": document.querySelector('.score-icon-wrapper'),
            "Score Icon": document.querySelector('.score-icon'),
            "SVG": document.querySelector('.score-icon svg'),
            "Rect": document.querySelector('.score-icon svg rect'),
            "First Path": document.querySelectorAll('.score-icon svg path')[0],
            "Second Path": document.querySelectorAll('.score-icon svg path')[1],
            "Score and High Score Wrapper": document.querySelector('.score-and-high-score-wrapper')
        }, 
        "Display Score Section": {}
    };

    let arrayOfElement = getAllNodes(objectOfScoreElement["Icon Section"]["Score and High Score Wrapper"]);
    for(let i = 0; i < arrayOfElement.length; i++){
        objectOfScoreElement["Display Score Section"][i] = arrayOfElement[i];
        if(objectOfScoreElement["Display Score Section"][i].nodeName === "#text"){
            delete objectOfScoreElement["Display Score Section"][i];
        };
    };

    for(let section in objectOfScoreElement){
        for(let element in objectOfScoreElement[section]){{
            if(isScoreOpen && e.target === objectOfScoreElement[section][element]) return;
        }};
    };

    objectOfScoreElement["Icon Section"]["Score and High Score Wrapper"].style.display = 'none';
    isScoreOpen = !isScoreOpen;
};

const getAllNodes = (parent, arr = [])=>{
    arr.push(parent);
    let children = parent.childNodes;
    for(let i = 0; i < children.length; i++){
        getAllNodes(children[i], arr);
    };

    return arr;
};

// lets get the score icon element, and add an event when its got click!
const scoreIcon = document.querySelector('.score-icon-wrapper');
scoreIcon.addEventListener('click', openScoreHistory);
window.addEventListener('click', clickWindowWhenScoreDisplay);
