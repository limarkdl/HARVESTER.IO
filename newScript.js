let TYPES_OF_CROPS = [];
let TYPE_OF_VEHICLES = [];
let TYPES_OF_REAPERS = [];

let BASIC_COLORS = [
    {name: "oats", color: "#C4BA9E"},
    {name: "wheat", color: "#F5DEB3"},
    {name: "corn", color: "#FBEC5D"},
    {name: "sunflower", color: "#FFC512"},
    {name: "sugar beets", color: "#D8D8D8"},
    {name: "beans", color: "#811E1E"},
    {name: "soy", color: "#D2C82E"},
    {name: "cotton", color: "#EEEDDE"},
    {name: "rye", color: "#DAE71E"},
    {name: "buckwheat", color: "#9C6217"},
    {name: "rice", color: "#FFFFFF"}
];

let CONFIG = [];


toggleChosenInfo();
function getAllTypesVehicles() {
    for(let i = 0;i < CONFIG.length;i++) {
        if (!TYPE_OF_VEHICLES.includes(CONFIG[i].harvesterName)) {
            TYPE_OF_VEHICLES.push(CONFIG[i].harvesterName);
        }
    }
}

function getAllTypesCrops() {
    for(let i = 0;i < CONFIG.length;i++) {
        if (!TYPES_OF_CROPS.includes(CONFIG[i].fieldCulture)) {
            TYPES_OF_CROPS.push(CONFIG[i].fieldCulture);
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



function GridOfFieldsRender() {
    let numOfFields = CONFIG.length;

    document.getElementsByClassName("grid")[0].innerHTML = "";
    console.log(document.getElementsByClassName("grid")[0].innerHTML);
    for(let i = 0;i < numOfFields;i++) {
        let div = document.createElement("div");
        div.innerHTML = `<div onclick="showToChosenInfo(`+ CONFIG[i].fieldId+`)" class="element_grid"><div class="insider"><div style="background-color: `+getColor(CONFIG[i].fieldCulture)+`" class="insiderMainContent `
            +CONFIG[i].fieldCulture +`"><p>ID:`
            +CONFIG[i].fieldId+`</p><p>`
            +CONFIG[i].fieldCulture+`</p><p>`
            +CONFIG[i].fieldDensity+`</p><p>`
            +CONFIG[i].harvesterName+`</p><p>`
            +CONFIG[i].reaperType+`</p></div><div class="bar" style="height:`
            +CONFIG[i].fieldComplexity * 100 +`%"></div></div></div>`;
        let flexWidth =  Math.round(100/Math.sqrt(numOfFields));
        console.log(flexWidth);
        div.id = "div" + String(i);
        div.style.width = flexWidth+"vh";
        document.getElementsByClassName("grid")[0].appendChild(div);
    }
}


function getColor(cropName) {
    let obj = BASIC_COLORS.find(o => o.name === cropName);
    if (obj != undefined) {
        return obj.color;
    }
}

function showToChosenInfo(ID) {
    document.getElementsByClassName('chosenInfoElement')[1].innerText = '';


    console.log(CONFIG.find(c => c.fieldId == ID));
    let obj = CONFIG.find(c => c.fieldId == ID);
    document.getElementsByClassName('chosenInfoElement')[1].innerText = 'fID: ' + obj.fieldId;
    document.getElementsByClassName('chosenInfoElement')[2].innerText = 'fCrop: ' + obj.fieldCulture;
    document.getElementsByClassName('chosenInfoElement')[3].innerText = 'fDensity: ' + obj.fieldDensity;
    document.getElementsByClassName('chosenInfoElement')[4].innerText = 'fCompl: ' + obj.fieldComplexity;
    document.getElementsByClassName('chosenInfoElement')[5].innerText = 'hModel: ' + obj.harvesterName;
    document.getElementsByClassName('chosenInfoElement')[6].innerText = 'rType: ' + obj.reaperType;
    document.getElementsByClassName('chosenInfoElement')[0].style.backgroundColor = getColor(obj.fieldCulture);

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
    console.log("ORIGINAL:")
    console.log(CONFIG);
    CONFIG.sort(function(a, b) {
            const cropA = a.fieldCulture.toUpperCase();
            const cropB = b.fieldCulture.toUpperCase();
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
    console.log("ORIGINAL:")
    console.log(CONFIG);
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
    console.log("ORIGINAL:")
    console.log(CONFIG);
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
    for (let i = 0; i < BASIC_COLORS.length;i++) {
        let el = document.createElement("label");
        el.innerHTML = `<label><input type="color" id="colorN`+i+`" oninput="updateListOfColors('` + BASIC_COLORS[i].name + `','colorN`+i+`')" value="`+ BASIC_COLORS[i].color +`"> `+BASIC_COLORS[i].name+`</label>`;
        document.getElementsByClassName('SubSettingsList')[0].appendChild(el);
    }
}

function updateListOfColors(name, colorPickerId) {
    console.log(name, colorPickerId);

    var itemIndex = BASIC_COLORS.findIndex(x => x.name === name)

    var item = BASIC_COLORS[itemIndex];
    console.log(item.color);
    BASIC_COLORS[itemIndex].color = document.getElementById(colorPickerId).value;
    console.log(BASIC_COLORS[itemIndex].color);
}

document.getElementById("fileReceiver").addEventListener('change', function() {
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
                getAllTypesVehicles();
                getAllTypesReapers();
                /*sideBarRender();*/
                GridOfFieldsRender();
                showToChosenInfo(1);
                createListOfColors();
            }
        });

    }
    reader.onerror = function() {
        console.log(reader.error);
        resultOfImport(false);
    }
})