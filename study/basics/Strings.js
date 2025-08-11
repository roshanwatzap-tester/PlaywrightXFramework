const date1 = '27';
const date2= '23';
// Convert string to integer 
const diff = parseInt(date1)-parseInt(date2); 

//const diff = date2-date1; 
console.log("Difference is :"+diff.toString()); // reverse to back to string is .toString()

const day = 'Tuesday';
const spliced = day.slice(0,4);
console.log("Spliced data is :" + spliced); 

//Concatenate string
let newQuote = day+" Is Fun Day."  // Tuesday is Funday 
console.log(newQuote); 
// IndexOf
console.log("Index of Tuesday in u is : "+day.indexOf('u'));



// Monday is a Great day and a Fun day  - how many times 'day' occurs

let quote = "Monday is a Great day and a Fun day";
let count =0;
    let value = quote.indexOf('day');

    while(value!== -1)
    {
        count++; 
        value = quote.indexOf('day',value+1);

    }

    console.log("Count of Day term appearing: " + count); 