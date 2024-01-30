const text = document.querySelector('.win-or-lose span');
const notification = document.querySelector('.notification');
const resetButton = document.querySelector(".reset-button");

// Notif ketika kalah
const loseNotif = ()=>{
    notification.style.display = "";
    notification.classList.add('fadeIn');
    text.innerHTML = `Lose`;
}

// Notif ketika menang
const winNotif = ()=>{
    notification.style.display = "";
    notification.classList.add('fadeIn');
    text.innerHTML = `Win`;
}

// Reset button
async function reset(){
    let difficultySelectElement = document.querySelectorAll('.difficulty-option');
    // Set difficulty
    let difficultyArray = getDifficulty(difficultySelectElement)[1];
    let difficulty = difficultyArray["Total Element"];

    removeMemoryInners(document.querySelectorAll('.memory-inners'));
    await pending(difficulty * 100);

    isGameOver = false;
    isGamePlaying = false;
    notification.classList.add('fadeOut');

    setTimeout(()=>{
        const timeElement = document.querySelector('.time');
        notification.classList.remove('fadeOut');
        notification.classList.remove('fadeIn');

        playButton.disabled = false;
        document.querySelector('.difficulty-section').dataset.disabled = "false";
        document.querySelector('.score-icon-wrapper').dataset.disabled = "false";
        
        notification.style.display = "none";
        timeElement.innerHTML = `00:00`;
    },2000);
};

// Remove Element
const removeMemoryInners = (memoryInners)=>{
    let i = memoryInners.length - 1;
    
    let removeMemoryInnersInterval = setInterval(() => {
        if(i <= 0) clearInterval(removeMemoryInnersInterval);
        memoryInners[i].remove();
        i--;
    }, 100);
};

// lets make immediately invoke function to handle the selection section
(function(){
    // get the selection element
    const selectDifficultyElement = document.getElementById('difficulty');
    let isOpen = false;

    let conditionObject = {
        difficulty: {
            "Very Easy": false,
            "Easy": false,
            "Medium": false,
            "Hard": false,
            "Fucking Hard": false
        },
        mode: {
            "Normal Color": false,
            "Linear Gradient": false,
            "Radial Gradient": false,
            "Conic Gradient": false,
            "Mix": false
        }
    };

    // make a function that can handle the difficulty click
    const handleClick = (element, which, theConditionObject, theObjectElement)=>{
        let arrayElement;
        let conditionObject;

        if(which === "difficulty"){
            arrayElement = theObjectElement["Difficulty Element"];
            conditionObject = theConditionObject.difficulty;
        } else{
            arrayElement = theObjectElement["Mode Element"];
            conditionObject = theConditionObject.mode;
        };

        let count = 0;
        let theTrueElement;
    
        // save the element, so we can get the earlier element we click
        arrayElement.push(element);
        if(arrayElement.length >= 3) arrayElement = arrayElement.slice(-2);
        
        // loop the object so we can get the available condition of each element
        for(let diff in conditionObject){
            // If all the object was false, then add increment the count
            if(!conditionObject[diff]){
                count++;
            } else{
                // else we save the value of the one who has true value
                theTrueElement = diff;
            };
        };
    
        // make a function that can change the background opacity value of some element
        const changeTheOpacityColor = (element, opacity)=> {
            let value = window.getComputedStyle(element, null).getPropertyValue('background-color');
            return value.slice(0, -4) + opacity + ")";
        };

        if(count === 5){
            // set the value to true
            conditionObject[element.dataset.value] = true;
            element.style.backgroundColor = changeTheOpacityColor(element, 0.9);
            // set atribut data
            element.setAttribute('data-choosen', 'true');
        } else{
            // if the same element was click 2 times, so do nothing
            if(arrayElement[arrayElement.length - 2] === element) return;
    
            // set the value to true
            conditionObject[element.dataset.value] = true;
            element.style.backgroundColor = changeTheOpacityColor(element, 0.9);

            // set atribut data
            element.setAttribute('data-choosen', 'true');

            // set the value to false
            conditionObject[theTrueElement] = false;
            arrayElement[arrayElement.length - 2].style.backgroundColor = changeTheOpacityColor(arrayElement[arrayElement.length - 2], 0.2);

            // change the value of data
            arrayElement[arrayElement.length - 2].setAttribute('data-choosen', 'false');
        };
    };

    // the object that contain element ever been click
    let objectElement = {
        "Difficulty Element": [],
        "Mode Element": []
    };

    // the object that contain the function handle of each element
    let objectHandlingFunction = {
        "Handle Difficulty": [],
        "Handle Mode": []
    };

    // the function that will rmove  the event listener
    const removeEvent = (element, arrayHandlingFunc)=>{
        for(let i = 0; i < element.length; i++){
            element[i].removeEventListener('click', arrayHandlingFunc[i]);
        };

        arrayHandlingFunc.length = 0;
    };

    // make a function that will open the selection when got click
    const openSelection = (e)=>{
        if(document.querySelector('.difficulty-section').dataset.disabled === "true") return;
        if(e.target !== selectDifficultyElement) return;
    
        const difficultyAndModeWrapper = document.querySelector('.difficulty-and-mode-wrapper');
        if(!isOpen){
            difficultyAndModeWrapper.style.display = 'flex';
            isOpen = true;
    
            const difficultyOption = document.querySelectorAll('.difficulty-option');
            const modeOption = document.querySelectorAll('.mode-option');
    
            for(let i = 0; i < 5; i++){ // 5 is the available difficulty and the available mode
                const handleDifficulty = ()=>{
                    handleClick(difficultyOption[i], "difficulty", conditionObject, objectElement);
                };
                const handleMode = ()=>{
                    handleClick(modeOption[i], "mode", conditionObject, objectElement)
                };

                // push the function so wee then can remove the event
                objectHandlingFunction["Handle Difficulty"].push(handleDifficulty);
                objectHandlingFunction["Handle Mode"].push(handleDifficulty);

                // applying the event listener to both of them
                difficultyOption[i].addEventListener('click', handleDifficulty);
                modeOption[i].addEventListener('click', handleMode);
            };
        } else{
            // remove each event handler
            difficultyAndModeWrapper.style.display = 'none';
            isOpen = false;

            removeEvent(document.querySelectorAll('.difficulty-option'), objectHandlingFunction["Handle Difficulty"]);
            removeEvent(document.querySelectorAll('.mode-option'), objectHandlingFunction["Handle Mode"]);
        };
    };
    
    const closeElementWhenClickWindow = (e)=>{
        // get the element difficulty option and mode option
        const difficultyOption = document.querySelectorAll('.difficulty-option');
        const modeOption = document.querySelectorAll('.mode-option');
    
        // we need to track the element so we can get al the element when click
        for(let i = 0; i < difficultyOption.length; i++){
            if(e.target === selectDifficultyElement || e.target === difficultyOption[i] || e.target === modeOption[i]) return;
        };
    
        // if the selection was open, close the selection when we click other that selection section
        if(isOpen){
            const difficultyWrapper = document.querySelector('.difficulty-and-mode-wrapper');
            difficultyWrapper.style.display = 'none';

            // remove event because the selection section was close
            removeEvent(difficultyOption, objectHandlingFunction["Handle Difficulty"]);
            removeEvent(modeOption, objectHandlingFunction["Handle Mode"]);
            // false, cause we close again
            isOpen = false;
        };
    };

    // lets add event listener to the window and the selection section
    selectDifficultyElement.addEventListener('click', openSelection);
    window.addEventListener('click', closeElementWhenClickWindow);
})();

// Kita kasih event listener for the reset button
resetButton.addEventListener('click', reset);
