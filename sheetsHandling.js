// creation of one sheet
let sheetFoldersCont = document.querySelector(".sheets-folder-cont");
let addSheetBtn = document.querySelector(".sheet-add-icon");

addSheetBtn.addEventListener("click" , (e) =>{
    let sheet = document.createElement("div");
    sheet.setAttribute("class" , "sheet-folder");
    
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id" , allSheetFolders.length); 

    sheet.innerHTML = `<div class="sheet-content">Sheet ${allSheetFolders.length + 1}</div>`;

    sheetFoldersCont.appendChild(sheet);
    //Storage DB work
    createSheetDB();
    createGraphComponentMatrix();
})


function createSheetDB() {
    let sheetDB = []; // largest array contains all subarray

for (let i = 0; i < rows; i++) {
    let sheetRow = [];
    for (let j = 0; j < col; j++) {
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "14",
            fontColor: "#000000",
            BGColor:   "#000000",
            value: "",
            formula: "",
            children: [],
        };
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}
collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix(){
    let graphComponentMatrix = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < col; j++) {
            //Why Array -> More than one child relation(dependency) so i.e why use array
            row.push([]); // for entering child details
        }
        graphComponentMatrix.push(row);
    }
    collectedGraphComponent.push(graphComponentMatrix);
}