let rows = 100;
let col = 26;

let addressColCont = document.querySeelctor(".address-col-cont");
for(let i = 0; i < rows; i++){
    let addressCol = document.createElement("div");
    addressCol.innerText = i+1;
    addressColCont.appendChild(addressCol);
}
