let numOfFields;
let ArrayOfObjects = [];
ArrayOfObjects.push();

let TYPE_OF_FIELDS = [];
let TYPE_OF_VEHICLES = [];

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
                getAllTypesCulture();
                getAllTypesVehicles();
                sideBarRender();
                GridOfFieldsRender()
            }
        });

    }
    reader.onerror = function() {
        console.log(reader.error);
    }
})


function getAllTypesVehicles() {
    for(let i = 0;i < CONFIG[i].length;i++) {
        if (!TYPE_OF_VEHICLES.includes(CONFIG[i].harvesterId)) {
            TYPE_OF_VEHICLES.push(CONFIG[i].harvesterId);
        }
    }
}

function getAllTypesCulture() {
    for(let i = 0;i < CONFIG.length;i++) {
        if (!TYPE_OF_FIELDS.includes(CONFIG[i].fieldCulture)) {
            TYPE_OF_FIELDS.push(CONFIG[i].fieldCulture);
        }
    }
}


/*for(let i = 0; i < SpreadSheet.Field.length;i++) {
    let rand = Math.floor(Math.random() * TYPE_OF_FIELDS.length);
    SpreadSheet.Field[i].cultureIs = TYPE_OF_FIELDS[rand];
    console.log(SpreadSheet.Field[i].cultureIs);
    console.log("TO: " + TYPE_OF_FIELDS[rand]);
}*/



function sideBarRender() {
    document.getElementById("sidebar1").innerHTML = "";
    for(let i = 0;i < TYPE_OF_FIELDS.length;i++) {
        let div = document.createElement("div");
        div.innerHTML = `<div class="sidebar1item">`+ TYPE_OF_FIELDS[i]+`<input type="color"></div>`;
        document.getElementById("sidebar1").appendChild(div);
    }

}
if(document.body.clientWidth > 900) {
    console.log("BIGGER");
}

function GridOfFieldsRender() {
    let numOfFields = CONFIG.length;
    console.log(CONFIG.length);
    document.getElementById("grid").innerHTML = "";
    for(let i = 0;i < numOfFields;i++) {
        let div = document.createElement("div");
        div.innerHTML = `<div class="element_grid"><div class="insider"><div class="mainContent `
            + CONFIG[i].fieldCulture +`"><p>ID:`
            +CONFIG[i].fieldId+`</p><p>`+CONFIG[i].fieldCulture+`</p><p>`
            +CONFIG[i].fieldDensity+`</p><p>`+CONFIG[i].harvesterId+`</p><p>`+CONFIG[i].reaperType+`</p></div><div class="bar" style="height:`+ CONFIG[i].fieldComplexity * 100 +`%"></div></div></div>`;
        let flexWidth =  Math.round(100/Math.sqrt(numOfFields));
        console.log(flexWidth);
        div.id = "div" + String(i);

        div.style.width = flexWidth+"vh";


        document.getElementById("grid").appendChild(div);
    }
}



function outputd(id) {
    let displayer = document.createElement("div");
    let idd = "div";
    displayer.innerHTML = document.getElementById("div")
    console.log(id);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}