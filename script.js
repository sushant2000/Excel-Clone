$(document).ready(function (){
    let cellContainer = $("input-cell-container");

    for (let i = 1; i <= 100; i++) {

        let ans = "";
        let n = i;
        while (n > 0) {
            let rem = n % 26;
            if (rem == 0) {
                ans = "Z" + ans;
                n = Math.floor(n / 26) - 1;
            } else {
                ans = String.fromCharCode(rem - 1 + 65) + ans;
                n = Math.floor(n / 26);
            }
        }

        let columns = $(`<div class ="column-name colId-${i}"  id = "colCod-${ans} ">${ans}</div>`);
        $(".column-name-container").append(columns);
        
        
        let rows = $(`<div class ="row-name" id ="rowId-${i}">${i}</div>`);
        $(".row-name-container").append(rows);

        /*$("#columns").append(`<div class="column-name column-${i}" id="${str}">${str}</div>`);
        $("#rows").append(`<div class="row-name">${i}</div>`);*/
    }

});
