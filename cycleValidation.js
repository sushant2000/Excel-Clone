//Storage -> 2D Array (Basic ) overall it is represent as 3D Matrix
let graphComponentMatrix = [];

for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < col; j++) {
        //Why Array -> More than one child relation(dependency) so i.e why use array
        row.push([]); // for entering child details
    }
    graphComponentMatrix.push(row);
}

//Boolena func true denote cycle vise versa not cycle
function isGraphCyclic(graphComponentMatrix) {
    // Dependency visited , dfsvisited (2D array)
    let visited = [];
    let dfsVisited = [];

    for (let i = 0; i < rows; i++) {
        let visitedRow = []; // visited node trace
        let dfsVisitedRow = []; // to trace stack
        for (let j = 0; j < col; j++) {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < col; j++) {
            dfsCycleDetection(graphComponentMatrix , i , j, visited , dfsVisited); 
            //graphcompentmatrix tell us the relation
            // i & j are starting point
            // visited will tell us kitne elements par visit kar chuke hai
            // dfsvisited will help us to trace our stack movement
        }
    }
}

//Start -> visited(true) dfsvist(true)
//end vapas jaate hue dfsvis(false)
//if vis[i][j] == true already visited go back  no explore
//cycle detection condition ---> if(vis[i][j] == true && dfsvis[i][j]== true)  --> cycle
function dfsCycleDetection( graphcompentmatrix , srcr,srcc, visited , dfsVisited) { 
 visited[srcr][srcc] = true;
 dfsVisited[srcr][srcc] = true;


 dfsVisited[srcr][srcc] = false;
}
