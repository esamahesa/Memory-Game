const colorObjectSettings = {
    // for the RGB settings
    "RGB Settings": {
        "Opacity Value": {
            0.1: 1,
            0.2: 2,
            0.3: 3,
            0.4: 4,
            0.5: 5,
            0.6: 6,
            0.7: 8,
            0.8: 40,
            0.9: 20,
            1: 11
        },
        "Color Type": {
            "rgba": 80,
            "rgb": 20
        }
    }, 

    // for the linear gradient settings
    "Linear Gradient Settings": {
        "Apply Color for Linear Gradient": {
            2: 40,
            3: 30,
            4: 20,
            5: 10
        },
        "Gradient Type": {
            "repeating-linear-gradient": 80,
            "linear-gradient": 20
        },
        "Color Stop": {
            "Default": 20,
            "Stop": 80
        }
    }, 

    // for the radial gradient settings
    "Radial Gradient Settings": {
        "Apply Color for Radial Gradient": {
            2: 30,
            3: 10,
            4: 20,
            5: 40
        },
        "Gradient Type": {
            "repeating-radial-gradient": 90,
            "radial-gradient": 10
        }, 
        "Shape": {
            "circle": 90,
            "ellipse": 10
        }, 
        "Position": {
            "random": 10,
            "center": 90
        }, 
        "Size": {
            "farthest-corner": 5,
            "closest-side": 7,
            "closest-corner": 8,
            "farthest-side": 80
        }
    },

    // for the conic gradient settings
    "Conic Gradient Settings": {
        "Apply Color for Conic Gradient": {
            2: 30,
            3: 10,
            4: 20,
            5: 40
        }, 
        "Gradient Type": {
            "repeating-conic-gradient": 60,
            "conic-gradient": 40
        }, 
        "Position": {
            "at center": 80,
            "random": 20
        }
    }, 

    "Mix Settings": {
        "RGB Color": 50,
        "Linear Gradient": 25,
        "Radial Gradient": 15,
        "Conic Gradient": 10
    }
};

// Random Selection
const weightedRandomSelection = (object)=>{
    let sum = 0;
    let random = Math.round(Math.random() * 100);

    for(let key in object){
        sum += object[key];
        if(random <= sum) return key;
        // when trying to use this weightRandomSelection function, u need to make sure that all the object value has the weight total of 100
    };
};

// Random Color RGB function
const randomRgb = (rgbSettingsObject)=>{
    // which one? rgb or rgba, make the rgb more heavy than rgba
    const randomNumber = ()=>{return Math.floor((Math.random() * 255))};
    const colorType = weightedRandomSelection(rgbSettingsObject["Color Type"]);

    if(colorType === 'rgba'){
        // lets choose the opacity by random, but the heavier is the highest
        let whichOpacity = weightedRandomSelection(rgbSettingsObject["Opacity Value"]);
        return `${colorType}(${randomNumber()}, ${randomNumber()}, ${randomNumber()}, ${whichOpacity})`;
    } else{
        return `${colorType}(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
    };
};

// Random Linear Gradient either it is a repeating or not
const randomLinearGradient = (rgbSettingsObject, linearGradientSettingsObject)=>{
    // choose either repeat or not
    let gradientType = weightedRandomSelection(linearGradientSettingsObject["Gradient Type"]);
    let colorStop = weightedRandomSelection(linearGradientSettingsObject["Color Stop"]) === "Stop";

    // get the random deg value
    let randomDeg = Math.round(Math.random() * 180);
    randomDeg = randomDeg < 30 ? randomDeg + 30 : randomDeg;
    
    const howMuchColor = weightedRandomSelection(linearGradientSettingsObject["Apply Color for Linear Gradient"]);

    let colors = [];
    let stopColors = [];

    for(let i = 0; i < howMuchColor; i++){
        colors.push(randomRgb(rgbSettingsObject));
        stopColors.push(Math.floor(Math.random() * 100));
    };

    stopColors.sort((a, b) => a - b);
    stopColors[stopColors.length - 1] = 100;

    let gradient;
    if(colorStop){
        gradient = `${gradientType}(`
        let colorAndStop = "";
        for(let i = 0; i < howMuchColor; i++){
            colorAndStop += `${colors[i]} ${stopColors[i]}%, `;
        };

        gradient += `${randomDeg}deg, ` + colorAndStop.slice(0, -2) + ")";
    } else{
        gradient = `${gradientType}(`
        let colorAndStop = "";
        for(let i = 0; i < howMuchColor; i++){
            colorAndStop += `${colors[i]}, `;
        };

        gradient += `${randomDeg}deg, ` + colorAndStop.slice(0, -2) + ")";
    };

    return gradient;
};

// Random Radial Gradient either it is a repeating or not
const randomRadialGradient = (rgbSettingsObject, radialGradientSettingsObject)=>{
    // Get the 2 value, gradient type and shape make the radial-gradient heavier and make the 
    let gradientType = weightedRandomSelection(radialGradientSettingsObject["Gradient Type"]);
    let shape = weightedRandomSelection(radialGradientSettingsObject["Shape"]);

    // make size array and randomly pick the size
    const size = weightedRandomSelection(radialGradientSettingsObject["Size"]);

    // set position randomly
    let pickPosition = weightedRandomSelection(radialGradientSettingsObject["Position"]);
    let position = pickPosition === "random" ? `${Math.floor(Math.random() * 100)}%` : pickPosition;

    // get the color count
    const howMuchColor = weightedRandomSelection(radialGradientSettingsObject["Apply Color for Radial Gradient"]);

    // declare 2 variabel that will takes a stopcolor percentage and the colors
    let colors = [];
    let stopColors = [];

    // append it
    for(let i = 0; i < howMuchColor; i++){
        colors.push(randomRgb(rgbSettingsObject));
        stopColors.push(Math.floor(Math.random() * 100));
    };

    // sort in ascending order
    stopColors.sort((a, b) => a - b);
    stopColors[stopColors.length - 1] = 100;
    stopColors[0] > 10 ? stopColors[0] = Math.floor(Math.random() * 10) : stopColors[stopColors.length - 1];

    let gradient = `${gradientType}(${shape} ${size} at ${position}, `;
    let colorAndStopString = "";
    for(let i = 0; i < howMuchColor; i++){
        colorAndStopString += `${colors[i]} ${stopColors[i]}%, `;
    };

    // merge all
    gradient = gradient + colorAndStopString.slice(0, -2) + ")";
    return gradient;
};

// Random Conic Gradient either it is a repeating or not
const randomConicGradient = (rgbSettingsObject, conicGradientSettingsObject)=>{
    // get the gradient type
    let gradientType = weightedRandomSelection(conicGradientSettingsObject["Gradient Type"]);
    let fromAngle = `from ${Math.floor(Math.random() * 360)}deg`;

    // Make a position array, declare the position Y and X
    const X = Math.floor(Math.random() * 100);
    const Y = Math.floor(Math.random() * 100);

    let pickPosition = weightedRandomSelection(conicGradientSettingsObject["Position"]); [`at center`, `at ${X}% ${Y}%`];
    let position = pickPosition === "random" ? `at ${X}% ${Y}%` : pickPosition;

    // get the color count
    const howMuchColor = weightedRandomSelection(conicGradientSettingsObject["Apply Color for Conic Gradient"]);

    // declare 2 variabel that will takes a stopcolor deg and the colors
    let colors = [];
    let stopColors = [];

    for(let i = 0; i < howMuchColor; i++){
        colors.push(randomRgb(rgbSettingsObject));
        stopColors.push(Math.round(Math.random() * 360));
    };

    stopColors.sort((a, b) => a - b);

    let gradient = `${gradientType}(${fromAngle} ${position}, `;
    let colorAndColorStopString = "";
    for(let i = 0; i < howMuchColor; i++){
        colorAndColorStopString += `${colors[i]} ${stopColors[i]}deg, `;
    };

    gradient = gradient + colorAndColorStopString.slice(0, -2) + ")";
    return gradient;
};

// Generate Random color and append it
const generateColor = (colorArray, memoryBacks, halfELement, which, settingColorObjects)=>{
    // append the function, put the object in the function so we can get non absolute value!
    const backgroundType = ()=>{
        return {
            "RGB Color": randomRgb(settingColorObjects["RGB Settings"]),
            "Linear Gradient": randomLinearGradient(settingColorObjects["RGB Settings"], settingColorObjects["Linear Gradient Settings"]),
            "Radial Gradient": randomRadialGradient(settingColorObjects["RGB Settings"], settingColorObjects["Radial Gradient Settings"]),
            "Conic Gradient": randomConicGradient(settingColorObjects["RGB Settings"], settingColorObjects["Conic Gradient Settings"])
        };
    };

    // Append it to the color array
    for(let i = 0; i < halfELement; i++){
        switch(which){
            case "Normal Color":
                colorArray.push(backgroundType()["RGB Color"]);
                break;
            case "Linear Gradient":
                colorArray.push(backgroundType()["Linear Gradient"]);
                break;
            case "Radial Gradient":
                colorArray.push(backgroundType()["Radial Gradient"]);
                break;
            case "Conic Gradient":
                colorArray.push(backgroundType()["Conic Gradient"]);
                break;
            case "Mix":
                colorArray.push(
                    backgroundType()[
                        weightedRandomSelection(settingColorObjects["Mix Settings"])
                    ]);
                break;
            default:
                colorArray.push(backgroundType()["RGB Color"]);
                break;
        };
    };

    // concat so we can get each color in double
    colorArray = colorArray.concat(colorArray);

    // Shuffle the color, so the color got their uniqe position
    for(let i = colorArray.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [colorArray[i], colorArray[j]] = [colorArray[j], colorArray[i]];
    };

    // Style the element
    memoryBacks.forEach((memoryBack, index)=>{
        memoryBack.style.background = colorArray[index];
    });

    return colorArray;
};
