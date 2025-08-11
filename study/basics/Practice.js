//Bubblesort

/*

let arr =[78,2,45,99,3,1]; 
count = (arr.length)-1;

for(let i=0;i<count;i++)
{
    swapped =false;

    for(let j=0;j<count-i;j++)
    {
        if(arr[j]>arr[j+1])
        {
            [arr[j],arr[j+1]] =  [arr[j+1],arr[j]];
            swapped =true;
        }

    }
    if(swapped==false)
    {break;}

}

console.log(arr);


let fruits =['mango','orange','pineapple','grapes']; 

let count =fruits.reduce((acc)=>acc+1,0)
console.log("Fruits Count is : "+ count); 


// reduce to find count of fruits ***** DIDNT STUDY THIS 
let count1 =fruits.reduce((acc,fruits)=>
    {
       acc[fruits] = (acc[fruits] || 0)+ 1;
        return acc;
    }, {});
console.log("Fruits Count is : "+ count1); 

let marks =[1,2,3,4,5,5]; 

let totalMarks= marks.reduce((acc,marks)=>acc+marks,0);
console.log("Total marks:"+totalMarks);

//let total = marks.reduce((acc,marks)=>acc+marks,0);

let orangeArr = fruits.filter((fruits)=>fruits=='orange');
orangeArr.push('more Oranges');
orangeArr.unshift('first Orage');
console.log("Orange filtered array: "+orangeArr)

*/

let fruits =['mango','orange','pineapple','grapes'];

let count =fruits.length; 

console.log(count);
console.log("Count using length:"+count);
let arrcount=0;
for(let i=0; i<count;i++)
{
    if(fruits[i]!== null)
    {
        arrcount++;
    }
}
console.log("Count without length:"+arrcount);