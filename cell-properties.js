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