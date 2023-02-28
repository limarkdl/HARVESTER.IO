/* DISCLAIMER:

THIS CODE HAS NEVER BEEN REFACTORED, COMING SOON

*/




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
    apple: '#ff69b4',
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

// Default color for a 'PROGRESS LAYER'
let doneColor = '#A18353';

// Stores initial file with fields parameters
let receivedFile = [];

// Stores headers that recieved from file for more flexibility with headers name // !Useless!
let receivedFileHeaders;

// Stores the list of all recieved crops from the file
let listOfCrops;

// The visibility state of the 'Progress layer'
let howMuchDoneIsShowed = true;

// Array that stores fields that satisfy filter to display
let showOnlyArray = [];

// The visibility state of the 'Settings' element
let isElementVisible = false;

// The angle of rotation for 'Progress layer'
let doneLayerDegree = 45;

const params = new URLSearchParams(window.location.search);

// DOM ELEMENTS //
const slider = document.getElementById("myRange");

const sliderValueDisplay = document.getElementById("slider-value-display");
const visualContent = document.getElementById('visualContent');
const sortingContent = document.getElementById('sortingContent');

const miscContent = document.getElementById("miscContent");
const visualTab = document.getElementById('visualTab');
const sortingTab = document.getElementById('sortingTab');

const miscTab = document.getElementById('miscTab');
const openModalButton = document.getElementById("open-modal");
const closeModalButton = document.getElementById("close-modal");
const modalContainer = document.getElementById("modal-container");

const mySelect = document.getElementById("mySelect");

const container = document.getElementById("grid-container");
const settingsButton = document.querySelector('#settings-btn');

const element = document.querySelector('#settings');
const extraBtnZone = document.getElementById('extraBtnZone');
const logoutButton = document.getElementById('logout-button');
/*const welcomeMessage = document.getElementById('welcome-message');*/




slider.addEventListener("input", function() {
    numToGenerate = this.value;
    sliderValueDisplay.textContent = numToGenerate;
});






function getAndDisplayCropTypes() {
    listOfCrops = [...new Set(receivedFile.map(item => item.fieldCrop))];
    mySelect.innerHTML = "";
    let allCrops = document.createElement("option");
    allCrops.value = "all";
    allCrops.innerText = "All";
    mySelect.appendChild(allCrops);
    listOfCrops.forEach(function(value) {

        let option = document.createElement("option");
        option.value = value;
        option.text = value;
        mySelect.appendChild(option);
    });

}

function csvFileParse(event) {
    let file = event.target.files[0];
    parseCsvFile(file, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
        generateGrid(data);
    });
}

function parseCsvFile(file, callback) {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        try {
            let csv = reader.result;
            let lines = csv.split("\n");
            let headers = lines[0].split(",");
            let result = [];
            for (let i = 1; i < lines.length; i++) {
                let obj = {};
                let currentLine = lines[i].split(",");
                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentLine[j];
                }
                result.push(obj);

            }
            receivedFileHeaders = headers;
            receivedFile = result;
            showOnlyArray = receivedFile;
            document.getElementsByClassName('file-upload-label')[0].innerText = 'Current file: ' + document.getElementById('file-upload').files[0].name;
            getAndDisplayCropTypes();
            callback(null, result);
        } catch (e) {
            callback(e, null);
        }
    };
}

function getProperty(obj, prop) {
    if (prop in obj) {
        return obj[prop];
    } else {
        return null; // or whatever you want to return if the property is not found
    }
}
function autoColor(temp) {
    let test = receivedFileHeaders[1];
    let current = temp[test];
    if (getProperty(defaultCropColors,current) != null) {
        return getProperty(defaultCropColors,current);
    } else {
        return getRandomBrightColor();
    }



}

function generateGrid(data) {

    container.innerHTML = "";
    if (data.length === 0) {
        let warning = document.createElement("h1");
        warning.innerText = "NO FIELDS FOUND FOR THIS FILTER";
        warning.id = "warningNotFound";
        container.appendChild(warning);
        return 0;
    }
    const cropType = receivedFileHeaders[1];
    const density = receivedFileHeaders[2];
    const complexity = receivedFileHeaders[3];
    const harvester = receivedFileHeaders[4];
    const reaper = receivedFileHeaders[5];
    let currentCrop,currentDensity,currentComplexity,currentHarvester,currentReaper;

    let grid = document.createElement("div");
    grid.classList.add("grid");
    let delay = 0;
    for (let i = 0; i < data.length; i++) {
        let item = document.createElement("div");
        let temp = data[i];
        currentCrop = temp[cropType];
        currentDensity = temp[density];
        currentComplexity = temp[complexity];
        currentHarvester = temp[harvester];
        currentReaper = temp[reaper];
        let fieldBackground = document.createElement("div");
        let howMuchDoneHeader = receivedFileHeaders[6];
        let howMuchDone = temp[howMuchDoneHeader];
        let fieldId = receivedFileHeaders[0];
        let fieldNum = document.createElement("h2");
        let howMuchDoneText = document.createElement("h2");
        let secondRow = document.createElement("div");
        let firstRow = document.createElement("div");
        firstRow.classList.add("first-row");
        secondRow.innerHTML = `<div class="second-row">
            <div class="fieldCrop"><img src="CropICON.svg" alt="Crop"><h5>`+currentCrop+`</h5>
            </div>
            <div class="fieldDensity"><img src="DensityICON.svg" alt="Density"><h5>`+currentDensity+`</h5>
            </div>
            <div class="fieldComplexity"><img src="ComplexityICON.svg" alt="Complexity">
                <h5>`+currentComplexity+`</h5></div>
            <div class="fieldHarvester"><img src="HarvesterICON.svg" alt="Harvester"><div class="textLimit"><h5>`+currentHarvester+`</h5></div></div>
            <div class="fieldReaper"><img src="ReaperICON.svg" alt="Reaper"><div class="textLimitR"><h5>`+currentReaper+`</h5></div>
            </div>
        </div>`;
        howMuchDoneText.style.display = 'block';
        howMuchDoneText.innerText = howMuchDone + '%';
        fieldNum.innerText = temp[fieldId];
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
            howMuchDone = (howMuchDone === '100') ? '99': howMuchDone;

        },500)
        linearGradient = "linear-gradient(var(--done-degree),var(--done-color) " + howMuchDone + "%,transparent 0%)";
        if (!howMuchDoneIsShowed) {
            fieldBackground.classList.add('doneLayerIsHidden');
        }
        if (howMuchDone === '100') {
            howMuchDoneText.style.color = 'green';
            howMuchDoneText.style.opacity = '1';
        } else {
            howMuchDoneText.style.opacity = 'var(--done-percent-opacity)';
        }
        fieldBackground.style.backgroundImage = linearGradient;
        firstRow.appendChild(fieldNum);
        firstRow.appendChild(howMuchDoneText);
        fieldBackground.appendChild(firstRow);
        fieldBackground.appendChild(secondRow);
        item.appendChild(fieldBackground);
        grid.appendChild(item);
        delay += 0.001;
        setTimeout(()=>{item.style.opacity = '1'},100);

    }
    container.appendChild(grid);
    document.getElementById('grid-container').style.opacity = '1';

    setTimeout(()=>{
        let fieldHarvester = document.getElementsByClassName('fieldHarvester');
        let reaperType = document.getElementsByClassName('fieldReaper');
        let TESTING_CONTAINER = document.getElementsByClassName('second-row');

        for (let i = 0; i < data.length;i++) {let LIMITOBJECT = document.getElementsByClassName('textLimit');
        if (fieldHarvester[i].offsetWidth > (TESTING_CONTAINER[i].offsetWidth - 10)) {
            LIMITOBJECT[i].children[0].style.animation = 'scroll 10s ease-out infinite';
            let  overflow = fieldHarvester[i].offsetWidth - TESTING_CONTAINER[i].offsetWidth + 20;
            LIMITOBJECT[i].children[0].style.setProperty('--slide-distance', `-` + overflow + `px`);
            /*console.log('SET SCROLL FOR ' + index +` ` + fieldHarvester[i].offsetWidth + `
            ` + TESTING_CONTAINER[i].offsetWidth + ` ` + LIMITOBJECT[i].offsetWidth);*/
        }
        LIMITOBJECT = document.getElementsByClassName('textLimitR');
        if (reaperType[i].offsetWidth > (TESTING_CONTAINER[i].offsetWidth - 10)) {
                LIMITOBJECT[i].children[0].style.animation = 'scroll 10s ease-out infinite';
                let  overflow = reaperType[i].offsetWidth - TESTING_CONTAINER[i].offsetWidth + 20;
                LIMITOBJECT[i].children[0].style.setProperty('--slide-distance', `-` + overflow + `px`);
        }
        }},1000);
}



function getRandomBrightColor() {
    const r = Math.floor(Math.random() * 128) + 64;
    const g = Math.floor(Math.random() * 128) + 64;
    const b = Math.floor(Math.random() * 128) + 64;
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

function setDoneLayerDegree(parameter) {
    doneLayerDegree += (parameter === '+') ? 45 : -45;
    document.documentElement.style.setProperty('--done-degree', doneLayerDegree + 'deg');
}

function generateCSV(type) {
    const headers = ["fieldID", "fieldCrop", "fieldDensity", "fieldComplexity", "harvester", "reaper", "IsDoneFor"];

    const data = [];
    let reaperTypes = ['Draper', 'Auger', 'Corn', 'Flex', 'Stripper', 'Rice',
        'Shaker','Grape','Potato','Soybean','Sorghum','Flax','Haybine','Cotton','Carrot','Onion','Sugar cane'];
    let harvesterNames = ['John Deere S700', 'Case IH 250','New Holland CR', 'Claas Lexion 700',
        'Massey Ferguson 9505','Gleaner S9', 'Challenger 700', 'Fendt IDEAL', 'Kubota M7 Gen 2',
        'AGCO IdealCombine', 'Versatile RT520', 'Rostselmash Vector 410', 'Deutz-Fahr 9',
        'Sampo-Rosenlew C10', 'Pottinger HIT 47N', 'Krone BiG X', 'Capello Quasar R8',
        'MacDon M1', 'Oxbo 6220', 'Braud 9090X'];
// Generate random data for each row
    for (let i = 0; i < numToGenerate; i++) {
        // Generate a random ID number between 1 and 100
        const fieldID = i + 1;

        // Generate a random crop from the list of 30 most popular crops
        const crops = Object.keys(defaultCropColors);
        const fieldCrop = crops[Math.floor(Math.random() * crops.length)];
        // Generate a random field density and complexity with 2 decimal points
        const fieldDensity = randomFloat();
        const fieldComplexity = randomFloat();

        // Generate a random harvester name and reaper status
        const harvester = harvesterNames[Math.floor(Math.random() * 20)] + ' + ' + harvesterNames[Math.floor(Math.random() * 20)];
        const reaper = reaperTypes[Math.floor(Math.random() * 16)] + ' + ' + reaperTypes[Math.floor(Math.random() * 16)];
        const IsDoneFor = generateProgress();
        // Add the row data to the array
        data.push([fieldID, fieldCrop, fieldDensity, fieldComplexity, harvester, reaper,IsDoneFor]);
    }

// Convert the data to a CSV string
    const csv = headers.join(",") + "\n" + data.map(row => row.join(",")).join("\n");
    parseCSVStringAndGenerate(csv);
    getAndDisplayCropTypes();
// Print the CSV string to the console
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
    // Download the CSV file

}


// RETURN '100' MORE OFTEN FOR VISUALIZATION
function generateProgress() {
    const randomNumber = Math.floor(Math.random() * 5);
    if (randomNumber === 0) {
        return 100;
    } else {
        return Math.floor(Math.random() * 100);
    }
}

function parseCSVStringAndGenerate(csvString) {
    const rows = csvString.split('\n');
    const headers = rows[0].split(',');
    const data = [];

    for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(',');
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = values[j];
        }
        data.push(obj);
    }

    receivedFileHeaders = headers;
    receivedFile = data;
    showOnlyArray = receivedFile;
    getAndDisplayCropTypes();
    generateGrid(data);
}

function updateDoneColor(value) {
    doneColor = value;
    document.documentElement.style.setProperty('--done-color', doneColor);
}




extraBtnZone.addEventListener('click', () => {
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

const fullscreenButton = document.querySelector('.fullscreen-button');
const body = document.body;

// Обработчик клика на кнопке
fullscreenButton.addEventListener('click', toggleFullscreen);

// Функция переключения полноэкранного режима
function toggleFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        body.requestFullscreen();
    }
}


extraBtnZone.addEventListener('click', () => {
    settingsButton.classList.toggle('open');
});

function showOnlyThisCrop(crop) {
    showOnlyArray = (crop === 'all') ? receivedFile : receivedFile.filter(field => field.fieldCrop === crop);
    generateGrid(showOnlyArray);
}


function sortByID(order) {
    sortArrayOfObjects(showOnlyArray,receivedFileHeaders[0],order);
    generateGrid(showOnlyArray);
    /*document.getElementById('grid-container').style.opacity = '0';
    setTimeout(()=>{generateGrid(showOnlyArray)},1000);*/
}

function sortByDensity(order) {
    sortArrayOfObjects(showOnlyArray,receivedFileHeaders[2],order);
    generateGrid(showOnlyArray);
    /*document.getElementById('grid-container').style.opacity = '0';
    setTimeout(()=>{generateGrid(showOnlyArray)},1000);*/
}

function sortByComplexity(order) {
    sortArrayOfObjects(showOnlyArray,receivedFileHeaders[3],order);
    generateGrid(showOnlyArray);
    /*document.getElementById('grid-container').style.opacity = '0';
    setTimeout(()=>{generateGrid(showOnlyArray)},1000);*/
}

function sortByProgress(order) {
    sortArrayOfObjects(showOnlyArray,receivedFileHeaders[6],order);
    generateGrid(showOnlyArray);
    /*document.getElementById('grid-container').style.opacity = '0';
    setTimeout(()=>{generateGrid(showOnlyArray)},1000);*/
}

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


function changeCurrentTab(tab) {
    visualTab.style.background = 'var(--second-color)';
    sortingTab.style.background = 'var(--second-color)';
    miscTab.style.background = 'var(--second-color)';
    let currentTab = tab + 'Tab';
    document.getElementById(currentTab).style.background = 'var(--main-color)';

    visualContent.style.display = 'none';
    sortingContent.style.display = 'none';
    miscContent.style.display = 'none';


    if (tab === 'visual') {
        visualContent.style.display = 'flex';
    } else if (tab === 'sorting') {
        sortingContent.style.display = 'flex';
    } else if (tab === 'misc') {
        miscContent.style.display = 'flex';
    }

}


function toggleHowMuchDone() {
    if (howMuchDoneIsShowed) {
        for(let i = 0;i < document.getElementsByClassName('grid')[0].childElementCount;i++) {
           document.getElementsByClassName('fieldBackground')[i].classList.add('doneLayerIsHidden');
        }
        howMuchDoneIsShowed = false;
    } else  {
        for(let i = 0;i < document.getElementsByClassName('grid')[0].childElementCount;i++) {
            document.getElementsByClassName('fieldBackground')[i].classList.remove('doneLayerIsHidden');
        }
        howMuchDoneIsShowed = true;
    }
}

function showOnlyCompleted() {
    showOnlyArray = receivedFile.filter(field => field.IsDoneFor === '100');
    console.log(showOnlyArray);
    generateGrid(showOnlyArray);
}

function showAll() {
    showOnlyArray = receivedFile;
    generateGrid(showOnlyArray);
}

function showOnlyUncompleted() {
    showOnlyArray = receivedFile.filter(field => field.IsDoneFor !== '100');
    console.log(showOnlyArray);
    generateGrid(showOnlyArray);
}


openModalButton.addEventListener("click", () => {
    modalContainer.style.visibility = 'visible';
    modalContainer.classList.add('modalOpen');
});

closeModalButton.addEventListener("click", () => {
    modalContainer.style.visibility = 'hidden';
    modalContainer.classList.remove('modalOpen');
});

function showCurrentField(field) {
    console.log(field);
    let modalWindow = document.querySelector('#modal');
    modalWindow.innerHTML = "";
    modalWindow.style.background = autoColor(field);
    let fieldId = document.createElement('h2');
    fieldId.innerText = 'Field ' + (field[Object.keys(field)[0]]);
    let fieldDensity = document.createElement('h4');
    fieldDensity.innerText = 'Density: ' + (field[Object.keys(field)[2]]);
    let fieldComplexity = document.createElement('h4');
    fieldComplexity.innerText = 'Complexity: ' + (field[Object.keys(field)[3]]);
    let harvestersName = document.createElement('h4');
    harvestersName.innerText = 'Harvester: ' + (field[Object.keys(field)[4]]);
    let reapers = document.createElement('h4');
    reapers.innerText = 'Reaper: ' + (field[Object.keys(field)[5]]);
    let doneFor = document.createElement('h4');
    doneFor.innerText = 'Completed: ' + (field[Object.keys(field)[6]]) + '%';

    modalWindow.appendChild(fieldId);
    modalWindow.appendChild(fieldDensity);
    modalWindow.appendChild(fieldComplexity);
    modalWindow.appendChild(harvestersName);
    modalWindow.appendChild(reapers);
    modalWindow.appendChild(doneFor);



    modalContainer.style.visibility = 'visible';
    modalContainer.classList.add('modalOpen');
}

modalContainer.addEventListener("click", (event) => {
    if (event.target === modalContainer) {
        modalContainer.style.visibility = 'hidden';
        modalContainer.classList.remove('modalOpen');
    }
});


const username = params.get('username');
/*welcomeMessage.innerText = 'Добро пожаловать,' + username +'!';*/


logoutButton.addEventListener('click', () => {
    // При нажатии на кнопку "Выйти" перенаправляем на страницу авторизации
    window.location.href = 'index.html';
});

function randomFloat() {
    return Math.random().toFixed(2);
}