//Storage

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

// Selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGColor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

//let addressBar = document.querySelector(".address-bar");
let activeColorProp = "#A9A9A9";
let inactiveColorProp = "#ecf0f1";

//Application of two way binding
//Attach Property Listeners
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    //Modification
    cellProp.bold = !cellProp.bold; // Db change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // UI Change
    bold.style.backgroundColor = cellProp.bold
        ? activeColorProp
        : inactiveColorProp;
});

italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    //Modification
    cellProp.italic = !cellProp.italic; // Db change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; // UI Change
    italic.style.backgroundColor = cellProp.italic
        ? activeColorProp
        : inactiveColorProp;
});

underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    //Modification
    cellProp.underline = !cellProp.underline; // Db change
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; // UI Change
    underline.style.backgroundColor = cellProp.underline
        ? activeColorProp
        : inactiveColorProp;
});

//Changing fontsize anf fontfamily

fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontSize = fontSize.value; //data change
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
});

fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontFamily = fontFamily.value; // data change
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
});

//fontcolor and backround color
fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontColor = fontColor.value; // data change
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
});
BGColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.BGColor = BGColor.value; // data change
    cell.style.backgroundColor = cellProp.BGColor;
    BGColor.value = cellProp.BGColor;
});

//Alignment of font

alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue;
        cell.style.textAlign = cellProp.alignment;

        switch (alignValue) {
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
    });
});

//Defult Modification on cell

let allCells = document.querySelectorAll(".cell");
for (let i = 0; i < allCells.length; i++) {
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell) {
    cell.addEventListener("click", (e) => {

        let address = addressBar.value;
        let[rid , cid] = decodeRIDCIDFromAddress(address);
        let cellProp = sheetDB[rid][cid];
        //Apply cell properties

        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGColor === "#000000" ? "transparent" : cellProp.BGColor;
        cell.style.textAlign = cellProp.alignment;

        //Apply  UI properties to  Container
        bold.style.backgroundColor = cellProp.bold    ? activeColorProp    : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic    ? activeColorProp    : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline    ? activeColorProp    : inactiveColorProp;
        fontColor.value = cellProp.fontColor;
        BGColor.value = cellProp.BGColor;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        switch (cellProp.alignment) {
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
    });
}

// Encoding and Decoding cell adress
function getCellAndCellProp(address) {
    let [rid, cid] = decodeRIDCIDFromAddress(address); // Array Destructing
    //Access cell & storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`); //Attribute Selector
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

function decodeRIDCIDFromAddress(address) {
    //address -> "A1"
    let rid = Number(address.slice(1) - 1); //indexing start form 0
    let cid = Number(address.charCodeAt(0)) - 65; // for encode in alpha we add 65 noe to decode again we r subtrcting 65
    return [rid, cid];
}
