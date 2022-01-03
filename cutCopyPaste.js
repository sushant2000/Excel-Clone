let ctrlKey;
document.addEventListener("keydown" , (e) => {
    ctrlKey = e.ctrlKey;
})

document.addEventListener("keyup" , (e) =>{
    ctrlKey = e.ctrlKey;
})

for(let i = 0; i<rows; i++){
    for(let j = 0; j<col; j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`); 
        handleSelectedCells(cell);
    }
}
 let copyBtn = document.querySelector(".copy");
 let cutBtn = document.querySelector(".cut");
 let pasteBtn = document.querySelector(".paste");
 


let rangeStorage = [];

function handleSelectedCells(cell){
    cell.addEventListener("click" , (e) =>{
        //Select Range Work

        if(!ctrlKey) return;
        if(rangeStorage.length >= 2) {
            defaultSelectedCellsUI();
            rangeStorage = [];
        }
        //TO view in UI

        cell.style.border = "3px solid #218c74";

        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        rangeStorage.push([rid , cid]);
    })
}

function defaultSelectedCellsUI(){
    for(let i = 0; i< rangeStorage.length; i++){
        let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
        cell.style.border = "1px solid lightgrey";
    }

}

//copy the data pushing it in copyData array
let copyData = [];
copyBtn.addEventListener("click" , (e) =>{
    let strow = rangeStorage[0][0];
    let stcol = rangeStorage[0][1];
    let endrow = rangeStorage[1][0];
    let endcol = rangeStorage[1][1];
    for(let i = strow ; i <= endrow;  i++){
        let copyRow = [];
        for(let j = stcol; j <= endcol;   j++){
            let cellProp = sheetDB[i][j];
            copyRow.push(cellProp);
        }
        copyData.push(copyRow);
    }
    defaultSelectedCellsUI();
})

pasteBtn.addEventListener("click", (e) =>{
    //Paste cell Data 

    if()
    let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
    let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);

    //Finding our Target Address and decode 
    let address = addressbar.value;
    let [stRow, stCol] = decodeRIDCIDFromAddress(address);

    for(let i = stRow ,r=0; i <=stRow+rowDiff; i++,r++){ // r & c used in copy matrix
        for(let j = stCol,c=0; j <= stCol + colDiff; j++,c++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`); 
           if(!cell) return;
           //DB change
           let cellProp = sheetDB[i][j];
           let data = copyData[r][c];
           cellProp.bold = data.bold;
           cellProp.italic = data.italic;
           cellProp.underline = data.underline;
           cellProp.fontSize = data.fontSize;
           cellProp.fontFamily = data.fontFamily;
           cellProp.fontColor = data.fontColor;
           cellProp.BGColor = data.BGColor;
           cellProp.alignment = data.alignment;

           //UI change
           cell.click();

        }
    }

})