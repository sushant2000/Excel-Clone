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


 let addressBar = document.querySelector(".address-bar");

 //Application of two way binding
 //Attach Property Listeners
 bold.addEventListener("click" , (e) => {
     let address = addressBar.value;
     activecell(address);

 })

 function activecell(address){
     let [rid , cid] = decodeRIDCIDFromAddress(address);
     //Access cell & storage object
     let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
     let cellProp = sheetDB[rid][cid];
     return [cell , cellProp];
 }

 function decodeRIDCIDFromAddress(address){
     //address -> "A1"
     let rid = Number(address.slice(1) - 1); //indexing start form 0 
     let cid = Number(String.charCodeAt(0)) - 65; // for encode in alpha we add 65 noe to decode again we r subtrcting 65
     return [rid , cid];
 }