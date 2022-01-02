//Accessing the value of  inputed text in any cell
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < close; j++) {
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
    let evaluatedValue =evaluateFormula(inputFormula);
    setCellUIAndCellProp(evaluatedValue, inputFormula);
  }
});

function evaluateFormula(formula) {
  return eval(formula);
}

function setCellUIAndCellProp(evaluatedValue, formula) {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);
  //UI Update
  cell.innerText = evaluatedValue;

  //DB Update
  cellProp.value = evaluatedValue;
  cellProp.formual = formula;
}
