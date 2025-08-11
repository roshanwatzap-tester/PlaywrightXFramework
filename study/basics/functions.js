

function add(a,b)
{
    return a+b;
}
let sum = add(2,3);
console.log(sum); 

//Anonymous function 

let total= function(a,b)
{return a+b;}

// FULLY ANONYMOUS FUNCTION

let totalOfNumbers = (a,b) => (a+b); 

const k = totalOfNumbers(5,5); 
console.log("FULLY ANONYMOUS FUNCTION- SUM is : "+k);