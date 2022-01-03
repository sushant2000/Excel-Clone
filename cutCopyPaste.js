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


