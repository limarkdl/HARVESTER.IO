let TYPES_OF_CROPS = [];
let TYPE_OF_MACHINES = [];
let TYPES_OF_REAPERS = [];

let CONFIG = [];

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

let TOGGLE_ARRAY = ['','mobile'];

// BASIC INITIALIZATION //


toggleChosenInfo();


//// FUNCTIONS LIST

// DYNAMIC LIST OF FIELDS.CROPS / REAPER.TYPES / MACHINE.TYPES

function fixThisGrid() {
    TOGGLE_ARRAY.reverse();
    GridOfFieldsRender(TOGGLE_ARRAY[0]);
    console.log(TOGGLE_ARRAY[0]);
}

function getAllTypesMachines() {
    for(let i = 0;i < CONFIG.length;i++) {
        if (!TYPE_OF_MACHINES.includes(CONFIG[i].harvesterName)) {
            TYPE_OF_MACHINES.push(CONFIG[i].harvesterName);
        }
    }
}

function getAllTypesCrops() {
    for(let i = 0;i < CONFIG.length;i++) {
        if (!TYPES_OF_CROPS.includes(CONFIG[i].fieldCrop)) {
            TYPES_OF_CROPS.push(CONFIG[i].fieldCrop);
        }
    }
}

function getAllTypesReapers() {
    for(let i = 0; i < CONFIG.length;i++) {
        if (!TYPES_OF_REAPERS.includes(CONFIG[i].reaperType)) {
            TYPES_OF_REAPERS.push(CONFIG[i].reaperType);
        }
    }
}



function GridOfFieldsRender(type) {
    let numOfFields = CONFIG.length;
    if (type === "mobile") {
        var CONST_WIDTH_MOBILE = "20vw";
    }
    document.getElementsByClassName("grid")[0].innerHTML = "";

    for(let i = 0;i < numOfFields;i++) {
        let div = document.createElement("div");
        div.innerHTML = `<div onclick="showToChosenInfo(`+ CONFIG[i].fieldId+`)" class="element_grid"><div class="insider"><div style="background-color: `+getColor(CONFIG[i].fieldCrop)+`" class="insiderMainContent `
            +CONFIG[i].fieldCrop +`"><p>ID:`
            +CONFIG[i].fieldId+`</p><p>`
            +CONFIG[i].fieldCrop+`</p><p>`
            +CONFIG[i].fieldDensity+`</p><p>`
            +CONFIG[i].harvesterName+`</p><p>`
            +CONFIG[i].harvesterType+`</p><p>`
            +CONFIG[i].reaperType+`</p></div><div class="bar" style="height:`
            +CONFIG[i].fieldComplexity * 100 +`%"></div></div></div>`;
        if (CONST_WIDTH_MOBILE != undefined) {

            div.style.width = CONST_WIDTH_MOBILE;
        } else {
            let flexWidth =  Math.round(100/Math.sqrt(numOfFields));
            div.style.width = '10%';
        }


        div.id = "div" + String(i);

        document.getElementsByClassName("grid")[0].appendChild(div);
    }
}


function getColor(cropName) {
    let obj = DEFAULT_COLORS.find(o => o.name === cropName);
    if (obj != undefined) {
        return obj.color;
    }
}

function showToChosenInfo(ID) {
    document.getElementsByClassName('chosenInfoElement')[1].innerText = '';



    let obj = CONFIG.find(c => c.fieldId == ID);
    document.getElementsByClassName('chosenInfoElement')[1].innerText = 'fID: ' + obj.fieldId;
    document.getElementsByClassName('chosenInfoElement')[2].innerText = 'fCrop: ' + obj.fieldCrop;
    document.getElementsByClassName('chosenInfoElement')[3].innerText = 'fDensity: ' + obj.fieldDensity;
    document.getElementsByClassName('chosenInfoElement')[4].innerText = 'fCompl: ' + obj.fieldComplexity;
    document.getElementsByClassName('chosenInfoElement')[5].innerText = 'hModel: ' + obj.harvesterName;
    document.getElementsByClassName('chosenInfoElement')[6].innerText = 'hType: ' + obj.harvesterType;
    document.getElementsByClassName('chosenInfoElement')[7].innerText = 'rType: ' + obj.reaperType;
    document.getElementsByClassName('chosenInfoElement')[0].style.backgroundColor = getColor(obj.fieldCrop);

}

function toggleTools() {
    document.getElementsByClassName("tools")[0].classList.toggle('isShowed');
}

function toggleChosenInfo() {
    document.getElementsByClassName("chosenInfo")[0].classList.toggle('isShowed');
}

function resultOfImport(status) {
    let resultOfImport = document.getElementById('resultOfImport');
    resultOfImport.innerText = '';
    if (status == true) {
       resultOfImport.innerText = 'SUCCESSFULLY LOADED AND PARSED';
       resultOfImport.style.color = 'white';
       resultOfImport.style.backgroundColor = 'green';

    } else {
        resultOfImport.innerText = 'AN ERROR HAS OCCURRED';
        resultOfImport.style.color = 'white';
        resultOfImport.style.backgroundColor = 'red';
    }
}

function sortByCrop() {
    CONFIG.sort(function(a, b) {
            const cropA = a.fieldCrop.toUpperCase();
            const cropB = b.fieldCrop.toUpperCase();
            if (cropA > cropB) {
                return -1;
            }
            if (cropA < cropB) {
                return 1;
            }
            return 0;
        });
    GridOfFieldsRender();
}

function sortByID(type) {
    if (type === 'desc') {CONFIG.sort(
        (p1, p2) =>
            (parseInt(p1.fieldId) < parseInt(p2.fieldId)) ? 1 : (parseInt(p1.fieldId) > parseInt(p2.fieldId)) ? -1 : 0);
    } else {
        CONFIG.sort(
            (p1, p2) =>
                (parseInt(p1.fieldId) > parseInt(p2.fieldId)) ? 1 : (parseInt(p1.fieldId) < parseInt(p2.fieldId)) ? -1 : 0);
    }
    GridOfFieldsRender();
}

function sortByDensity(type) {
    if (type === 'desc') {
        CONFIG.sort(
            (p1, p2) => (p1.fieldDensity > p2.fieldDensity) ? 1 : (p1.fieldDensity < p2.fieldDensity) ? -1 : 0);
    } else {
        CONFIG.sort(
            (p1, p2) => (p1.fieldDensity < p2.fieldDensity) ? 1 : (p1.fieldDensity > p2.fieldDensity) ? -1 : 0);
    }
    GridOfFieldsRender();
}

function sortByComplexity(type) {
    if (type === 'desc') {
        CONFIG.sort(
            (p1, p2) => (p1.fieldComplexity < p2.fieldComplexity) ? 1 : (p1.fieldComplexity > p2.fieldComplexity) ? -1 : 0);
    } else {
        CONFIG.sort(
            (p1, p2) => (p1.fieldComplexity > p2.fieldComplexity) ? 1 : (p1.fieldComplexity < p2.fieldComplexity) ? -1 : 0);
    }
    GridOfFieldsRender();
}

function sortByHarvester() {
    CONFIG.sort(function(a, b) {
        const harvestA = a.harvesterName.toUpperCase();
        const harvestB = b.harvesterName.toUpperCase();
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

function sortByReaper() {
    CONFIG.sort(function(a, b) {
        const reaperA = a.reaperType.toUpperCase();
        const reaperB = b.reaperType.toUpperCase();
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

function createListOfColors() {
    document.getElementsByClassName('SubSettingsList')[0].innerHTML = '';
    for (let i = 0; i < DEFAULT_COLORS.length; i++) {
        let el = document.createElement("label");
        el.innerHTML = `<label><input type="color" id="colorN`+i+`" oninput="updateListOfColors('` + DEFAULT_COLORS[i].name + `','colorN`+i+`')" value="`+ DEFAULT_COLORS[i].color +`"> `+DEFAULT_COLORS[i].name+`</label>`;
        document.getElementsByClassName('SubSettingsList')[0].appendChild(el);
    }
}

function updateListOfColors(name, colorPickerId) {
    var itemIndex = DEFAULT_COLORS.findIndex(x => x.name === name)
    DEFAULT_COLORS[itemIndex].color = document.getElementById(colorPickerId).value;

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
                getAllTypesCrops();
                getAllTypesMachines();
                getAllTypesReapers();
                /*sideBarRender();*/
                GridOfFieldsRender();
                showToChosenInfo(1);
                createListOfColors();
                alert('Если некорректно и/или слишком крупно/мелко отображаются поля, то, пожалуйста, нажмите кнопку OPTIMIZE GRID в разделе MISC в меню. Это временное решение для удобства проверки работоспособности с любого устройства');
            }
        });

    }
    reader.onerror = function() {
        console.log(reader.error);
        resultOfImport(false);
}
}

document.getElementById("fileReceiver").addEventListener('change', CONFIGPARSER);
