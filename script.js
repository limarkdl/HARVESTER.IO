/* DISCLAIMER:

THIS CODE HAS NEVER BEEN REFACTORED, COMING SOON

*/

// GENERIC VARIABLES //

// Default colors that will be applied to fields by default
const defaultCropColors = {
    wheat: '#ffd700',
    corn: '#ffdab9',
    rice: '#f4a460',
    potato: '#8b4513',
    tomato: '#ff6347',
    onion: '#b0e0e6',
    soybean: '#c0c0c0',
    sugarcane: '#f5deb3',
    barley: '#f0e68c',
    cotton: '#cbcb91',
    banana: '#bcc460',
    apple: '#dc8168',
    grapes: '#dda0dd',
    orange: '#ffa500',
    pineapple: '#ffd700',
    coconut: '#f5deb3',
    coffee: '#a0522d',
    cocoa: '#8b4513',
    tea: '#006400',
    rubber: '#708090',
    cashew: '#daa520',
    pepper: '#8d8181',
    cloves: '#cd853f',
    cinnamon: '#8b4513',
    ginger: '#ff7f50',
    nutmeg: '#a0522d',
    vanilla: '#f5deb3',
    olive: '#808000',
    almond: '#f0e68c',
    hazelnut: '#deb887'
};

// Default color for a 'Progress layer'
let doneColor = '#B2A999';

// Stores initial file with fields parameters
let receivedFile = [];

// Stores headers that received from file for more flexibility with headers name // !Useless!
let receivedFileHeaders;

// Stores the list of all received crops from the file
let listOfCrops;

// Stores 'slider's value and being used to generate this number of fields
let numToGenerate;

// The visibility state of the 'Progress layer'
let progressIsShowed = true;

// Array that stores fields that satisfy filter to display
let showOnlyArray = [];

// The visibility state of the 'Settings' element
let isElementVisible = false;

// The angle of rotation for 'Progress layer'
let processLayerAngle = 45;

// Parameters from URL
const params = new URLSearchParams(window.location.search);

// Headers from file
let idH, cropTypeH, densityH,complexityH,harvesterH,headerH,progressH;

// DOM ELEMENTS //

// <body></body>
const body = document.body;

// Slider that chooses the number of fields to generate
const slider = document.getElementById("myRange");

// Displays the current value of slider
const sliderValueDisplay = document.getElementById("slider-value-display");

// Content of Visual Tab in settings
const visualContent = document.getElementById('visualContent');

// Content of Sorting Tab in settings
const sortingContent = document.getElementById('sortingContent');

// Content of Misc Tab in settings
const miscContent = document.getElementById("miscContent");

// Contains all 'tab' elements
const menuTab = document.getElementById('menuTabs');

// Stores all children of 'menuTab'
const anyTab = menuTab.children;

// Tab element for Visuals
const visualTab = document.getElementById('visualTab');

// Tab element for Sorting
const sortingTab = document.getElementById('sortingTab');

// Tab element for Misc
const miscTab = document.getElementById('miscTab');

const fileUploadLabel = document.getElementById('fileUploadName');

const fileUploadElement = document.getElementById('fileUpload');

// Modal window is being used to display detailed information about the chosen field //

// Button for opening modal window
const openModalButton = document.getElementById("open-modal");

// Button for closing modal window
const closeModalButton = document.getElementById("close-modal");

// The main modal container, that 'appears'/'disappears'
const modalContainer = document.getElementById("modal-container");

// Selected crop from the list input to display
const mySelect = document.getElementById("mySelect");

// The main container that holds 'grid'
const container = document.getElementById("grid-container");

// Settings button for 'menu'/'settings'
const settingsButton = document.querySelector('#settings-btn');

// Settings element that 'appears'/'disappears'
const element = document.querySelector('#settings');

// Extremely dumb way to extend touchable area for menu button since it's very thin
const extraBtnZone = document.getElementById('extraBtnZone');

// Log Out button to return to the 'index.html'
const logoutButton = document.getElementById('logout-button');

// Unused element for displaying welcome message after log in
/*const welcomeMessage = document.getElementById('welcome-message');*/

// Fullscreen button to toggle fullscreen mode
const fullscreenButton = document.querySelector('.fullscreen-button');

// Unused variable to store username that are stored inside the URL
const username = params.get('username');


// EVENTS LISTENERS //

slider.addEventListener("input", function() {
    numToGenerate = this.value;
    sliderValueDisplay.textContent = this.value;
});

extraBtnZone.addEventListener('click', () => {
    // NEEDS TO BE REFACTORED AND REDESIGNED, POOR LOGIC //
    if (isElementVisible) {
        element.style.opacity = 0;element.style.visibility = "hidden"
        setTimeout(()=>{element.style.display = 'none';},300)
        isElementVisible = false;
    } else {
        element.style.display = 'flex';
        setTimeout(()=>{element.style.opacity = 1;element.style.visibility = "visible"},150)
        isElementVisible = true;
    }
});

// On 'click' toggles 'settings' // Adds extra zone since original 'menu' button is too thin
extraBtnZone.addEventListener('click', () => {
    settingsButton.classList.toggle('open');
});

// On 'click' toggles full screen mode
fullscreenButton.addEventListener('click', toggleFullscreen);

// On 'click' shows the modal window // !Useless! //
openModalButton.addEventListener("click", () => {
    modalContainer.style.visibility = 'visible';
    modalContainer.classList.add('modalOpen');
});

// On 'click' hides the modal window
closeModalButton.addEventListener("click", () => {
    modalContainer.style.visibility = 'hidden';
    modalContainer.classList.remove('modalOpen');
});

// On 'click' shows the modal windows to display detailed info about current field
modalContainer.addEventListener("click", (event) => {
    if (event.target === modalContainer) {
        modalContainer.style.visibility = 'hidden';
        modalContainer.classList.remove('modalOpen');
    }
});

// On 'click' redirects user to the 'index.html' page
logoutButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});


// INITIALIZATION //

// Changes current tab to misc, to display it first
changeCurrentTab('visual');
try {
    parseCSVStringAndGenerate(window.fieldCSV);
} catch (e) {
    console.log('Something went wrong...');
}
// CORE FUNCTIONS //

// Random mockup CSV generator
function generateCSV(type) {
    const Headers = ["ID", "Crop", "Density", "Complexity", "Harvester", "Header", "Progress"];
    const data = [];
    let HeaderTypes = ['Straight bar', 'Sickle bar', 'Rotary blade', 'Draper', 'Auger', 'Row-crop header',
        'Stripper header','Flex header','Pickup header','Disc header','Draper belt header','Side-delivery header','Floating cutterbar header','Combine header',
        'Stripper-combine header'];
    let harvesterNames = ['John Deere S700', 'Case IH 250','New Holland CR', 'Claas Lexion 700',
        'Massey Ferguson 9505','Gleaner S9', 'Challenger 700', 'Fendt IDEAL', 'Kubota M7 Gen 2',
        'AGCO IdealCombine', 'Versatile RT520', 'Rostselmash Vector 410', 'Deutz-Fahr 9',
        'Sampo-Rosenlew C10', 'Pottinger HIT 47N', 'Krone BiG X', 'Capello Quasar R8',
        'MacDon M1', 'Oxbo 6220', 'Braud 9090X'];
// Generate random data for each row
    for (let i = 0; i < numToGenerate; i++) {
        const ID = i + 1;
        const crops = Object.keys(defaultCropColors);
        const Crop = crops[Math.floor(Math.random() * crops.length)];
        const Density = randomFloat();
        const Complexity = randomFloat();
        const numOfHarvesters = Math.floor(Math.random() * 2);
        let harvester = harvesterNames[Math.floor(Math.random() * harvesterNames.length)];
        let Header = HeaderTypes[Math.floor(Math.random() * HeaderTypes.length)];
        if (numOfHarvesters) {
            harvester += ' + ' + harvesterNames[Math.floor(Math.random() * harvesterNames.length)];
            Header += ' + ' + HeaderTypes[Math.floor(Math.random() * HeaderTypes.length)]
        }
        const Progress = getRandomProcessValue();
        data.push([ID, Crop, Density, Complexity, harvester, Header, Progress]);
    }
    const csv = Headers.join(",") + "\n" + data.map(row => row.join(",")).join("\n");
    parseCSVStringAndGenerate(csv);
    getAndDisplayCropTypes();
    console.log(csv);
    if (type === 'file') {
        const link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
        link.setAttribute('download', 'fields.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        generateGrid(data);
    }
}

// Event function on file uploading
function parseThisFile(event) {
    let file = event.target.files[0];
    csvFileParser(file, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        showOnlyArray = receivedFile;
        fileUploadLabel.innerText = 'Current file: ' + fileUploadElement.files[0].name;
        getAndDisplayCropTypes();
        generateGrid(data);
        console.log(data);
    });
}

// CSV parser to an array of objects
function csvFileParser(file, callback) {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        try {
            let csv = reader.result;
            let lines = csv.split("\n");
            let Headers = lines[0].split(",");
            let result = [];
            for (let i = 1; i < lines.length; i++) {
                let obj = {};
                let currentLine = lines[i].split(",");
                for (let j = 0; j < Headers.length; j++) {
                    obj[Headers[j]] = currentLine[j];
                }
                result.push(obj);
            }
            receivedFileHeaders = Headers;
            receivedFile = result;
            storeReceivedHeaders();
            callback(null, result);
        } catch (e) {
            callback(e, null);
        }
    };
}

// Returns chosen property's value of chosen object
function getValueByProperty(obj, prop) {
    if (prop in obj) {
        return obj[prop];
    } else {
        return null;
    }
}

// Gets all 'crop' types from the file and stores it
function getAndDisplayCropTypes() {
    listOfCrops = [...new Set(receivedFile.map(item => item.Crop))];
    mySelect.innerHTML = "";
    let allCrops = document.createElement("option");
    allCrops.value = "all";
    allCrops.innerText = "All";
    mySelect.appendChild(allCrops);
    listOfCrops.forEach((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.text = value;
        mySelect.appendChild(option);
    });
}

// Returns color from 'defaultCropColors', otherwise returns a random
function autoColor(temp) {
    let current = temp[cropTypeH];
    return (getValueByProperty(defaultCropColors,current) != null) ? getValueByProperty(defaultCropColors,current) : getRandomColor();
}

// Generates a grid with fields and display them
function generateGrid(data) {
    console.log(data);
    container.innerHTML = "";
    if (data.length === 0) {
        let warning = document.createElement("h1");
        warning.innerText = "NO FIELDS FOUND FOR THIS FILTER";
        warning.id = "warningNotFound";
        container.appendChild(warning);
        return 0;
    }
    let currentCrop,currentDensity,currentComplexity,currentHarvester,currentHeader;
    let grid = document.createElement("div");
    grid.classList.add("grid");
    let delay = 0;
    for (let i = 0; i < data.length; i++) {
        let item = document.createElement("div");
        let temp = data[i];
        currentCrop = temp[cropTypeH];
        currentDensity = temp[densityH];
        currentComplexity = temp[complexityH];
        currentHarvester = temp[harvesterH];
        currentHeader = temp[headerH];
        let fieldBackground = document.createElement("div");
        let Progress = temp[progressH];
        let fieldNum = document.createElement("h2");
        let ProgressTxt = document.createElement("h2");
        let secondRow = document.createElement("div");
        let firstRow = document.createElement("div");
        firstRow.classList.add("first-row");
        secondRow.innerHTML = `<div class="second-row">
            <div class="Crop"><img src="media/CropICON.svg" alt="Crop"><h5>`+currentCrop+`</h5>
            </div>
            <div class="Density"><img src="media/DensityICON.svg" alt="Density"><h5>`+currentDensity+`</h5>
            </div>
            <div class="Complexity"><img src="media/ComplexityICON.svg" alt="Complexity">
                <h5>`+currentComplexity+`</h5></div>
            <div class="Harvester"><img src="media/HarvesterICON.svg" alt="Harvester"><div class="textLimit"><h5>`+currentHarvester+`</h5></div></div>
            <div class="Header"><img src="media/HeaderICON.svg" alt="Header"><div class="textLimitR"><h5>`+currentHeader+`</h5></div>
            </div>
        </div>`;
        ProgressTxt.style.display = 'block';
        ProgressTxt.innerText = Progress + '%';
        fieldNum.innerText = temp[idH];
        item.onclick = function(){showCurrentField(temp)};
        fieldNum.style.textShadow = '0px -1px #000, 1px -1px #000, 1px 0px #000, 1px 1px #000, 0px 1px #000, -1px 1px #000, -1px 0px #000, -1px -1px #000';
        fieldNum.style.color = '#ffffff';
        item.classList.add("grid-item");
        item.style.transitionDelay = delay+'s';
        fieldBackground.style.transitionDelay = delay+2+'s';
        item.style.background = autoColor(temp);
        fieldBackground.className = "fieldBackground";
        let linearGradient;
        setTimeout(()=>{
            container.style.opacity = '1';
            Progress = (Progress === '100') ? '99': Progress;
        },500)
        linearGradient = "linear-gradient(var(--process-layer-angle),var(--process-layer-color) " + Progress + "%,transparent 0%)";
        if (!progressIsShowed) {
            fieldBackground.classList.add('doneLayerIsHidden');
        }
        if (Progress === '100') {
            ProgressTxt.style.color = 'green';
            ProgressTxt.style.opacity = '1';
        } else {
            ProgressTxt.style.opacity = 'var(--process-layer-opacity)';
        }
        fieldBackground.style.backgroundImage = linearGradient;
        firstRow.appendChild(fieldNum);
        firstRow.appendChild(ProgressTxt);
        fieldBackground.appendChild(firstRow);
        fieldBackground.appendChild(secondRow);
        item.appendChild(fieldBackground);
        grid.appendChild(item);
        delay += 0.001;
        setTimeout(()=>{item.style.opacity = '1'},100);
    }
    container.appendChild(grid);
    document.getElementById('grid-container').style.opacity = '1';


    //NEEDS OPTIMIZATION AND REFACTORING!!!//
    setTimeout(()=>{
        let Harvester = document.getElementsByClassName('Harvester');
        let HeaderType = document.getElementsByClassName('Header');
        let TESTING_CONTAINER = document.getElementsByClassName('second-row');
        for (let i = 0; i < data.length;i++) {let LIMITOBJECT = document.getElementsByClassName('textLimit');
            if (Harvester[i].offsetWidth > (TESTING_CONTAINER[i].offsetWidth - 10)) {
                LIMITOBJECT[i].children[0].style.animation = 'scroll 10s linear infinite';
                let  overflow = Harvester[i].offsetWidth - TESTING_CONTAINER[i].offsetWidth + 20;
                LIMITOBJECT[i].children[0].style.setProperty('--slide-distance', `-` + overflow + `px`);
            }
            LIMITOBJECT = document.getElementsByClassName('textLimitR');
            if (HeaderType[i].offsetWidth > (TESTING_CONTAINER[i].offsetWidth - 10)) {
                LIMITOBJECT[i].children[0].style.animation = 'scroll 10s linear infinite';
                let  overflow = HeaderType[i].offsetWidth - TESTING_CONTAINER[i].offsetWidth + 20;
                LIMITOBJECT[i].children[0].style.setProperty('--slide-distance', `-` + overflow + `px`);
            }
        }},1000);
}

// Returns random color, but not too dark (64-255)(64-255)(64-255)(1)
function getRandomColor() {
    const r = Math.floor(Math.random() * 128) + 64;
    const g = Math.floor(Math.random() * 128) + 64;
    const b = Math.floor(Math.random() * 128) + 64;
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

// Sets 'Progress layer's angle
function setProgressLayerAngle(parameter) {
    processLayerAngle += (parameter === '+') ? 45 : -45;
    document.documentElement.style.setProperty('--process-layer-angle', processLayerAngle + 'deg');
}

// Returns random 'Process' value, 100s shows more often
function getRandomProcessValue() {
    // RETURNS '100' MORE OFTEN FOR VISUALIZATION
    const randomNumber = Math.floor(Math.random() * 5);
    if (randomNumber === 0) {
        return 100;
    } else {
        return Math.floor(Math.random() * 100);
    }
}

// Make from CSV string a 'grid'
function parseCSVStringAndGenerate(csvString) {
    const rows = csvString.split('\n');
    const Headers = rows[0].split(',');
    const data = [];
    for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(',');
        const obj = {};
        for (let j = 0; j < Headers.length; j++) {
            obj[Headers[j]] = values[j];
        }
        data.push(obj);
    }
    receivedFileHeaders = Headers;
    receivedFile = data;
    showOnlyArray = receivedFile;
    getAndDisplayCropTypes();
    storeReceivedHeaders();
    generateGrid(data);
}

// Changes color of the 'Process layer'
function updateDoneColor(value) {
    doneColor = value;
    document.documentElement.style.setProperty('--process-layer-color', doneColor);
}

function toggleFullscreen() {
    if (document.fullscreenElement) {
        document.webkitCancelFullScreen();
        document.exitFullscreen();
    } else {
        body.requestFullscreen();
        body.webkitRequestFullScreen();
    }
}

// Shows only this crop
function showOnlyThisCrop(crop) {
    showOnlyArray = (crop === 'all') ? receivedFile : receivedFile.filter(field => field.Crop === crop);
    generateGrid(showOnlyArray);
}

// Sorts 'showOnlyArray' in specified 'type' & 'order'
function sortBy(type,order) {
    switch(type) {
        case 'ID':
            sortArrayOfObjects(showOnlyArray,idH,order);
            break;
        case 'Density':
            sortArrayOfObjects(showOnlyArray,densityH,order);
            break;
        case 'Complexity':
            sortArrayOfObjects(showOnlyArray,complexityH,order);
            break;
        case 'Progress':
            sortArrayOfObjects(showOnlyArray,progressH,order);
            break;
        default:
            console.log('ERROR: SortBy(undefined)');
            return -1;
    }
    generateGrid(showOnlyArray);
}

// Sorting algorithm for integers/float numbers
function sortArrayOfObjects(arr, prop, order) {
    if (order === 'asc') {
        arr.sort(function(a, b) {
            return parseFloat(a[prop]) > parseFloat(b[prop]) ? 1 : -1;
        });
    } else if (order === 'desc') {
        arr.sort(function(a, b) {
            return parseFloat(a[prop]) < parseFloat(b[prop]) ? 1 : -1;
        });
    } else {
        console.log('Invalid order parameter');
    }
    return arr;
}

// Changes current tab with content
function changeCurrentTab(tab) {
    let temp = 'var(--second-color)';
    visualTab.style.background = temp;
    sortingTab.style.background = temp;
    miscTab.style.background = temp;
    let currentTab = tab + 'Tab';
    document.getElementById(currentTab).style.background = 'var(--main-color)';
    visualContent.style.display = 'none';
    sortingContent.style.display = 'none';
    miscContent.style.display = 'none';
    switch(tab) {
        case 'visual':
            visualContent.style.display = 'flex';
            break;
        case 'sorting':
            sortingContent.style.display = 'flex';
            break;
        case 'misc':
            miscContent.style.display = 'flex';
            break;
        default:
            console.log('ERROR: changecurrentTab(undefined)');
            return -1;
    }
}

// Toggles 'Progress layer' showing
function toggleProgress() {
    if (progressIsShowed) {
        for(let i = 0;i < document.getElementsByClassName('grid')[0].childElementCount;i++) {
            document.getElementsByClassName('fieldBackground')[i].classList.add('doneLayerIsHidden');
        }
        progressIsShowed = false;
    } else  {
        for(let i = 0;i < document.getElementsByClassName('grid')[0].childElementCount;i++) {
            document.getElementsByClassName('fieldBackground')[i].classList.remove('doneLayerIsHidden');
        }
        progressIsShowed = true;
    }
}

// Shows fields with a specific property from the file
function showSpecificFields(type) {
    switch (type) {
        case 'completed':
            showOnlyArray = receivedFile.filter(field => field.Progress === '100');
            break;
        case 'inProgress':
            showOnlyArray = receivedFile.filter(field => field.Progress !== '100');
            break;
        case 'all':
            showOnlyArray = receivedFile;
            break;
        default:
            console.log("ERROR: showSpecificFields(undefined)");
            return -1;
    }
    generateGrid(showOnlyArray);
}

// Opens modal windows and fills it with information about the field
function showCurrentField(field) {
    console.log(field);
    let modalWindow = document.querySelector('#modal');
    modalWindow.innerHTML = "";
    modalWindow.style.background = autoColor(field);
    let ID = document.createElement('h2');
    ID.innerText = 'Field ' + (field[idH]);
    let Density = document.createElement('h4');
    Density.innerText = 'Density: ' + (field[densityH]);
    let Complexity = document.createElement('h4');
    Complexity.innerText = 'Complexity: ' + (field[complexityH]);
    let Harvester = document.createElement('h4');
    Harvester.innerText = 'Harvester: ' + (field[harvesterH]);
    let Headers = document.createElement('h4');
    Headers.innerText = 'Header: ' + (field[headerH]);
    let Progress = document.createElement('h4');
    Progress.innerText = 'Completed: ' + (field[progressH]) + '%';
    modalWindow.appendChild(ID);
    modalWindow.appendChild(Density);
    modalWindow.appendChild(Complexity);
    modalWindow.appendChild(Harvester);
    modalWindow.appendChild(Headers);
    modalWindow.appendChild(Progress);
    modalContainer.style.visibility = 'visible';
    modalContainer.classList.add('modalOpen');
}

// Returns random float number
function randomFloat() {
    return Math.random().toFixed(2);
}

// Gets headers from the files and put it to the 'ReceivedHeaders' variable
function storeReceivedHeaders() {
    idH = receivedFileHeaders[0];
    cropTypeH = receivedFileHeaders[1];
    densityH = receivedFileHeaders[2];
    complexityH = receivedFileHeaders[3];
    harvesterH = receivedFileHeaders[4];
    headerH = receivedFileHeaders[5];
    progressH = receivedFileHeaders[6];
}

// Gives the file from fieldCSV.js to the user
function downloadDefaultCSV() {
    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(window.fieldCSV));
    link.setAttribute('download', 'defaultField.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}