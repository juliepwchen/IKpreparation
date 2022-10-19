// Steinhaeuser, Hannes, Will, Tian, Tiwari, Prashant - Director of Volkswgon
//
// You have and 2 dimensional array representation of a classroom:
//            Column
// Row (0, 0) (0, 1), (0, 2)
//     (1, 0) (1, 1), (1, 2)
//     (2, 0) (2, 1), (2, 2)
// 
// Row 0 is closet to the front of the classroom. Column 0 is the left most column of the classroom.
// The kids in the class want to pass notes to one another but they might get caught by the teacher.
// For horizontal passes, a pass from column 0 to column 1 incurs a 90% chance of being caught. The second
// pass from column 1 to column 2 incurs a 45% change of being caught, the third is 22.5 and so on.
// For vertical passes, a pass from row 0 to row 1 incurs a 50% chance of being caught. 
// The second pass from row 1 to row 2 has a 25% change of being caught, the third 12.5 and so on. 
//
// Given a path [(0, 0), (0, 1),
//                       (1, 1)], the probability they get caught = 0.45. 
// Write a algorithm that calculates the above probability.
function notepassing(classroom) {
    let classroom_size = classroom.length;
    let rowsize = classroom[classroom_size-1][0]+1;
    let colsize = classroom[classroom_size-1][1]+1;
    let table=Array(rowsize).fill().map(()=>Array(colsize).fill(0));
   
    table[0][0] = Infinity, table[0][1] = 0.9, table[1][0]=0.5;
    for (let r=1; r< rowsize; r++) {
        for (let c=1; c<colsize; c++) {
            table[r][c] = table[r-1][c] * 0.5;
        }
    }
    return table[rowsize-1][colsize-1];
 }
 console.log('Probability of Passing Notes', notepassing([ [0, 0], [0, 1],[1, 1] ]))
