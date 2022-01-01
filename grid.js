/*Generating Rows and columns Name start*/
let rows = 100;
let col = 26;

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");
for (let i = 0; i < rows; i++) {
  let addressCol = document.createElement("div");
  addressCol.setAttribute("class", "address-col");
  addressCol.innerText = i + 1;
  addressColCont.appendChild(addressCol);
}

for (let i = 0; i < col; i++) {
  let addressRow = document.createElement("div");
  addressRow.setAttribute("class", "address-row");
  addressRow.innerText = String.fromCharCode(65 + i);
  addressRowCont.appendChild(addressRow);
}
/*Generating Rows and columns Name end*/

/** Grid Generating start*/

for (let i = 0; i < rows; i++) {
  let rowCont = document.createElement("div");
  rowCont.setAttribute("class", "row-cont");
  for (let j = 0; j < col; j++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("contenteditable", "true");
    cell.setAttribute("spellcheck", "false");
    //Attributes for cell and storage identification
    cell.setAttribute("rid", i);
    cell.setAttribute("cid", j);
    rowCont.appendChild(cell);
    addListenerForAddressBarDisplay(cell, i, j);
  }
  cellsCont.appendChild(rowCont);
}
/** Grid Generating end*/

/*Cell Address printing start */
function addListenerForAddressBarDisplay(cell, i, j) {
  cell.addEventListener("click", (e) => {
    let rowID = i + 1;
    let colID = String.fromCharCode(65 + j);
    addressBar.value = `${colID}${rowID}`;
  });
}
/*Cell Address printing end */

//By default click on first cell via DOM
let firstcell = document.querySelector(".cell");
firstcell.click();
