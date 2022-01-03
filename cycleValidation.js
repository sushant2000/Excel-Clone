//Storage -> 2D Matrix (Basic ) overall it is represent as 3D Matrix
let graphComponentMatrix = [];

for(let i = 0; i< rows; i++){
    let row = []
    for(let j = 0; j < col; j++){
      //Why Array -> More than one child relation(dependency) so i.e why use array
        row.push([]) ; // for entering child details
    }
    graphComponentMatrix.push(row);
}

