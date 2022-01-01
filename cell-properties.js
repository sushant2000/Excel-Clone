//Storage

let sheetDB = []; // largest array contains all subarray

for(let i = 0; i < rows; i++){
    let sheetRow = [];
    for(let j = 0; j < col; j++){
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            aligment: "left",
            fontFamily: "monospace",
            fontSize: "15",
            fontColor: "#000000",
            BGColor: "#000000"
        }
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
 bold.addEventListener("click" , (e) => {
     let address = addressBar.value;
    let [cell , cellProp] = activecell(address);

    //Modification
    cellProp.bold = !cellProp.bold; // Db change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // UI Change
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;

 })

 italic.addEventListener("click" , (e) => {
    let address = addressBar.value;
   let [cell , cellProp] = activecell(address);

   //Modification
   cellProp.italic = !cellProp.italic; // Db change
   cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; // UI Change
   italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;

})

underline.addEventListener("click" , (e) => {
   let address = addressBar.value;
   let [cell , cellProp] = activecell(address);

   //Modification
   cellProp.underline = !cellProp.underline; // Db change
   cell.style.textDecoration = cellProp.underline ? "underline" : "none"; // UI Change
   underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;

})

//Changing fontsize anf fontfamily


fontSize.addEventListener("change" ,  (e) => {
    let address = addressBar.value;
    let [cell , cellProp] = activecell(address);

    cellProp.fontSize = fontSize.value; //data change
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})

fontFamily.addEventListener("change" ,  (e) => {
    let address = addressBar.value;
    let [cell , cellProp] = activecell(address);

    cellProp.fontFamily = fontFamily.value; // data change
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})

//fontcolor and backround color
fontColor.addEventListener("change" ,  (e) => {
    let address = addressBar.value;
    let [cell , cellProp] = activecell(address);

    cellProp.fontColor = fontColor.value; // data change
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})
BGColor.addEventListener("change" ,  (e) => {
    let address = addressBar.value;
    let [cell , cellProp] = activecell(address);

    cellProp.BGColor = BGColor.value; // data change
    cell.style.backgroundColor = cellProp.BGColor;
    BGColor.value = cellProp.BGColor;
})

 // Encoding and Decoding cell adress 
 function activecell(address){
     let [rid , cid] = decodeRIDCIDFromAddress(address); // Array Destructing
     //Access cell & storage object
     let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`); //Attribute Selector
     let cellProp = sheetDB[rid][cid];
     return [cell , cellProp];
 }

 function decodeRIDCIDFromAddress(address){
     //address -> "A1"
     let rid = Number(address.slice(1) - 1); //indexing start form 0 
     let cid = Number(address.charCodeAt(0)) - 65; // for encode in alpha we add 65 noe to decode again we r subtrcting 65
     return [rid , cid];
 }