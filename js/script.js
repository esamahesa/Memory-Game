// Make the element function
function printElement(amountOfElement){
    const container = document.querySelector('.container');

    let i = 0;
    let makeMemoryInnersInterval = setInterval(() => {
        if(i >= amountOfElement - 1) clearInterval(makeMemoryInnersInterval);
        i++;

        // Create element
        const memoryInner = document.createElement('div');
        const memoryFront = document.createElement('div');
        const memoryBack = document.createElement('div');

        // Append class
        memoryInner.classList.add('memory-inners');
        memoryFront.classList.add('memory-fronts');
        memoryBack.classList.add('memory-backs');

        // Append child
        container.appendChild(memoryInner);
        memoryInner.appendChild(memoryFront);
        memoryInner.appendChild(memoryBack);
    }, 100);
};

// Others
let isGamePlaying = false;
let isGameOver = false;

// define the 
let scoreObject = {};
let highScoreObject = {
    "High Score": 0,
    "Difficulty": null,
    "Mode": null,
    "Time Start": null,
    "Time Pass": null,
    "Time Left": null,
    "Color": null,
    "Is New High Score": null
};

// When user click start button, so all the card open, then after 3s the card close again
const openingRotatingCard = (memoryInners)=>{
    memoryInners.forEach(memoryInner => {
        memoryInner.style.transform = 'rotateY(180deg)';
    });

    setTimeout(()=>{
        memoryInners.forEach(memoryInner => {
            memoryInner.style.transform = 'rotateY(0deg)';
        });
    }, 3000);
};

// make a function that will track the color type
const trackingColorType = (arrayMatchColor)=>{
    let everyColorTypeArray = [];

    for(let color of arrayMatchColor){
        if(color.indexOf('conic-gradient') !== -1){
            everyColorTypeArray.push('Conic Gradient');
        } else if(color.indexOf('radial-gradient') !== -1){
            everyColorTypeArray.push('Radial Gradient');
        } else if(color.indexOf('linear-gradient') !== -1){
            everyColorTypeArray.push('Linear Gradient');
        } else{
            everyColorTypeArray.push('RGB Color');
        };
    };

    return everyColorTypeArray;
};

// make a function to open then checking the color
const openToCheckTheColor = (memoryInner, memoryBack, arrCollectCard, arrCollectColor)=>{
    let getColor = window.getComputedStyle(memoryBack, null).getPropertyValue('background');
    memoryInner.style.transform = 'rotateY(180deg)';
    arrCollectCard.push(memoryInner);
    arrCollectColor.push(getColor);
};

// make a function that will surpass some condition
const conditionLogic = (memoryInner, arrCollectMemory)=>{
    if(
        memoryInner.style.transform !== 'rotateY(180deg)' &&
        !memoryInner.classList.contains('match') &&
        arrCollectMemory.length < 2 && !isGameOver &&
        isGamePlaying){
        return false;
    };
    return true;
};

// make a function that will handle the event
const handle = (memoryInner, memoryBack, arrColectMemory, arrCollectColor, arrCollectMatchElement, arrCollectMatchColor)=>{
    // Open Card
    openToCheckTheColor(memoryInner, memoryBack, arrColectMemory, arrCollectColor);
    if(arrCollectColor.length < 2) return;
    if(arrCollectColor[0] === arrCollectColor[1]){
        arrCollectMatchElement.push(arrColectMemory[0]);
        arrCollectMatchElement.push(arrColectMemory[1]);

        // push the matching color!
        arrCollectMatchColor.push(arrCollectColor[0]);

        // add class match
        arrColectMemory[0].classList.add('match');
        arrColectMemory[1].classList.add('match');

        // delete value
        arrColectMemory.length = 0;
        arrCollectColor.length = 0;
    } else{
        // close again
        setTimeout(()=>{
            arrColectMemory[0].style.transform = 'rotateY(0deg)';
            arrColectMemory[1].style.transform = 'rotateY(0deg)';
            arrColectMemory.length = 0;
            arrCollectColor.length = 0;
        }, 1000);
    };
};

// lets make a function that will count the time down
const countDownTime = (arrMatchMemory, times, timeElement, memoryInners, arrayMatchColor, difficulty, setMode)=>{
    timeElement.innerHTML = `00:${times}`;
    let timeInterval = setInterval(()=>{
        if(arrMatchMemory.length === memoryInners.length && !isGameOver){
            clearInterval(timeInterval);
            isGameOver = true;
            winNotif();

            // tracking the color match
            const scoreDisplayElement = document.querySelector('.score-display span');
            const currentScore = scoreCounting(scoreObjectValue, trackingColorType(arrayMatchColor), times);

            //get the time pass
            const timePass = difficulty[1]["Display Time"] - times;
            
            // put the property within is length to the score object
            scoreObject[Object.keys(scoreObject).length + 1] = {
                "Point": currentScore,
                "Difficulty": difficulty[0],
                "Mode": setMode,
                "Time Start": difficulty[1]["Display Time"],
                "Time Pass": timePass,
                "Time Left": times,
                "Color": arrayMatchColor
            };

            let scoreJSON = JSON.stringify(scoreObject);
            localStorage.setItem('scoreObject', scoreJSON);
            
            let checkingHighScore = checkHighScore(scoreObject, highScoreObject);

            document.querySelector('.score-display').style.display = 'flex';
            if(checkingHighScore["Is New High Score"]){
                // if it is a new high score, so print the high score
                scoreDisplayElement.innerHTML = "High Score: " + currentScore;
                printTheHighScore(difficulty[0], checkingHighScore["High Score"]);

                let highScoreJSON = JSON.stringify(highScoreObject);
                localStorage.setItem('highScoreObject', highScoreJSON);
            } else{
                scoreDisplayElement.innerHTML = "Score: " + currentScore;
            };

            // print the score history
            printTheScoreHistory(difficulty[0], scoreObject[Object.keys(scoreObject).length]["Point"], setMode);
        } else if(times <= 0 && !isGameOver){
            clearInterval(timeInterval);
            isGameOver = true;
            loseNotif();

            document.querySelector('.score-display').style.display = 'none';
        } else{
            times--;
            timeElement.innerHTML = `00:${times}`;
            if(times < 10){
                timeElement.innerHTML = `00:0${times}`;
            };
        };
    }, 1000);
};

// lets go applying the game logic
const gameLogic = (arrCollectElement, arrCollectColor, arrCollectElementMatch, 
    arrCollectColorMatch, times, timeElement, 
    memoryInners, memoryBacks, difficultyArray, 
    setMode)=>{
    // Make an array that collect the handleCard function, so we can remove all the event!!
    let handleCards = [];
    memoryInners.forEach((memoryInner, index)=>{
        let handleCard = ()=>{
            // Check if some condition true or not
            if(conditionLogic(memoryInner, arrCollectElement)) return;
            handle(memoryInner, memoryBacks[index], arrCollectElement, arrCollectColor, arrCollectElementMatch, arrCollectColorMatch);
        };

        // Push the function
        handleCards.push(handleCard);

        // Add event
        memoryInner.addEventListener('click', handleCard);
    });

    setTimeout(()=>{
        countDownTime(arrCollectElementMatch, times, timeElement, 
            memoryInners, arrCollectColorMatch, difficultyArray, setMode);

        // Make the interval so we can remove the event when the game over!
        let removeEventInterval = setInterval(()=>{
            if(isGameOver){
                clearInterval(removeEventInterval);

                // removing the event for each card
                memoryInners.forEach((memoryInner, index)=>{
                    memoryInner.removeEventListener('click', handleCards[index]);
                });
            };
        }, times + 1);
    }, 3000);
};

// set the difficulty
const getDifficulty = (difficultySelectElement)=>{
    let difficulty = "Easy"; // Easy is a default
    for(let i = 0; i < difficultySelectElement.length; i++){
        if(difficultySelectElement[i].dataset.choosen === "true"){
            difficulty = difficultySelectElement[i].dataset.value;
        };
    };

    // Game difficulty Object
    const gameDifficultySettings = {
        // Index 0 is the total Element, 1 is the display time
        "Very Easy": {
            "Total Element": 12,
            "Display Time": 10
        },
        "Easy": {
            "Total Element": 16,
            "Display Time": 25
        },
        "Medium": {
            "Total Element": 20,
            "Display Time": 40
        },
        "Hard": {
            "Total Element": 24,
            "Display Time": 50
        },
        "Fucking Hard": {
            "Total Element": 28,
            "Display Time": 59
        }
    };

    return [difficulty, gameDifficultySettings[difficulty]];
};

// get the mode function
const getMode = (modeSelectElement)=>{
    for(let i = 0; i < modeSelectElement.length; i++){
        if(modeSelectElement[i].dataset.choosen === "true"){
            return modeSelectElement[i].dataset.value;
        };
    };
};

// make a promise pending
function pending(ms){
    return new Promise(resolve=>{
        setTimeout(resolve, ms);
    });
};

// lets go applying all the function to one function start
async function startGame(){
    // get the difficulty select element
    let difficultySelectElement = document.querySelectorAll('.difficulty-option');

    // make the data-disabled true and the button disabled
    document.querySelector('.score-icon-wrapper').dataset.disabled = "true";
    document.querySelector('.difficulty-section').dataset.disabled = "true";
    playButton.disabled = true;

    // Set difficulty
    let difficultyArray = getDifficulty(difficultySelectElement);
    let difficulty = difficultyArray[1]["Total Element"];
    let times = difficultyArray[1]["Display Time"];

    // Array Color
    let color = [];

    printElement(difficulty);
    await pending(difficulty * 100 + 1000);
    // Get the element
    const memoryInners = document.querySelectorAll('.memory-inners');
    const memoryBacks = document.querySelectorAll('.memory-backs');
    const timeElement = document.querySelector('.time');

    timeElement.innerHTML = '00:00';

    let cardInformation = {
        "Collect": {
            "Element": [],
            "Color": []
        },
        "Collect Match": {
            "Element": [],
            "Color": []
        }
    };

    const setMode = getMode(document.querySelectorAll('.mode-option'));
    // Open card then after 3s close card again
    openingRotatingCard(memoryInners);
    // Generating color for card
    generateColor(color, memoryBacks, difficulty / 2, setMode, colorObjectSettings);
    // Play the game logic
    gameLogic(cardInformation.Collect.Element, 
        cardInformation.Collect.Color, 
        cardInformation["Collect Match"].Element, 
        cardInformation["Collect Match"].Color, 
        times, timeElement, memoryInners, memoryBacks,
        difficultyArray, setMode);

    isGamePlaying = true;
};

// lets go add the event listener
const playButton = document.querySelector('.play-button');
playButton.addEventListener('click', startGame);
