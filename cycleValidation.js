//Storage -> 2D Array (Basic ) overall it is represent as 3D Matrix
let collectedGraphComponent = [];
let graphComponentMatrix = [];
/**
for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < col; j++) {
        //Why Array -> More than one child relation(dependency) so i.e why use array
        row.push([]); // for entering child details
    }
    graphComponentMatrix.push(row);
}**/

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
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < col; j++) {
            if(visited[i][j] == false){
                let response  = dfsCycleDetection(graphComponentMatrix , i , j, visited , dfsVisited);
                //graphcompentmatrix tell us the relation
                // i & j are starting point
                // visited will tell us kitne elements par visit kar chuke hai
                // dfsvisited will help us to trace our stack movement
                if(response == true) return [i , j];
            }
        }
    }
    return null;
}

//Start -> visited(true) dfsvist(true)
//end vapas jaate hue dfsvis(false)
//if vis[i][j] == true already visited go back  no explore
//cycle detection condition ---> if(vis[i][j] == true && dfsvis[i][j]== true)  --> cycle
// Return  ---> True(cyclic then return) or False(keep moving in graph)
function dfsCycleDetection( graphComponentMatrix , srcr,srcc, visited , dfsVisited) { 
 visited[srcr][srcc] = true;
 dfsVisited[srcr][srcc] = true;
 // A1 ---> [[0 ,1] , [1,0] , [5 ,10] ......]
 for(let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++){
     let[nbrr , nbrc] = graphComponentMatrix[srcr][srcc][children];    // nbrr neighbour row  nbrc neighbour coloumn
     if(visited[nbrr][nbrc] === false){
         let response = dfsCycleDetection(graphComponentMatrix, nbrr , nbrc, visited, dfsVisited);
         if(response == true) return true; // Found cycle so return , no need to visit further paths
     }
     else if (visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc] === true){
         //Found Cylce so return , no need to visit further paths
         return true;
     }
  }

 dfsVisited[srcr][srcc] = false;
 return false;
}
