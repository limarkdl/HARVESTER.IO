// THIS CODE HAS NEVER BEEN REFACTORED !!! //

// REFACTORING COMING SOON //

let TYPE_OF_CROPS = [];
let TYPE_OF_MACHINES = [];
let TYPE_OF_REAPERS = [];
let CONFIG = [];

let currentOBJ;
let zoomF = 1.0;
let DEFAULT_COLORS_INI;

let temp;

let fullScreenMode;

let DEFAULT_COLORS = [
    { name: "oats", color: "#C4BA9E" },
    { name: "wheat", color: "#F5DEB3" },
    { name: "corn", color: "#FBEC5D" },
    { name: "sunflower", color: "#FFC512" },
    { name: "sugar beet", color: "#D8D8D8" },
    { name: "beans", color: "#811E1E" },
    { name: "soy", color: "#D2C82E" },
    { name: "cotton", color: "#EEEDDE" },
    { name: "rye", color: "#DAE71E" },
    { name: "buckwheat", color: "#9C6217" },
    { name: "rice", color: "#FFFFFF" }
];

BackUp();

resetSettingsList();

// DELETE OBJECT IF IT HAS 'empty' ID //
function DamagedEraser() {
    for (let i = 0; i < CONFIG.length; i++) {
        let current = CONFIG[i];
        if (current[Object.keys(current)[0]] === '') {
            CONFIG.splice(i, 1);
        }
    }
}

// GET ALL TYPES OF MACHINES THAT ARE LISTED IN THE PARSED CSV TABLE
function getAllTypesMachines() {
    for (let i = 0; i < CONFIG.length; i++) {
        currentOBJ = CONFIG[i];
        temp = currentOBJ[Object.keys(currentOBJ)[4]];
        if (!TYPE_OF_MACHINES.includes(temp)) {
            TYPE_OF_MACHINES.push(temp);
        }
    }
}

// GET ALL TYPES OF CROP TYPES THAT ARE LISTED IN THE PARSED CSV TABLE
function getAllTypesCrops() {
    for (let i = 0; i < CONFIG.length; i++) {
        currentOBJ = CONFIG[i];
        temp = currentOBJ[Object.keys(currentOBJ)[1]];
        if (!TYPE_OF_CROPS.includes(temp)) {
            TYPE_OF_CROPS.push(temp);
        }
    }
}

// GET ALL TYPES OF REAPER TYPES THAT ARE LISTED IN THE PARSED CSV TABLE
function getAllTypesReapers() {
    for (let i = 0; i < CONFIG.length; i++) {
        currentOBJ = CONFIG[i];
        temp = currentOBJ[Object.keys(currentOBJ)[6]];
        if (!TYPE_OF_REAPERS.includes(temp)) {
            TYPE_OF_REAPERS.push(temp);
        }
    }
}

// RESTORING DEFAULT_COLOR TO THE ORIGINAL VALUES
function restoreToDefault() {
    DEFAULT_COLORS = [
        { name: "oats", color: "#C4BA9E" },
        { name: "wheat", color: "#F5DEB3" },
        { name: "corn", color: "#FBEC5D" },
        { name: "sunflower", color: "#FFC512" },
        { name: "sugar beet", color: "#D8D8D8" },
        { name: "beans", color: "#811E1E" },
        { name: "soy", color: "#D2C82E" },
        { name: "cotton", color: "#EEEDDE" },
        { name: "rye", color: "#DAE71E" },
        { name: "buckwheat", color: "#9C6217" },
        { name: "rice", color: "#FFFFFF" }
    ];
}

// CALCULATE THE WIDTH FOR AN ELEMENT IN THE GRID ACCORDING TO THE VIEWPORT.WIDTH
function calculateWidthForElement() {
    let width = window.innerWidth;
    return calculatedWidth = (width < 350) ? '30%' : 
        (width < 400) ? '30%' : 
        (width < 500) ? '23%' :
        (width < 600) ? '19%' :
        (width < 700) ? '18%' :
        (width < 800) ? '16%' :
        (width < 900) ? '15%' :
        (width < 1000) ? '13%' :
        (width < 1100) ? '12%' :
        (width < 1300) ? '11%' :
        (width < 1550) ? '8%' :
        '7%';
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
    // DEFAULT CHOSEN VISUAL TAB
    currentTab('visualContent');
}

// BACKING UP DEFAULT_COLORS TO BE ABLE TO RESTORE
function BackUp() {
    DEFAULT_COLORS_INI = DEFAULT_COLORS;
}

// CLEAR COLOR LIST ON THE PAGE
function clearListOfColors() {
    document.getElementsByClassName('SubSettingsList')[0].innerHTML = '';
}

// SET BACKGROUND OF THE GRID ELEMENT ACCORDING TO THE CLASS NAME WHICH IS THE SAME AS FIELD'S CROP TYPE // !!! CONTAINS LOGICAL ERROR, FIX IT ASAP !!!
function setBackground() {
    for (let i = 0; i < CONFIG.length; i++) {
        let nameOfRequiredColor = document.getElementsByClassName('insiderMainContent')[i].classList[1];
        let requiredIndexOfColor = DEFAULT_COLORS.findIndex(c => c.name === nameOfRequiredColor);
        if (typeof (requiredIndexOfColor) != 'undefined') {
            document.getElementsByClassName('insiderMainContent')[i].style.backgroundColor = getSafe(() => DEFAULT_COLORS[requiredIndexOfColor].color);
        }
    }
}

// HOT FIX WHEN SOME PROPERTIES OF OBJECT RETURN "ERROR UNDEFIED", ALLOWS TO SKIP SUCH ERRORS
function getSafe(fn, defaulVal) {
    try {
        if (typeof(fn()) === 'undefined') {
            return '';
        }
        return fn();
    } catch (e) {
        return '';
    }
}

function fullScreenToggle(element) {
    let el = document.getElementsByClassName(element)[0];
    if (document.fullscreenElement === element) {
        document.exitFullscreen();
    } else  {
        el.requestFullscreen();
    }
}

// MAIN GRID RENDER ALGORITHM, WHICH RERENDERS THE WHOLE GRID USING SOME EXTERNAL VALUES
function GridOfFieldsRender(type) {
    if (CONFIG.length > 0) {
        document.getElementsByClassName('waiterInfo')[0].innerHTML = '';
        document.getElementsByClassName("grid")[0].innerHTML = '';
    }
    document.body.style.cursor = 'wait';
    for (let i = 0; i < CONFIG.length; i++) {
        currentOBJ = CONFIG[i];
        let div = document.createElement("div");
        div.innerHTML = `<div onclick="showToChosenInfo(`
            + currentOBJ[Object.keys(currentOBJ)[0]] + `)" class="element_grid"><div class="insider"><div  class="insiderMainContent `
            + currentOBJ[Object.keys(currentOBJ)[1]] + `"><p>ID:`
            + currentOBJ[Object.keys(currentOBJ)[0]] + `</p><p class="`
            + Object.keys(currentOBJ)[1] + `">`
            + currentOBJ[Object.keys(currentOBJ)[1]] + ` ` + currentOBJ[Object.keys(currentOBJ)[2]] + `</p><p class="`
            + Object.keys(currentOBJ)[4] + `">`
            + currentOBJ[Object.keys(currentOBJ)[4]] + `</p><p class="`
            + Object.keys(currentOBJ)[5] + `">`
            + currentOBJ[Object.keys(currentOBJ)[5]] + `</p><p class="`
            + getSafe(() => Object.keys(currentOBJ)[6]) + `">`
            + getSafe(() => currentOBJ[Object.keys(currentOBJ)[6]]) + `</p></div><div class="bar" style="height:`
            + currentOBJ[Object.keys(currentOBJ)[3]] * 100 + `%"></div></div></div>`;
        div.style.width = calculateWidthForElement();
        div.id = "div" + String(i);
        document.getElementsByClassName("grid")[0].appendChild(div);
    }
    if (type !== 'resize') {
        setTimeout(function () { setBackground() }, 50);
    }
    document.body.style.cursor = 'default';
}

// WE CHECK IF CURRENT CROP HAS A DEFAULT COLOR TO DISPLAY
function getColorFromDEFAULT(cropName) {
    let obj = DEFAULT_COLORS.find(o => o.name === cropName);
    if (typeof obj != "undefined") {
        return obj.color;
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
    temp = document.getElementsByClassName('SubSettingsList')[1];
    temp.children[1].innerHTML = Object.keys(currentOBJ)[0] + ' ↓';
    temp.children[2].innerHTML = Object.keys(currentOBJ)[0] + ' ↑';
    temp.children[3].innerHTML = Object.keys(currentOBJ)[1] + ' ↓';
    temp.children[4].innerHTML = Object.keys(currentOBJ)[1] + ' ↑';
    temp.children[5].innerHTML = Object.keys(currentOBJ)[2] + ' ↓';
    temp.children[6].innerHTML = Object.keys(currentOBJ)[2] + ' ↑';
    temp.children[7].innerHTML = Object.keys(currentOBJ)[3] + ' ↓';
    temp.children[8].innerHTML = Object.keys(currentOBJ)[3] + ' ↑';
    temp.children[9].innerHTML = Object.keys(currentOBJ)[4];
    if (typeof(Object.keys(currentOBJ)[5]) !== 'undefined') {
        temp.children[10].innerHTML = Object.keys(currentOBJ)[5];
    } else {
        temp.children[10].remove();
    }
    if (typeof(Object.keys(currentOBJ)[6]) !== 'undefined') {
        temp.children[10].innerHTML = Object.keys(currentOBJ)[6];
    } else {
        temp.children[10].remove();
    }
    
}

// COPIES PROPERTY OF THE FIELD TO THE "CHOSEN FIELD" ON MOUSE CLICK
function showToChosenInfo(ID) {
    let el = document.getElementsByClassName('chosenInfoElement');
    let obj = CONFIG.find(c => c[Object.keys(c)[0]] === String(ID));
    el[1].innerText = '';
    temp = Object.keys(currentOBJ);
    for (let i = 1; i < 8;i++) {
        if (typeof(temp[i-1]) !== 'undefined') {
            el[i].innerHTML = temp[i-1] + ': ' + obj[Object.keys(obj)[i-1]];
        } else {
            el[i].remove();
        }
    }
    el[0].style.backgroundColor = getColorFromDEFAULT(obj[Object.keys(obj)[1]]);
}

// SHOW / HIDE TOOLS PANEL
function toggleTools() {
    document.getElementsByClassName("tools")[0].classList.toggle('disabled');
}

// SHOW / HIDE CHOSEN FIELD PANEL
function toggleChosenInfo() {
    document.getElementsByClassName("chosenInfo")[0].classList.toggle('isHidden');
}

// SORTS CONFIG BY CROP TYPE
function sortByCrop(type) {
    if (type === 'asc') {
        CONFIG.sort(function (a, b) {
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
        CONFIG.sort(function (a, b) {
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

// SORT CONFIG BY HARVESTER NAME // !!! THIS IS A PSEUDO SORTING THAT HAS NO SENSE AND CAN JUST ORDER THE MACHINES IN SOME MORE FANCY WAY. NEEDED TO BE REDESIGNED !!!
function sortByHarvester() {
    CONFIG.sort(function (a, b) {
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

// SORT CONFIG BY REAPER TYPE // !!! THIS IS A PSEUDO SORTING THAT HAS NO SENSE AND JUST ORDER THE REAPERS IN SOME MORE FANCY WAY. NEEDED TO BE REDESIGNED !!!
function sortByReaper() {
    CONFIG.sort(function (a, b) {
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
        for (let j = 0; j < TYPE_OF_CROPS.length; j++) {
            if (DEFAULT_COLORS.find(c => c.name === TYPE_OF_CROPS[i])) {
                IsFound = true;
                FIndex = DEFAULT_COLORS.findIndex(c => c.name === TYPE_OF_CROPS[i]);
            } else {
                IsFound = false;
            }
        }
        if (IsFound) {
            let el = document.createElement("label");
            el.innerHTML = `<label><input type="color" id="colorN` + i + `" onchange="updateListOfColors('` + DEFAULT_COLORS[FIndex].name + `','colorN` + i + `')" value="` + DEFAULT_COLORS[FIndex].color + `"> ` + DEFAULT_COLORS[FIndex].name + `</label>`;
            document.getElementsByClassName('SubSettingsList')[0].appendChild(el);
        }
    }
}

function resetSettingsList() {
    let node = document.getElementsByClassName('toolsContent')[0];
    for (let i = 0; i < node.childNodes.length; i++) {
        let child = node.childNodes[i];
        if (node.childNodes[i].nodeName === 'DIV') {
            child.classList.add('isHidden');
        }
    }
    for (let i = 0; i < 3; i++) {
        document.getElementsByClassName('toolsChosenTypeElement')[i].style.backgroundColor = '';
    }
}

function currentTab(type) {
    resetSettingsList();
    document.getElementsByClassName(type)[0].classList.toggle('isHidden');
    document.getElementById(type).style.backgroundColor = 'var(--main-color)';
}

function updateListOfColors(name, colorPickerId) {
    let itemIndex = DEFAULT_COLORS.findIndex(x => x.name === name)
    DEFAULT_COLORS[itemIndex].color = document.getElementById(colorPickerId).value;
    setTimeout(function () { setBackground() }, 200);
}

function zoomIn() {
    if (zoomF < 1.00) {
        zoomF += 0.05;
        document.getElementsByClassName('grid')[0].style.scale = String(zoomF);
    }
}

function zoomOut() {
    zoomF -= 0.05;
    document.getElementsByClassName('grid')[0].style.scale = String(zoomF);
}

function AddColorsToDefault() {
    for (let i = 0; i < CONFIG.length; i++) {
        let currentOBJ = CONFIG[i];
        let named = currentOBJ[Object.keys(currentOBJ)[1]];
        if (DEFAULT_COLORS.find(o => o.name === named)) {
        } else {
            let OBJECT = { name: named, color: getRandomColor() };
            DEFAULT_COLORS.push(OBJECT);
        }
    }
}

function CONFIGPARSER() {
    let file = document.getElementById('fileReceiver').files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        console.log(reader.result);
        Papa.parse(file, {
            header: true,
            complete: function (results) {
                console.log("Finished:", results.data);
                CONFIG = results.data;
                TYPE_OF_CROPS.length = 0;
                restoreToDefault();
                DamagedEraser();
                INITIALIZATION();
            }
        });
    }
    reader.onerror = function () {
        console.log(reader.error);
    }
}

document.getElementById("fileReceiver").addEventListener('change', function () {
    CONFIGPARSER();
    document.getElementsByClassName('input-file')[0].children[1].innerText = this.files[0].name;
    document.getElementsByClassName('input-file')[0].children[1].style.fontSize = "10px";
});

window.addEventListener('resize', function () {
    GridOfFieldsRender();
    if (window.innerWidth >= 1920) {
        document.getElementsByClassName('mainContent')[0].style.left = (window.innerWidth - document.getElementsByClassName('mainContent')[0].offsetWidth) / 2 + "px";
    } else {
        document.getElementsByClassName('mainContent')[0].style.left = 0;
    }
});