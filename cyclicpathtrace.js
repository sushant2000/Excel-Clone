/**CYCLE DETECTION ALGO PART STARTS */

//Boolena func true denote cycle vise versa not cycle
function isGraphCyclicTracePath(graphComponentMatrix) {
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

    /**for (let i = 0; i < rows; i++) {
        for (let j = 0; j < col; j++) {
            if(visited[i][j] == false){
                let response  = dfsCycleDetection(graphComponentMatrix , i , j, visited , dfsVisited);
                //graphcompentmatrix tell us the relation
                // i & j are starting point
                // visited will tell us kitne elements par visit kar chuke hai
                // dfsvisited will help us to trace our stack movement
                if(response == true) return true;
            }
        }
    }**/
    
    return false;
}

function dfsCycleDetectionTracePath( graphComponentMatrix , srcr,srcc, visited , dfsVisited) { 
 visited[srcr][srcc] = true;
 dfsVisited[srcr][srcc] = true;
 // A1 ---> [[0 ,1] , [1,0] , [5 ,10] ......]
 for(let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++){
     let[nbrr , nbrc] = graphComponentMatrix[srcr][srcc][children];
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


/**CYCLE DETECTION ALGO PART ENDS */