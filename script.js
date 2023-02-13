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


document.getElementById("file-input-id").addEventListener('change', function() {
    let file = document.getElementById('file-input-id').files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        console.log(reader.result);
        Papa.parse(file, {
            header: true,
            complete: function(results) {
                console.log("Finished:", results.data);
                CONFIG = results.data;
                getAllTypesCrops();
                getAllTypesVehicles();
                getAllTypesReapers();
                sideBarRender();
                GridOfFieldsRender();
            }
        });

    }
    reader.onerror = function() {
        console.log(reader.error);
    }
})


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



function sideBarRender() {
    document.getElementById("sidebar1").innerHTML = "";
    for(let i = 0; i < TYPES_OF_CROPS.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = `<div class="sidebar1item">`+ TYPES_OF_CROPS[i]+`<input type="color"></div>`;
        document.getElementById("sidebar1").appendChild(div);
    }
    for(let i = 0; i < TYPE_OF_VEHICLES.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = `<div class="sidebar1item">`+ TYPE_OF_VEHICLES[i]+`<input type="color"></div>`;
        document.getElementById("sidebar1").appendChild(div);
    }
    for(let i = 0; i < TYPES_OF_REAPERS.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = `<div class="sidebar1item">`+ TYPES_OF_REAPERS[i]+`<input type="color"></div>`;
        document.getElementById("sidebar1").appendChild(div);
    }
}


function GridOfFieldsRender() {
    let numOfFields = CONFIG.length;
    document.getElementById("grid").innerHTML = "";
    for(let i = 0;i < numOfFields;i++) {
        let div = document.createElement("div");
        div.innerHTML = `<div class="element_grid"><div class="insider"><div style="background-color: `+getColor(CONFIG[i].fieldCulture)+`" class="mainContent `
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
        document.getElementById("grid").appendChild(div);
    }
}


function getColor(cropName) {
    let obj = BASIC_COLORS.find(o => o.name === cropName);
    if (obj != undefined) {
        return obj.color;
    }
}

