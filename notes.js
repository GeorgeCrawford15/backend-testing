// This code demonstrates the use of the filter method in JavaScript to create a new array with elements that pass a test implemented by the provided function.
// It also shows how callback functions work in JavaScript, where a function is passed as an argument to another function.
const numbers = [1, 2, 3, 4, 5];

// Callback function: (num) => num % 2 === 0
const evenNumbers = numbers.filter((num) => num % 2 === 0);
/*
WHAT THE CODE ABOVE DOES:

Callback function is executed for each element:
1. The .filter() method goes through each element in the array one by one.
2. It calls the callback function for each element, passing that element as an argument to the function.

Callback returns true or false:
1. Inside the callback, we define a condition (e.g., num % 2 === 0), and the callback returns either true or false based on that condition.
2. If the callback returns true, that element is included in the new array returned by .filter().
3. If it returns false, the element is excluded from the new array.
*/

console.log(evenNumbers); // [2, 4]
