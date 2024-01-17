const start = document.querySelector('.start-button');
const memoryInners = document.querySelectorAll('.memory-inners');
const memoryBacks = document.querySelectorAll('.memory-backs');
const picture = document.getElementById("picture");
let score = 0; // Kalau menang score++
let isGameOver = false;
let second = 20;
let collectColor = [];
let collectElem = [];
let collectMatch = []; // Ini untuk menentukan jumlah matchnya
let collectColorMatch = [];
let sumDisplayNone = 0;
let highScore = 0;
let gameActive = false; // Ini menunjukan kalau game sedang berjalan atau ngga untuk bisa menonaktifkan function checkVal

start.addEventListener('click',()=>{
    time.innerHTML = `00:00`;
    gameActive = true;
    for(let i = 0; i<memoryInners.length; i++){
        memoryInners[i].style.transform = 'rotateY(180deg)';
    };
    generateColor(color);
        setTimeout(()=>{
            close();
            generateSection(color);
            checkVal(collectMatch);
        },3000);
        setTimeout(()=>{countDown(second,collectMatch);},3000);
        // setTimeout(()=>{start.style.display = `none`},3000);
        start.disabled = true;
});

// Kita tutup kartu nya setelah menunjukan warnanya
const close = ()=>{
    memoryInners.forEach(memoryInner=>{
        memoryInner.style.transform = 'rotateY(0deg)';
        scale(memoryInner);
    });
};

// Kita buat function untuk ngebuka card nya lagi

const open = (i)=>{
    memoryInners[i].style.transform = 'rotateY(180deg)';
    removeScale(i);
};

// Kita buat function untuk mengecek value dari 2 card yang di buka

const checkVal = (collectMatch)=>{
    let bgColor;
    for(let i = 0; i<memoryInners.length; i++){
        const handleClick = ()=>{
            /* Kita akan memasukan 4 kondisi sekaligus, pertama kalau dia tidak match
            Kedua kalau dia sudah memiliki element yang ada pada array memoryInners[i] dengan menggunakan includes
            Ketiga yaitu mengecek apakah dia sedang dalam posisi terbuka atau bukan
            Keempat kita harus ngecek game nya udah selesai atau belum
            */
            if(gameActive && !isGameOver && collectElem.length !== 2 && !memoryInners[i].classList.contains('match') && !collectElem.includes(memoryInners[i]) && memoryInners[i].style.transform !== 'rotateY(180deg)'){
                open(i);
                bgColor = window.getComputedStyle(memoryBacks[i]).backgroundColor;

                collectElem.push(memoryInners[i]);
                collectColor.push(bgColor);
                if(collectElem.length >= 2){
                    if(collectColor[0] === collectColor[1]){
                        match(collectElem);
                        collectMatch.push(...collectElem);
                        collectColorMatch.push(collectColor[0]);
                        checkColor(collectColorMatch);
                        collectElem = [];
                        collectColor = [];
                        return collectColorMatch;
                    } else{
                        setTimeout(()=>{
                            closeAgain(collectElem);
                            collectElem = [];
                            collectColor = [];
                        },1000);
                    };
                };
            };
        };
        memoryInners[i].addEventListener('click',handleClick);
    };
};

// Buat function untuk nambahin class kalau misalkan dia Match
const match = (arrayOfelem)=>{
    for(let i = 0; i<arrayOfelem.length; i++){
        arrayOfelem[i].classList.add('match');
    };
};

// Setelah di tutup kita buat function untuk scale dia
const scale = (elem)=>{elem.classList.add('scale');};

// Setelah terbuka kita remove scale nya
const removeScale = (i)=>{
    memoryInners[i].classList.remove('scale');
};

// Kalau kondisi nya false, tutup lagi
const closeAgain = (arrayOfelem)=>{
    for(let i = 0; i<arrayOfelem.length; i++){
        arrayOfelem[i].style.transform = 'rotateY(0deg)';
        scale(arrayOfelem[i]);
    };
};

//  Kita bikin waktu hitung mundurnya
const time = document.querySelector('.time');
const countDown = (second,arrayMatch)=>{
    time.innerHTML = `00:${second}`;
    let count = setInterval(()=>{
        if(arrayMatch.length === 16 && !isGameOver){
            win(20-second);
            clearInterval(count);
        } else if(second === 0 && !isGameOver){
            lose();
            clearInterval(count);
        } else{
            second--;
            time.innerHTML = `00:${second}`;
            if(second<10){time.innerHTML = `00:0${second}`};
        };
    },1000);
};

// Function ketika Win
const win = (time)=>{
    winNotif();
    score++;
    if(time > highScore){
        highScore = time;
    }
    console.clear();
    console.log(`Your Score: ${score}
    Your HighScore: ${highScore}`);
    isGameOver = true;
};

// Function ketika lose
const lose = ()=>{
    loseNotif();
    score--;
    if(score < 0){
        score = 0;
    } else{
        console.clear();
        console.log(`Your Score: ${score}`);
    };

    isGameOver = true;

    for(let i = 0; i<memoryInners.length; i++){
        memoryInners[i].classList.remove('scale');
    };

    const colorLeft = document.querySelectorAll('.color-left');
    for(let i = 0; i<colorLeft.length; i++){
        colorLeft[i].remove();
    };
    sumDisplayNone = 0;
};