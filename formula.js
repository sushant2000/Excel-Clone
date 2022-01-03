//Accessing the value of  inputed text in any cell
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < col; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`); //each cell select
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [activecell, cellProp] = getCellAndCellProp(address); // called func of cell-prop.js
      let enteredData = activecell.innerText;

      if (enteredData === cellProp.value) return;
      cellProp.value = enteredData;
      // if data modifies removee p-c relation and formula empty and update children with new modified value
      removeChildFromParent(cellProp.formula);
      cellProp.formula = "";
      updateChildrenCells(address);
    });
  }
}
// For Evaluating normal expression
let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", async (e) => {
  let inputFormula = formulaBar.value;
  if (e.key === "Enter" && inputFormula) {
    //Enter key must be press + formula bar should contain some value too

    //If change in formula, break old P-C relation, evaluate new formula, add new P-C relation
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    if (inputFormula !== cellProp.formula)
      removeChildFromParent(cellProp.formula);

    addChildToGraphComponent(inputFormula, address); //address child add banega
    //add children first to check formula is cyclic or not only then evaluate
    // true denote cycle vise versa not cycle
    let cyclicResponse = isGraphCyclic(graphComponentMatrix);
    if (cyclicResponse) {
      //alert("Your Formula Is Cyclic");
      let response = confirm("Your Formula Is Cyclic. Do you want to trace your path?");
      while(response === true){
        //keep on tracking the color until user deny

    await isGraphCyclicTracePath(graphComponentMatrix , cyclicResponse); // Util Full Iteration Wait here
        response = confirm("Your Formula Is Cyclic. Do you want to trace your path?");
      }
      removeChildFromGraphComponent(inputFormula, address);
      return;
    }

    let evaluateValue = evaluateFormula(inputFormula);

    //to update UI and cellProp in DB
    setCellUIAndCellProp(evaluateValue, inputFormula, address);
    addChildToParent(inputFormula);
    console.log(sheetDB);

    updateChildrenCells(address);
  }
});

//Making relation of Parent and child
function addChildToGraphComponent(formula, childAddress) {
  //formula tell relation and childaddress help us to decode
  let [crid, ccid] = decodeRIDCIDFromAddress(childAddress);
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
      // B1 -> A1 + 10; For A1 rid = 0 = i & cid = j = 0;
      graphComponentMatrix[prid][pcid].push([crid, ccid]); // B1 Par jaake usske child array mein A1 crid ccid add kardi
      //last mein push
    }
  }
}

function removeChildFromGraphComponent(formula, childAddress) {
  let [crid, ccid] = decodeRIDCIDFromAddress(childAddress);
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
      // B1 -> A1 + 10; For A1 rid = 0 = i & cid = j = 0;
      graphComponentMatrix[prid][pcid].pop(); //last mein pop (B1 par jaake A1 ko remove)
    }
  }
}
// Recusiveky we are changing the new formula system on each children
function updateChildrenCells(parentAddress) {
  let [parentCell, ParentCellProp] = getCellAndCellProp(parentAddress);
  let children = ParentCellProp.children;
  // Recusive Function to update formula for each child
  for (let i = 0; i < children.length; i++) {
    let childAddress = children[i];
    let [childCell, childCellProp] = getCellAndCellProp(childAddress);
    let childFormula = childCellProp.formula;

    let evaluatedValue = evaluateFormula(childFormula);
    setCellUIAndCellProp(evaluatedValue, childFormula, childAddress);
    updateChildrenCells(childAddress);
  }
}
//Adding children to array
function addChildToParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, ParentCellProp] = getCellAndCellProp(encodedFormula[i]);
      ParentCellProp.children.push(childAddress);
    }
  }
}

function removeChildFromParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, ParentCellProp] = getCellAndCellProp(encodedFormula[i]);
      let idx = ParentCellProp.children.indexOf(childAddress);
      ParentCellProp.children.splice(idx, 1);
    }
  }
}

function evaluateFormula(formula) {
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [cell, cellProp] = getCellAndCellProp(encodedFormula[i]);
      encodedFormula[i] = cellProp.value;
    }
  }
  let decodedFormula = encodedFormula.join(" ");
  return eval(decodedFormula);
}

function setCellUIAndCellProp(evaluatedValue, formula, address) {
  let [cell, cellProp] = getCellAndCellProp(address);
  //UI Update
  cell.innerText = evaluatedValue;

  //DB Update
  cellProp.value = evaluatedValue;
  cellProp.formula = formula;
}
