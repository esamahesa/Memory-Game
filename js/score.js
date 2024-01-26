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
const scoreCounting = (scoreObjectValue, arrayColorTracker)=>{
    let difficulty = getDifficulty(document.querySelectorAll('.difficulty-option'))[0];
    let objectDifficulty = scoreObjectValue[difficulty];
    let countScore = 0;
    console.log(arrayColorTracker);
    for(let color of arrayColorTracker){
        for(let colorProperty in objectDifficulty){
            if(color === colorProperty){
                // so add the color value to the countscore
                countScore += objectDifficulty[colorProperty];
            };
        };
    };

    return countScore;
};
