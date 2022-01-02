//Accessing the value of  inputed text in any cell
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < col; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`); //each cell select
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [activecell, cellProp] = getCellAndCellProp(address); // called func of cell-prop.js
      let enteredData = activecell.innerText;

      cellProp.value = enteredData;
    });
  }
}
// For Evaluating normal expression
let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (e) => {
  let inputFormula = formulaBar.value;
  if (e.key === "Enter" && inputFormula) { //Enter key must be press + formula bar should contain some value too
    
    //If change in formula, break old P-C relation, evaluate new formula, add new P-C relation
    let address = addressBar.value;
    let[cell, cellProp] = getCellAndCellProp(address);
    if(inputFormula !== cellProp.formula) removeChildFromParent(cellProp.formula);

    let evaluatedValue = evaluateFormula(inputFormula);


    //to update UI and cellProp in DB
    setCellUIAndCellProp(evaluatedValue, inputFormula , address);
    addChildToParent(inputFormula);
    console.log(sheetDB);
  }
})
 // Recusiveky we are changing the new formula system on each children
function updateChildrenCells(parentAddress){
    let [parentCell , ParentCellProp] = getCellAndCellProp(parentAddress);
    let children = ParentCellProp.cjildren;
 // Recusive Function
    for(let i = 0; i < children.length; i++){
        let childAddress = children[i];
        let [childCell , childCellProp] = getCellAndCellProp(childAddress);
        let childFormula = childCellProp.formula;

        let evaluatedValue = evaluateFormula(childFormula);
        setCellUIAndCellProp(evaluateValue , childFormula , childAddress);
        updateChildrenCells(childAddress);
    }
}
//Adding children to array
function addChildToParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [parentCell, ParentCellProp] = getCellAndCellProp(encodedFormula[i]);
            ParentCellProp.children.push(childAddress);
        }
    }
}

function removeChildFromParent(formula){
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [parentCell, ParentCellProp] = getCellAndCellProp(encodedFormula[i]);
            let idx = ParentCellProp.children.indexOf(childAddress);
            ParentCellProp.children.splice(idx , 1);
        }
    }

}

function evaluateFormula(formula) {
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [cell, cellProp] = getCellAndCellProp(encodedFormula[i]);
            encodedFormula[i] =  cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
   return eval(decodedFormula);
}

function setCellUIAndCellProp(evaluatedValue, formula , address) {
  let [cell, cellProp] = getCellAndCellProp(address);
  //UI Update
  cell.innerText = evaluatedValue;

  //DB Update
  cellProp.value = evaluatedValue;
  cellProp.formula = formula;
}
