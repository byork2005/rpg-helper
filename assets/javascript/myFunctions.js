
// Random Number Generator
function RandomNum(min, max) 
{
    return Math.floor(Math.random() * (max - min) ) + min;
}

// Add numbers in Array, using reduce() method.
// var addedNums = array.reduce(getSumArray)
function getSumArray(total, num)
{
    return total + num;
}