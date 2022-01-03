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
        handleSelectedCells(Cell);
    }
}

function handleSelectedCells(cell){
    cell.addEventListener("click" , (e) =>{
        //Select Range Work
    })
}