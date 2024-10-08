// Remember, we're gonna use strict mode in all scripts now!
"use strict";

///////////////////////////////////////
// Using Google, StackOverflow and MDN

// PROBLEM 1:
// We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

// 1) Understanding the problem
// - What is temp amplitude? Answer: difference between highest and lowest temp
// - How to compute max and min temperatures?
// - What's a sensor error? And what to do?

// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array
// - Find min value in temp array
// - Subtract min from max (amplitude) and return it

function calcTempAmplitude(temps) {
  //   console.log(Math.isnan(temps));
  //   let max = Math.max(...temps);
  //   console.log(max);
  //   return max;
  let max = temps[0];
  let min = temps[0];
  for (let index = 0; index < temps.length; index++) {
    if (temps[index] > max) max = temps[index];
    if (temps[index] < min) min = temps[index];
  }
  console.log(max, min);
  let amplitude = max - min;
  return amplitude;
  //   return max, min;
}

console.log(calcTempAmplitude(temperatures));
