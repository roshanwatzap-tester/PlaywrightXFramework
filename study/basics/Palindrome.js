

function paldrmVerify(text)
{
   const thetext = text.toLowerCase(); 

   const reversed =thetext.split("").reverse().join("");

   if (thetext === reversed)
    {return true}
   else
    {return false}

}

console.log(paldrmVerify('Madam'));
console.log(paldrmVerify("malayalaM"));

console.log(paldrmVerify("Jikku"));

