const marks = [10,20,30,40,50,60];

// INDEX OF - to find index of 30
console.log("Index of 30 is :"+marks.indexOf(30));

// INCLUDES - to check if the array includes a value -BOOLEAN 
console.log("Verifying wheter the array includes 120 : "+marks.includes(120));

//POP PUSH UNSHIFT LENGTH 
marks.pop(); // delete last value from the array

marks.push(70); // Add a value at the end  --> nth position 
marks.unshift(5);  // Add a value to the first position-->  0th  position
console.log(marks); 
console.log ("Length of Array is : "+marks.length); 

// SLICE to get a subset of the array 

submarks = marks.slice(2,5); // It will start from 2nd position and end at 4th position

console.log("SLICED ARRAY  : "+ submarks);

// FILTER | MAP | REDUCE 

// FILTER - to filter values in the ARRAY 
let filteredArray = marks.filter(marks=>marks==70 || marks == 5); // filter


console.log("******FILTERED ARRAY BELOW**********: "); 

console.log(filteredArray);
console.log("************************************: "); 

// MAP - suppose you want the doubled array
let mappedArray   = marks.map(marks=>marks*100000);
console.log("******MAPPED ARRAY BELOW**********: "); 

console.log(mappedArray);
console.log("************************************: "); 

// REDUCE ARRAY operation 
const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log("REDUCED SUM IS : "+sum); // 10

//*************Reverse a String - SRJ ***************************************************************

const textname = "Roshan Thomas";

const a = textname.split(""); // split and stored into an array

console.log(a); 

const b = a.reverse(); // reverse the array

console.log(b);

const c = b.join(""); // join with nothing in between else the comma spearator will come

console.log(c);
//*************End of Reverse a String - SRJ ********************************************************