// creation of one sheet
let sheetFoldersCont = document.querySelector(".sheets-folder-cont");
let addSheetBtn = document.querySelector(".sheet-add-icon");
let activeSheetColor = "#ced6e0";
addSheetBtn.addEventListener("click" , (e) =>{
    let sheet = document.createElement("div");
    sheet.setAttribute("class" , "sheet-folder");
    
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id" , allSheetFolders.length); 

    sheet.innerHTML = `<div class="sheet-content">Sheet ${allSheetFolders.length + 1}</div>`;

    sheetFoldersCont.appendChild(sheet);
    sheet.scrollIntoView();
    //Storage DB work
    createSheetDB();
    createGraphComponentMatrix();
    handleSheetActiveness(sheet);
    handleSheetRemoval(sheet);
    sheet.click();
})


function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown" , (e) =>{
        if(e.button !== 2) return; // if 0 then left click if 1 the scroll if 2 then right click
        let allSheetFolders = document.querySelectorAll(".sheet-folder");
        if(allSheetFolders.length == 1){
            alert("You need to have atleast one sheet!!!");
            return;
        }
        let response = confirm("Your sheet will be removed permanently , Are you sure?");
        if(response === false) return;
        let sheetIdx = Number(sheet.getAttribute("id"));
        // Removal of sheets
        collectedSheetDB.splice(sheetIdx , 1);
        collectedGraphComponent.splice(sheetIdx , 1);
        //For UI
        handlesheetUIRemoval(sheet);

     
        //By default we bring sheet 1 to active
        sheetDB = collectedSheetDB[0];
        graphComponentMatrix = collectedGraphComponent[0];
        handleSheetProperties();

    })
}


//Handle sheet numbering after removal

function handlesheetUIRemoval(sheet){
    
    sheet.remove();
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i = 0; i < allSheetFolders.length ; i++){
        allSheetFolders[i].setAttribute("id" , i);
        let sheetContent = allSheetFolders[i].querySelector(".sheet-content");
        sheetContent.innerHTML = `Sheet ${i+1}`;
        allSheetFolders[i].style.backgroundColor = "transparent"; 
    }
  
    allSheetFolders[0].style.backgroundColor = "#ced6e0";
  }
function handleSheetDB(sheetIdx){
  sheetDB = collectedSheetDB[sheetIdx];
  graphComponentMatrix =  collectedGraphComponent[sheetIdx];
}

function handleSheetProperties(){
    for(let i = 0; i < rows; i++){
        for(let j = 0;  j < col; j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`); //each cell select
        cell.click();
        }
    }
    let firstcell = document.querySelector(".cell");
    firstcell.click();
}

function handleSheetUI(sheet){
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i = 0; i<allSheetFolders.length; i++){
        allSheetFolders[i].style.backgroundColor = "transparent";
    }
    sheet.style.backgroundColor = "#ced6e0";
}

function handleSheetActiveness(sheet){
    sheet.addEventListener("click" ,(e) => {
        let sheetIdx = Number(sheet.getAttribute("id"));
        handleSheetDB(sheetIdx);
        handleSheetProperties();
        handleSheetUI(sheet);
    })

}

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