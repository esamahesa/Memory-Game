(function(){
    let scoreJSON = localStorage.getItem('scoreObject');
    let highScoreJSON = localStorage.getItem('highScoreObject');
    if(scoreJSON && highScoreJSON){
        let scoreObjectInLocalStorage = JSON.parse(scoreJSON);
        let highScoreObjectInLocalStorage = JSON.parse(highScoreJSON);

        scoreObject = scoreObjectInLocalStorage;
        highScoreObject = highScoreObjectInLocalStorage;

        printTheHighScore(highScoreObjectInLocalStorage["Difficulty"], highScoreObjectInLocalStorage["High Score"]);

        for(let eachGame in scoreObject){
            printTheScoreHistory(scoreObject[eachGame]["Difficulty"],
                scoreObject[eachGame]["Point"],
                scoreObject[eachGame]["Mode"]);
        };
    };
})();
