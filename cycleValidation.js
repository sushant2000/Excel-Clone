//Storage -> 2D Matrix (Basic )
let graphComponentMatrix = [];

for(let i = 0; i< rows; i++){
    let row = []
    for(let j = 0; j < col; j++){
      //Why Array -> More than one child relation(dependency) so i.e why array
        row.push([]) ;
    }
    graphComponentMatrix.push(row);
}

