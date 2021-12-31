/*Generating Rows and columns Name start*/ 
let rows = 100;
let col = 26;

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let cellsCont = document.querySelector(".cells-cont");
for(let i = 0; i < rows; i++){
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class" , "address-col");
    addressCol.innerText = i+1;
    addressColCont.appendChild(addressCol);
}

for( let i = 0; i < col; i++){
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class" , "address-row");
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRowCont.appendChild(addressRow);
}
/*Generating Rows and columns Name end*/


/** Grid Generating start*/

for(let i = 0; i< rows; i++){
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class" , "row-cont");
    for(let j = 0; j < col; j++){
        let cell = document.createElement("div");
        cell.setAttribute("class" , "cell");
        cell.setAttribute("contenteditable" , "true");
        rowCont.appendChild(cell);
    }
    cellsCont.appendChild(rowCont);
}
/** Grid Generating end*/