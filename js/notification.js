const text = document.querySelector('.win-or-lose');
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
const reset = ()=>{
    gameActive = false;
    isGameOver = false;
    second = 30;
    collectMatch.length = 0; // dont create a new array for this, but clear the existing array instead
    collectColor = [];
    collectElem = [];
    notification.classList.add('fadeOut');
    setTimeout(()=>{
        notification.classList.remove('fadeIn');
        notification.classList.remove('fadeOut');
        notification.style.display = "none";
        start.style.display = "";
        removedMatchAndClosedAgain();
        start.disabled = false;
        collectColorMatch = [];
    },2000);
};

// Function untuk remove match
const removedMatchAndClosedAgain = ()=>{
    for(let i = 0; i<memoryInners.length; i++){
        memoryInners[i].classList.remove('match');
        memoryInners[i].style.transform = 'rotateY(0deg)';
    };
};

// Kita kasih event listener di buttonnya
resetButton.addEventListener('click',reset);
