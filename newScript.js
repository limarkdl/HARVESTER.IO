let TYPE_OF_CROPS = [];
let TYPE_OF_MACHINES = [];
let TYPE_OF_REAPERS = [];

let CONFIG = [];
let currentOBJ;

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


// BASIC INITIALIZATION //





//// FUNCTIONS LIST

// DYNAMIC LIST OF FIELDS.CROPS / REAPER.TYPES / MACHINE.TYPES



function getAllTypesMachines() {
    for(let i = 0;i < CONFIG.length;i++) {
        currentOBJ = CONFIG[i];
        if (!TYPE_OF_MACHINES.includes(currentOBJ[Object.keys(currentOBJ)[4]])) {
            TYPE_OF_MACHINES.push(currentOBJ[Object.keys(currentOBJ)[4]]);
        }
    }
}

function getAllTypesCrops() {
    for(let i = 0;i < CONFIG.length;i++) {
        currentOBJ = CONFIG[i];
        if (!TYPE_OF_CROPS.includes(currentOBJ[Object.keys(currentOBJ)[1]])) {
            TYPE_OF_CROPS.push(currentOBJ[Object.keys(currentOBJ)[1]]);
        }
    }
}

function getAllTypesReapers() {
    for(let i = 0; i < CONFIG.length;i++) {
        currentOBJ = CONFIG[i];
        if (!TYPE_OF_REAPERS.includes(currentOBJ[Object.keys(currentOBJ)[6]])) {
            TYPE_OF_REAPERS.push(currentOBJ[Object.keys(currentOBJ)[6]]);
        }
    }
}

function calculateWidthForelement() {
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
        calculatedWidth = '15%';
    }
    else if  (window.innerWidth < 800) {
        calculatedWidth = '13%';
    } else if (window.innerWidth < 900) {
        calculatedWidth = '12%';
    } else if (window.innerWidth < 1000) {
        calculatedWidth = '11%';
    } else if(window.innerWidth < 1100) {
        calculatedWidth = '10%';
    } else if (window.innerWidth < 1300) {
        calculatedWidth = '9%';
    } else if (window.innerWidth < 1400) {
        calculatedWidth = '8%';
    } else if (window.innerWidth < 1550) {
        calculatedWidth = '7%';
    } else {
        calculatedWidth = '6%';
    }
    return calculatedWidth;
}


function INITIALIZATION() {
    getAllTypesCrops();
    getAllTypesMachines();
    getAllTypesReapers();
    GridOfFieldsRender();
    showToChosenInfo(1);
    createListOfColors();
    button_update();

}



function GridOfFieldsRender() {
    document.getElementsByClassName("grid")[0].innerHTML = "";
    for(let i = 0;i < CONFIG.length;i++) {
        currentOBJ = CONFIG[i];
        let div = document.createElement("div");
        div.innerHTML = `<div onclick="showToChosenInfo(`
            +currentOBJ[Object.keys(currentOBJ)[0]]+`)" class="element_grid"><div class="insider"><div style="background-color:`
            +getColorFromDEFAULT(currentOBJ[Object.keys(currentOBJ)[1]])+`" class="insiderMainContent `
            +currentOBJ[Object.keys(currentOBJ)[1]]+`"><p>ID:`
            +currentOBJ[Object.keys(currentOBJ)[0]]+`</p><p>`
            +currentOBJ[Object.keys(currentOBJ)[1]]+`</p><p>`
            +currentOBJ[Object.keys(currentOBJ)[2]]+`</p><p>`
            +currentOBJ[Object.keys(currentOBJ)[4]]+`</p><p>`
            +currentOBJ[Object.keys(currentOBJ)[5]]+`</p><p>`
            +currentOBJ[Object.keys(currentOBJ)[6]]+`</p></div><div class="bar" style="height:`
            +currentOBJ[Object.keys(currentOBJ)[3]] * 100 +`%"></div></div></div>`;

        div.style.width = calculateWidthForelement();
        div.id = "div" + String(i);
        document.getElementsByClassName("grid")[0].appendChild(div);
    }
}

function getColorFromDEFAULT(cropName) {
    let obj = DEFAULT_COLORS.find(o => o.name === cropName);
    if (typeof obj != "undefined") {
        return obj.color;
    }
}
function button_update() {
    document.getElementsByClassName('SubSettingsList')[1].children[0].innerHTML = 'SORTING BY ' + Object.keys(currentOBJ)[0] + '↓';
    document.getElementsByClassName('SubSettingsList')[1].children[1].innerHTML = 'SORTING BY ' + Object.keys(currentOBJ)[0] + '↑';
    document.getElementsByClassName('SubSettingsList')[1].children[2].innerHTML = 'SORTING BY ' + Object.keys(currentOBJ)[1] + '↓';
    document.getElementsByClassName('SubSettingsList')[1].children[3].innerHTML = 'SORTING BY ' + Object.keys(currentOBJ)[1] + '↑';
    document.getElementsByClassName('SubSettingsList')[1].children[4].innerHTML = 'SORTING BY ' + Object.keys(currentOBJ)[2] + '↓';
    document.getElementsByClassName('SubSettingsList')[1].children[5].innerHTML = 'SORTING BY ' + Object.keys(currentOBJ)[2] + '↑';
    document.getElementsByClassName('SubSettingsList')[1].children[6].innerHTML = 'SORTING BY ' + Object.keys(currentOBJ)[3] + '↓';
    document.getElementsByClassName('SubSettingsList')[1].children[7].innerHTML = 'SORTING BY ' + Object.keys(currentOBJ)[3] + '↑';
}

function showToChosenInfo(ID) {
    document.getElementsByClassName('chosenInfoElement')[1].innerText = '';
    let obj = CONFIG.find(c => c[Object.keys(c)[0]] === String(ID));
    document.getElementsByClassName('chosenInfoElement')[1].innerText = Object.keys(currentOBJ)[0] + ': '+ obj[Object.keys(obj)[0]];
    document.getElementsByClassName('chosenInfoElement')[2].innerText = Object.keys(currentOBJ)[1] + ': '+ obj[Object.keys(obj)[1]];
    document.getElementsByClassName('chosenInfoElement')[3].innerText = Object.keys(currentOBJ)[2] + ': '+ obj[Object.keys(obj)[2]];
    document.getElementsByClassName('chosenInfoElement')[4].innerText = Object.keys(currentOBJ)[3] + ': '+ obj[Object.keys(obj)[3]];
    document.getElementsByClassName('chosenInfoElement')[5].innerText = Object.keys(currentOBJ)[4] + ': '+ obj[Object.keys(obj)[4]];
    document.getElementsByClassName('chosenInfoElement')[6].innerText = Object.keys(currentOBJ)[5] + ': '+ obj[Object.keys(obj)[5]];
    document.getElementsByClassName('chosenInfoElement')[7].innerText = Object.keys(currentOBJ)[6] + ': '+ obj[Object.keys(obj)[6]];
    document.getElementsByClassName('chosenInfoElement')[0].style.backgroundColor = getColorFromDEFAULT(obj[Object.keys(obj)[1]]);

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
    if (status === true) {
       resultOfImport.innerText = 'SUCCESSFULLY LOADED AND PARSED';



    } else {
        resultOfImport.innerText = 'AN ERROR HAS OCCURRED';


    }
}

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
    let itemIndex = DEFAULT_COLORS.findIndex(x => x.name === name)
    DEFAULT_COLORS[itemIndex].color = document.getElementById(colorPickerId).value;

}

function AddColorsToDefault() {
    for (let i = 0; i < CONFIG.length;i++) {
        let currentOBJ = CONFIG[i];
        let name = String(currentOBJ[Object.keys(currentOBJ)[1]]);
        if (DEFAULT_COLORS.find(o => o.name === name)) {
            console.log("FOUND" + name);
        } else {
            console.log("DIDN'T FOUND");

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
                INITIALIZATION();
            }
        });

    }
    reader.onerror = function() {
        console.log(reader.error);
        resultOfImport(false);
}
}

document.getElementById("fileReceiver").addEventListener('change', CONFIGPARSER);
window.addEventListener('resize', function(){GridOfFieldsRender()});


