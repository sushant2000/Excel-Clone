let dowwnloadBtn = document.querySelector(".download");
let openBtn = document.querySelector(".open");
//Download Task
dowwnloadBtn.addEventListener("click" ,(e) =>{
    let jsonData = JSON.stringify([sheetDB , graphComponentMatrix]);
    let file = new Blob([jsonData],{type:"application/json"});

    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json";
    a.click();
})

//Open task or upload

openBtn.addEventListener("click" , (e) => {
    //open file explorer
    let input = document.createElement("input");
    input.setAttribute("type" , "file");
    input.click();

    input.addEventListener("change" , (e) =>{
        let fr = new FileReader();
        let files = input.files;
        let fileObj = files[0];

        fr.readAsText(fileObj);
        fr.addEventListener("load" , (e) =>{
            let readSheetData = JSON.parse(fr.result);
            //A new sheet with default data will created
            addSheetBtn.click();

            //sheetDB graphcomponent
            sheetDB = readSheetData[0];
            graphComponentMatrix = readSheetData[1];


            collectedSheetDB[collectedSheetDB.length-1] = sheetDB;
            collectedGraphComponent[collectedGraphComponent.length-1] = graphComponentMatrix;
            
            handleSheetProperties();
        })
    })
})