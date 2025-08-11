function bubbleSort(arr) 
{  const n = arr.length;
  let count =arr.length -1; 
  for (let i = 0; i < count; i++) 
 {
    let swapped = false; // Track if any swap happened this pass

    for (let j = 0; j < count- i; j++) 
      {
      if (arr[j] > arr[j + 1]) 
        {    
          [arr[j],arr[j+1]] =[arr[j+1],arr[j]]


        swapped = true;
      }
    }

    if (!swapped) {
      // No swaps means array is sorted
      break;
    }
  } // end for loop
  return arr;
}
 let arr =[78, 2, 1, 4, 99]; 
 bubbleSort(arr);
 console.log(arr);

