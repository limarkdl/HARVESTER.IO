let TYPE_OF_CROPS = [];
let TYPE_OF_MACHINES = [];
let TYPE_OF_REAPERS = [];

let CONFIG = [];
let currentOBJ;
let zoomF = 1.0;
let DEFAULT_COLORS_INI;

let DEFAULT_COLORS = [
    {name: "oats", color: "#C4BA9E"},
    {name: "wheat", color: "#F5DEB3"},
    {name: "corn", color: "#FBEC5D"},
    {name: "sunflower", color: "#FFC512"},
    {name: "sugar beet", color: "#D8D8D8"},
    {name: "beans", color: "#811E1E"},
    {name: "soy", color: "#D2C82E"},
    {name: "cotton", color: "#EEEDDE"},
    {name: "rye", color: "#DAE71E"},
    {name: "buckwheat", color: "#9C6217"},
    {name: "rice", color: "#FFFFFF"}
];

BackUp();


// DELETE OBJECT IF IT HAS 'empty' ID //
function DamagedEraser() {
    for(let i = 0; i < CONFIG.length; i++) {
        let current = CONFIG[i];
        if(current[Object.keys(current)[0]] === '') {
            CONFIG.splice(i, 1);
        }
    }
}

// GET ALL TYPES OF MACHINES THAT ARE LISTED IN THE PARSED CSV TABLE
function getAllTypesMachines() {
    for(let i = 0;i < CONFIG.length;i++) {
        currentOBJ = CONFIG[i];
        if (!TYPE_OF_MACHINES.includes(currentOBJ[Object.keys(currentOBJ)[4]])) {
            TYPE_OF_MACHINES.push(currentOBJ[Object.keys(currentOBJ)[4]]);
        }
    }
}

// GET ALL TYPES OF CROP TYPES THAT ARE LISTED IN THE PARSED CSV TABLE
function getAllTypesCrops() {
    for(let i = 0;i < CONFIG.length;i++) {
        currentOBJ = CONFIG[i];
        if (!TYPE_OF_CROPS.includes(currentOBJ[Object.keys(currentOBJ)[1]])) {
            TYPE_OF_CROPS.push(currentOBJ[Object.keys(currentOBJ)[1]]);
        }
    }
}

// GET ALL TYPES OF REAPER TYPES THAT ARE LISTED IN THE PARSED CSV TABLE
function getAllTypesReapers() {
    for(let i = 0; i < CONFIG.length;i++) {
        currentOBJ = CONFIG[i];
        if (!TYPE_OF_REAPERS.includes(currentOBJ[Object.keys(currentOBJ)[6]])) {
            TYPE_OF_REAPERS.push(currentOBJ[Object.keys(currentOBJ)[6]]);
        }
    }
}

// RESTORING DEFAULT_COLOR TO THE ORIGINAL VALUES
function restoreToDefault() {
    DEFAULT_COLORS = [
        {name: "oats", color: "#C4BA9E"},
        {name: "wheat", color: "#F5DEB3"},
        {name: "corn", color: "#FBEC5D"},
        {name: "sunflower", color: "#FFC512"},
        {name: "sugar beet", color: "#D8D8D8"},
        {name: "beans", color: "#811E1E"},
        {name: "soy", color: "#D2C82E"},
        {name: "cotton", color: "#EEEDDE"},
        {name: "rye", color: "#DAE71E"},
        {name: "buckwheat", color: "#9C6217"},
        {name: "rice", color: "#FFFFFF"}
    ];
}

// CALCULATE THE WIDTH FOR AN ELEMENT IN THE GRID ACCORDING TO THE VIEWPORT.WIDTH
function calculateWidthForElement() {
    let calculatedWidth;
    if (window.innerWidth < 350) {
        calculatedWidth = '30%';
    } else if (window.innerWidth < 400) {
        calculatedWidth = '30%';
    } else if (window.innerWidth < 500){
        calculatedWidth = '23%';
    } else if (window.innerWidth < 600) {
        calculatedWidth = '19%';
    } else if (window.innerWidth < 700) {
        calculatedWidth = '18%';
    }
    else if  (window.innerWidth < 800) {
        calculatedWidth = '16%';
    } else if (window.innerWidth < 900) {
        calculatedWidth = '15%';
    } else if (window.innerWidth < 1000) {
        calculatedWidth = '13%';
    } else if(window.innerWidth < 1100) {
        calculatedWidth = '12%';
    } else if (window.innerWidth < 1300) {
        calculatedWidth = '11%';
    } else if (window.innerWidth < 1400) {
        calculatedWidth = '8%';
    } else if (window.innerWidth < 1550) {
        calculatedWidth = '8%';
    } else {
        calculatedWidth = '7%';
    }
    return calculatedWidth;
}

// FIRST INITIALIZATION AFTER FILE LOADING
function INITIALIZATION() {
    // ERASE ALL DAMAGED ROWS
    DamagedEraser();
    // GET ALL TYPES OF CROP
    getAllTypesCrops();
    // GET ALL TYPES OF MACHINES
    getAllTypesMachines();
    // GET ALL TYPES OF REAPERS
    getAllTypesReapers();
    // CLEAR COLOR LIST ON THE PAGE
    clearListOfColors();
    // PARSE PARSED CSV FILE AND SEE IF DEFAULT_COLOR INCLUDES ALL VALUES THAT ARE IN THE TABLE
    AddColorsToDefault();
    // RENDER COLOR LIST ON THE PAGE FROM DEFAULT_COLOR
    renderListOfColors();
    // APPLY HEADER NAMES FROM THE FILE TO THE SORTING BUTTON
    button_update();
    // FINAL GRID OF FIELDS RENDER
    GridOfFieldsRender();
}

// BACKING UP DEFAULT_COLORS TO BE ABLE TO RESTORE
function BackUp() {
    DEFAULT_COLORS_INI = DEFAULT_COLORS;
}

// CLEAR COLOR LIST ON THE PAGE
function clearListOfColors() {
    document.getElementsByClassName('SubSettingsList')[0].innerHTML = '';
}

// SET BACKGROUND OF THE GRID ELEMENT ACCORDING TO THE CLASS NAME WHICH IS THE SAME AS FIELD'S CROP TYPE
// !!! CONTAINS LOGICAL ERROR, FIX IT ASAP !!!
function setBackground() {
    for(let i = 0; i < CONFIG.length;i++) {
        let nameOfRequiredColor = document.getElementsByClassName('insiderMainContent')[i].classList[1];
        let requiredIndexOfColor = DEFAULT_COLORS.findIndex( c => c.name === nameOfRequiredColor);
        if(typeof(requiredIndexOfColor) != 'undefined') {
            document.getElementsByClassName('insiderMainContent')[i].style.backgroundColor = getSafe(() => DEFAULT_COLORS[requiredIndexOfColor].color);
        }
    }
}

// HOT FIX WHEN SOME PROPERTIES OF OBJECT RETURN "ERROR UNDEFIED", ALLOWS TO SKIP SUCH ERRORS
function getSafe(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}

function fullScreenToggle(element) {
    document.getElementsByClassName(element)[0].requestFullscreen();
}

// MAIN GRID RENDER ALGORITHM, WHICH RERENDERS THE WHOLE GRID USING SOME EXTERNAL VALUES
function GridOfFieldsRender(type) {
    document.getElementsByClassName("grid")[0].innerHTML = "";
    for(let i = 0;i < CONFIG.length;i++) {
        currentOBJ = CONFIG[i];
        let div = document.createElement("div");
        div.innerHTML = `<div onclick="showToChosenInfo(`
            +currentOBJ[Object.keys(currentOBJ)[0]]+`)" class="element_grid"><div class="insider"><div  class="insiderMainContent `
            +currentOBJ[Object.keys(currentOBJ)[1]]+`"><p>ID:`
            +currentOBJ[Object.keys(currentOBJ)[0]]+`</p><p class="`
            +Object.keys(currentOBJ)[1]+`">`
            +currentOBJ[Object.keys(currentOBJ)[1]]+` `+currentOBJ[Object.keys(currentOBJ)[2]]+`</p><p class="`
            +Object.keys(currentOBJ)[4]+`">`
            +currentOBJ[Object.keys(currentOBJ)[4]]+`</p><p class="`
            +Object.keys(currentOBJ)[5]+`">`
            +currentOBJ[Object.keys(currentOBJ)[5]]+`</p><p class="`
            +Object.keys(currentOBJ)[6]+`">`
            +currentOBJ[Object.keys(currentOBJ)[6]]+`</p></div><div class="bar" style="height:`
            +currentOBJ[Object.keys(currentOBJ)[3]] * 100 +`%"></div></div></div>`;
        div.style.width = calculateWidthForElement();
        div.id = "div" + String(i);
        document.getElementsByClassName("grid")[0].appendChild(div);
    }
    if(type !== 'resize') {
        setTimeout(function(){setBackground()},50);
    }

}

// WE CHECK IF CURRENT CROP HAS A DEFAULT COLOR TO DISPLAY
function getColorFromDEFAULT(cropName) {
    let obj = DEFAULT_COLORS.find(o => o.name === cropName);
    if (typeof obj != "undefined") {
        return obj.color;
    } else {
        let test = getRandomColor();
        console.log(test);
    }
}

// RETURNS PSEUDO RANDOM COLOR, IS USED WHEN THERE ARE NO DEFAULT COLOR FOR THIS.CROP_TYPE
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// APPLIES HEADER NAMES FROM THE FILE TO THE SORTING BUTTONS
function button_update() {
    document.getElementsByClassName('SubSettingsList')[1].children[1].innerHTML = 'SORTING BY ' + Object.keys(currentOBJ)[0] + '↓';
    document.getElementsByClassName('SubSettingsList')[1].children[2].innerHTML = 'SORTING BY ' + Object.keys(currentOBJ)[0] + '↑';
    document.getElementsByClassName('SubSettingsList')[1].children[3].innerHTML = 'SORTING BY ' + Object.keys(currentOBJ)[1] + '↓';
    document.getElementsByClassName('SubSettingsList')[1].children[4].innerHTML = 'SORTING BY ' + Object.keys(currentOBJ)[1] + '↑';
    document.getElementsByClassName('SubSettingsList')[1].children[5].innerHTML = 'SORTING BY ' + Object.keys(currentOBJ)[2] + '↓';
    document.getElementsByClassName('SubSettingsList')[1].children[6].innerHTML = 'SORTING BY ' + Object.keys(currentOBJ)[2] + '↑';
    document.getElementsByClassName('SubSettingsList')[1].children[7].innerHTML = 'SORTING BY ' + Object.keys(currentOBJ)[3] + '↓';
    document.getElementsByClassName('SubSettingsList')[1].children[8].innerHTML = 'SORTING BY ' + Object.keys(currentOBJ)[3] + '↑';
}

// COPIES PROPERTY OF THE FIELD TO THE "CHOSEN FIELD" ON MOUSE CLICK
function showToChosenInfo(ID) {
    document.getElementsByClassName('chosenInfoElement')[1].innerText = '';
    let obj = CONFIG.find(c => c[Object.keys(c)[0]] === String(ID));
    document.getElementsByClassName('chosenInfoElement')[1].innerText = Object.keys(currentOBJ)[0] + ': '+ obj[Object.keys(obj)[0]];
    document.getElementsByClassName('chosenInfoElement')[2].innerText = Object.keys(currentOBJ)[1] + ': '+ obj[Object.keys(obj)[1]];
    document.getElementsByClassName('chosenInfoElement')[3].innerText = Object.keys(currentOBJ)[2] + ': '+ obj[Object.keys(obj)[2]];
    document.getElementsByClassName('chosenInfoElement')[4].innerText = Object.keys(currentOBJ)[3] + ': '+ obj[Object.keys(obj)[3]];
    document.getElementsByClassName('chosenInfoElement')[5].innerText = Object.keys(currentOBJ)[4] + ': '+ obj[Object.keys(obj)[4]];
    document.getElementsByClassName('chosenInfoElement')[6].innerText = Object.keys(currentOBJ)[5] + ': '+ obj[Object.keys(obj)[5]];
    try{document.getElementsByClassName('chosenInfoElement')[7].innerText = Object.keys(currentOBJ)[6] + ': '+ obj[Object.keys(obj)[6]]}
    catch (err) {
        console.log(Object.keys(currentOBJ)[6]);
        console.log(obj[Object.keys(obj)[6]]);
        console.log(err);
        console.log(document.getElementsByClassName('chosenInfoElement')[6].innerText);
    }
    document.getElementsByClassName('chosenInfoElement')[0].style.backgroundColor = getColorFromDEFAULT(obj[Object.keys(obj)[1]]);
}

// SHOW / HIDE TOOLS PANEL
function toggleTools() {
    document.getElementsByClassName("tools")[0].classList.toggle('isHidden');

}

// SHOW / HIDE CHOSEN FIELD PANEL
function toggleChosenInfo() {
    document.getElementsByClassName("chosenInfo")[0].classList.toggle('isHidden');
}

// JUST A SMALL BOX UNDER "UPLOAD" BUTTON WHICH OUTPUTS THE RESULT OF READING AND PARSING FILE
function resultOfImport(status) {
    let resultOfImport = document.getElementById('resultOfImport');
    resultOfImport.innerText = '';
    if (status === true) {
       resultOfImport.innerText = 'SUCCESSFULLY LOADED AND PARSED';
    } else {
        resultOfImport.innerText = 'AN ERROR HAS OCCURRED';
    }
}

// SORTS CONFIG BY CROP TYPE
function sortByCrop(type) {
    if (type === 'asc') {
        CONFIG.sort(function(a, b) {
            const cropA = a[Object.keys(a)[1]].toUpperCase();
            const cropB = b[Object.keys(b)[1]].toUpperCase();
            if (cropA < cropB) {
                return -1;
            }
            if (cropA > cropB) {
                return 1;
            }
            return 0;
        });
    } else {
        CONFIG.sort(function(a, b) {
            const cropA = a[Object.keys(a)[1]].toUpperCase();
            const cropB = b[Object.keys(b)[1]].toUpperCase();
            if (cropA > cropB) {
                return -1;
            }
            if (cropA < cropB) {
                return 1;
            }
            return 0;
        });
    }
    GridOfFieldsRender();
}

// SORTS CONFIG BY ID
function sortByID(type) {
    if (type === 'desc') {
        CONFIG.sort(
        (p1, p2) =>
            (parseInt(p1[Object.keys(p1)[0]]) < parseInt(p2[Object.keys(p2)[0]])) ? 1 : (parseInt(p1[Object.keys(p1)[0]]) > parseInt(p2[Object.keys(p2)[0]])) ? -1 : 0);
    } else {
        CONFIG.sort(
            (p1, p2) =>
                (parseInt(p1[Object.keys(p1)[0]]) > parseInt(p2[Object.keys(p2)[0]])) ? 1 : (parseInt(p1[Object.keys(p1)[0]]) < parseInt(p2[Object.keys(p2)[0]])) ? -1 : 0);
    }
    GridOfFieldsRender();
}

// SORTS CONFIG BY DENSITY
function sortByDensity(type) {
    if (type === 'desc') {
        CONFIG.sort(
            (p1, p2) => ((p1[Object.keys(p1)[2]]) > (p2[Object.keys(p2)[2]])) ? 1 : ((p1[Object.keys(p1)[2]]) < (p2[Object.keys(p2)[2]])) ? -1 : 0);
    } else {
        CONFIG.sort(
            (p1, p2) => ((p1[Object.keys(p1)[2]]) < (p2[Object.keys(p2)[2]])) ? 1 : ((p1[Object.keys(p1)[2]]) > (p2[Object.keys(p2)[2]])) ? -1 : 0);
    }
    GridOfFieldsRender();
}

// SORT CONFIG BY COMPLEXITY
function sortByComplexity(type) {
    if (type === 'desc') {
        CONFIG.sort(
            (p1, p2) => ((p1[Object.keys(p1)[3]]) < (p2[Object.keys(p2)[3]])) ? 1 : ((p1[Object.keys(p1)[3]]) > (p2[Object.keys(p2)[3]])) ? -1 : 0);
    } else {
        CONFIG.sort(
            (p1, p2) => ((p1[Object.keys(p1)[3]]) > (p2[Object.keys(p2)[3]])) ? 1 : ((p1[Object.keys(p1)[3]]) < (p2[Object.keys(p2)[3]])) ? -1 : 0);
    }
    GridOfFieldsRender();
}

// SORT CONFIG BY HARVESTER NAME
// !!! THIS IS PSEUDO SORTING THAT HAS NO SENSE AND CAN JUST ORDER THE MACHINES IN SOME MORE FANCY WAY. NEEDED TO BE REDESIGNED !!!
function sortByHarvester() {
    CONFIG.sort(function(a, b) {
        const harvestA = a[Object.keys(a)[4]].toUpperCase();
        const harvestB = b[Object.keys(b)[4]].toUpperCase();
        if (harvestA > harvestB) {
            return -1;
        }
        if (harvestA < harvestB) {
            return 1;
        }
        return 0;
    });
    GridOfFieldsRender();
}

// SORT CONFIG BY REAPER TYPE
// !!! THIS IS PSEUDO SORTING THAT HAS NO SENSE AND JUST ORDER THE REAPERS IN SOME MORE FANCY WAY. NEEDED TO BE REDESIGNED !!!
function sortByReaper() {
    CONFIG.sort(function(a, b) {
        const reaperA = a[Object.keys(a)[6]].toUpperCase();
        const reaperB = b[Object.keys(b)[6]].toUpperCase();
        if (reaperA > reaperB) {
            return -1;
        }
        if (reaperA < reaperB) {
            return 1;
        }
        return 0;
    });
    GridOfFieldsRender();
}


// RENDERS LIST OF COLORS ON THE MAIN PAGE
function renderListOfColors() {
    document.getElementsByClassName('SubSettingsList')[0].innerHTML = '';
    let IsFound = false;
    let FIndex = 0;
    for (let i = 0; i < DEFAULT_COLORS.length; i++) {
        for (let j = 0;j < TYPE_OF_CROPS.length;j++) {
            if (DEFAULT_COLORS.find(c => c.name === TYPE_OF_CROPS[i])) {
                IsFound = true;
                FIndex = DEFAULT_COLORS.findIndex(c => c.name === TYPE_OF_CROPS[i]);
            } else {
                IsFound = false;
            }
        }
        if (IsFound) {
            let el = document.createElement("label");
            el.innerHTML = `<label><input type="color" id="colorN`+i+`" onchange="updateListOfColors('` + DEFAULT_COLORS[FIndex].name + `','colorN`+i+`')" value="`+ DEFAULT_COLORS[FIndex].color +`"> `+DEFAULT_COLORS[FIndex].name+`</label>`;
            document.getElementsByClassName('SubSettingsList')[0].appendChild(el);
        }
    }
}

function updateListOfColors(name, colorPickerId) {
    let itemIndex = DEFAULT_COLORS.findIndex(x => x.name === name)
    DEFAULT_COLORS[itemIndex].color = document.getElementById(colorPickerId).value;
    setTimeout(function(){setBackground()},200);

}

function zoomIn() {
    zoomF += 0.05;
    document.getElementsByClassName('grid')[0].style.scale = String(zoomF);
}

function zoomOut() {
    zoomF -= 0.05;
    document.getElementsByClassName('grid')[0].style.scale = String(zoomF);
}

function AddColorsToDefault() {
    for (let i = 0; i < CONFIG.length;i++) {
        let currentOBJ = CONFIG[i];
        let named = currentOBJ[Object.keys(currentOBJ)[1]];
        if (DEFAULT_COLORS.find(o => o.name === named)) {
            console.log("FOUND" + named);
        } else {
            console.log("DIDN'T FOUND");
            let OBJECT = {name: named, color: getRandomColor() };
            DEFAULT_COLORS.push(OBJECT);
        }
    }
}

function CONFIGPARSER() {
    let file = document.getElementById('fileReceiver').files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        console.log(reader.result);
        Papa.parse(file, {
            header: true,
            complete: function(results) {
                console.log("Finished:", results.data);
                resultOfImport(true);
                CONFIG = results.data;
                TYPE_OF_CROPS.length = 0;
                restoreToDefault();
                DamagedEraser();
                INITIALIZATION();
            }
        });
    }
    reader.onerror = function() {
        console.log(reader.error);
        resultOfImport(false);
}
}

document.getElementById("fileReceiver").addEventListener('change', function(){


    CONFIGPARSER();
});
window.addEventListener('resize', function(){GridOfFieldsRender()});


