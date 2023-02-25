const cropColors = {
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

let recievedFile = [];
let recievedFileHeaders;

let howMuchDoneIsShowed = true;

let showOnlyArray = [];

const slider = document.getElementById("myRange");
const sliderValueDisplay = document.getElementById("slider-value-display");

const visualContent = document.getElementById('visualContent');
const sortingContent = document.getElementById('sortingContent');
const miscContent = document.getElementById("miscContent");

const visualTab = document.getElementById('visualTab');
const sortingTab = document.getElementById('sortingTab');
const miscTab = document.getElementById('miscTab');



let numToGenerate = 0;

changeCurrentTab('misc');


slider.addEventListener("input", function() {
    numToGenerate = this.value;
    sliderValueDisplay.textContent = numToGenerate;
});



function csvFileParse(event) {
    let file = event.target.files[0];
    parseCsvFile(file, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
        console.log("TYPE OF DATA" + typeof(data));

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
            recievedFileHeaders = headers;
            recievedFile = result;
            showOnlyArray = recievedFile;
            document.getElementsByClassName('file-upload-label')[0].innerText = 'Current file: ' + document.getElementById('file-upload').files[0].name;

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
    let test = recievedFileHeaders[1];
    let current = temp[test];
    if (getProperty(cropColors,current) != null) {
        return getProperty(cropColors,current);
    } else {
        return getRandomColor();
    }



}

function generateGrid(data) {
    let container = document.getElementById("grid-container");
    container.innerHTML = "";
    if (data.length === 0) {
        let warning = document.createElement("h1");
        warning.innerText = "NO FIELDS FOUND FOR THIS FILTER";
        warning.id = "warningNotFound";
        container.appendChild(warning);
        return 0;
    }


    const cropType = recievedFileHeaders[1];
    console.log("CropType"+ cropType);
    const density = recievedFileHeaders[2];
    console.log("density"+ density);
    const complexity = recievedFileHeaders[3];
    console.log("complexity"+ complexity);
    const harvester = recievedFileHeaders[4];
    console.log("harvester"+ harvester);
    const reaper = recievedFileHeaders[5];
    console.log("reaper"+ reaper);
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
        let howMuchDoneHeader = recievedFileHeaders[6];
        let howMuchDone = temp[howMuchDoneHeader];
        let fieldId = recievedFileHeaders[0];
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
            <div class="fieldReaper"><img src="ReaperICON.svg" alt="Reaper"><h5>`+currentReaper+`</h5>
            </div>
        </div>`;
        howMuchDoneText.style.display = 'block';
        if (howMuchDone === '100') {
            howMuchDoneText.style.mixBlendMode = 'unset';
            howMuchDoneText.style.opacity = '100% !important';
            howMuchDoneText.style.color = 'green';
        } else {
            /*howMuchDoneText.style.mixBlendMode = 'overlay';*/
        }

        howMuchDoneText.style.display = 'block';
        howMuchDoneText.innerText = howMuchDone + '%';
        fieldNum.innerText = temp[fieldId];
        fieldNum.style.textShadow = '0px -1px #000, 1px -1px #000, 1px 0px #000, 1px 1px #000, 0px 1px #000, -1px 1px #000, -1px 0px #000, -1px -1px #000';
        fieldNum.style.color = '#ffffff';
        item.classList.add("grid-item");
        item.style.transitionDelay = delay+'s';
        fieldBackground.style.transitionDelay = delay+2+'s';
        item.style.background = autoColor(temp);

        fieldBackground.classList.add("fieldBackground");
        let linearGradient;
        if (howMuchDoneIsShowed) {
            linearGradient =  "linear-gradient(45deg,var(--done-color) "+ howMuchDone +"%, transparent 0%)";
        } else {
            linearGradient =  "linear-gradient(45deg,var(--done-color) "+ howMuchDone +"% 0% !important, transparent 0%)";
        }

        if (howMuchDone === '100') {
            linearGradient =  "linear-gradient(45deg,var(--done-color) 99%, transparent 0%)";
        }


        console.log(linearGradient);
        fieldBackground.style.backgroundImage = linearGradient;


        setTimeout(()=>{item.style.opacity = 1;},100);
        firstRow.appendChild(fieldNum);
        firstRow.appendChild(howMuchDoneText);
        fieldBackground.appendChild(firstRow);
        fieldBackground.appendChild(secondRow);
        item.appendChild(fieldBackground);
        grid.appendChild(item);
        delay += 0.001;
        setTimeout(()=>{container.style.opacity = '1';
            if (howMuchDone === '100') {
                howMuchDoneText.style.opacity = '1';
            } else {
                howMuchDoneText.style.opacity = 'var(--done-percent-opacity)';
            }

        },600)
    }
    container.appendChild(grid);
    document.getElementById('grid-container').style.opacity = '1';

    setTimeout(()=>{
        let TEXT_TESTING = document.getElementsByClassName('fieldHarvester');
        let TESTING_CONTAINER = document.getElementsByClassName('second-row');
        let LIMITOBJECT = document.getElementsByClassName('textLimit');
        for (let i = 0; i < data.length;i++) {

        if (TEXT_TESTING[i].offsetWidth > (TESTING_CONTAINER[i].offsetWidth - 10)) {
            LIMITOBJECT[i].children[0].style.animation = 'scroll 10s linear infinite';
            /*console.log('SET SCROLL' + TEXT_TESTING[i].offsetWidth + TESTING_CONTAINER[i].offsetWidth);*/
        }}},1000);
}

function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateCSV(type) {
    // Define the headers for the CSV file
    const headers = ["fieldID", "fieldCrop", "fieldDensity", "fieldComplexity", "harvester", "reaper", "IsDoneFor"];

// Define a function to generate a random number with 2 decimal points
    function randomFloat() {
        return Math.random().toFixed(2);
    }

// Define the number of rows to generate
    const numRows = numToGenerate;

// Create an array to hold the data for each row
    const data = [];
    let reaperTypes = ['Narrow', 'Medium', 'Wide', 'Extra-Wide'];
    let harvesterNames = ['John Deere S700', 'Case IH 250','New Holland CR', 'Claas Lexion 700',
        'Massey Ferguson 9505','Gleaner S9', 'Challenger 700', 'Fendt IDEAL', 'Kubota M7 Gen 2',
        'AGCO IdealCombine', 'Versatile RT520', 'Rostselmash Vector 410', 'Deutz-Fahr 9',
        'Sampo-Rosenlew C10', 'Pottinger HIT 47N', 'Krone BiG X', 'Capello Quasar R8',
        'MacDon M1', 'Oxbo 6220', 'Braud 9090X'];
// Generate random data for each row
    for (let i = 0; i < numRows; i++) {
        // Generate a random ID number between 1 and 100
        const fieldID = i + 1;

        // Generate a random crop from the list of 30 most popular crops
        const crops = Object.keys(cropColors);
        const fieldCrop = crops[Math.floor(Math.random() * crops.length)];
        // Generate a random field density and complexity with 2 decimal points
        const fieldDensity = randomFloat();
        const fieldComplexity = randomFloat();

        // Generate a random harvester name and reaper status
        const harvester = harvesterNames[Math.floor(Math.random() * 20)];
        const reaper = reaperTypes[Math.floor(Math.random() * 4)];
        const IsDoneFor = generateProgress();
        // Add the row data to the array
        data.push([fieldID, fieldCrop, fieldDensity, fieldComplexity, harvester, reaper,IsDoneFor]);
    }

// Convert the data to a CSV string
    const csv = headers.join(",") + "\n" + data.map(row => row.join(",")).join("\n");

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
        parseCsvFile(csv);

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


const settingsButton = document.querySelector('#settings-btn');
const element = document.querySelector('#settings');

let isElementVisible = false;

const extraBtnZone = document.getElementById('extraBtnZone');


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


function sortByID(order) {
    sortArrayOfObjects(showOnlyArray,recievedFileHeaders[0],order);
    generateGrid(showOnlyArray);
    /*document.getElementById('grid-container').style.opacity = '0';
    setTimeout(()=>{generateGrid(showOnlyArray)},1000);*/
}

function sortByDensity(order) {
    sortArrayOfObjects(showOnlyArray,recievedFileHeaders[2],order);
    generateGrid(showOnlyArray);
    /*document.getElementById('grid-container').style.opacity = '0';
    setTimeout(()=>{generateGrid(showOnlyArray)},1000);*/
}

function sortByComplexity(order) {
    sortArrayOfObjects(showOnlyArray,recievedFileHeaders[3],order);
    generateGrid(showOnlyArray);
    /*document.getElementById('grid-container').style.opacity = '0';
    setTimeout(()=>{generateGrid(showOnlyArray)},1000);*/
}

function sortByProgress(order) {
    sortArrayOfObjects(showOnlyArray,recievedFileHeaders[6],order);
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
            let str = document.getElementsByClassName('fieldBackground')[i].style.backgroundImage;
            str = str.substring(0, 43) + ' 0% !important' + str.substring(43);
            document.getElementsByClassName('fieldBackground')[i].style.backgroundImage = str;
            console.log(str);
        }
        howMuchDoneIsShowed = false;
    } else  {
        for(let i = 0;i < document.getElementsByClassName('grid')[0].childElementCount;i++) {
            let str = document.getElementsByClassName('fieldBackground')[i].style.backgroundImage;
            str = str.substring(0, 43) + str.substring(57);
            document.getElementsByClassName('fieldBackground')[i].style.backgroundImage = str;
            console.log(str);
        }
        howMuchDoneIsShowed = true;
    }
}


function showOnlyCompleted() {
    let counter = 0;
    showOnlyArray = [];
    for(let i=0;i<recievedFile.length;i++) {

        let current = recievedFile[i];
        let howMuchDone = current[recievedFileHeaders[6]];
        if (howMuchDone === '100') {
            showOnlyArray[counter] = current;
            counter++;
        }

    }
    console.log(showOnlyArray);
    generateGrid(showOnlyArray);
}

function showAll() {
    showOnlyArray = recievedFile;
    generateGrid(showOnlyArray);

}

function showOnlyUncompleted() {
    let counter = 0;
    showOnlyArray = [];
    for(let i=0;i<recievedFile.length;i++) {
        let current = recievedFile[i];
        let howMuchDone = current[recievedFileHeaders[6]];
        if (howMuchDone !== '100') {
            showOnlyArray[counter] = current;
            counter++;
        }

    }
    console.log(showOnlyArray);
    generateGrid(showOnlyArray);
}



