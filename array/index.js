/**
 * @param {number[]} digits
 * @return {number[]}
 */

// increase integer array
var plusOne = function (digits) {
  let co = true;

  for (let i = digits.length - 1; i >= 0 && co; i--) {
    digits[i]++;

    co = digits[i] >= 10;
    co && (digits[i] = 0);
  }

  if (co) {
    digits.unshift(1);
  }
  return digits;
};

// console.debug(plusOne([9]));

// You are given an array of strings products and a string searchWord.
// Design a system that suggests at most three product names from products after each character of searchWord is typed. Suggested products should have common prefix with searchWord. If there are more than three products with a common prefix return the three lexicographically minimums products.
// Return a list of lists of the suggested products after each character of searchWord is typed.

const suggestedProducts = function (products, searchWord) {
  products.sort();
  let result = Array(searchWord.length);

  for (let index = 0; index < searchWord.length; index++) {
    let suggestion = products
      .filter((product) => product[index] === searchWord[index])
      .slice(0, 3);

    result.push(suggestion);
  }
  return result;
};

let products = ["mobile", "mouse", "moneypot", "monitor", "mousepad"];
let searchWord = "mouse";
let result = suggestedProducts(products, searchWord);

// A website domain "discuss.leetcode.com" consists of various subdomains. At the top level, we have "com", at the next level, we have "leetcode.com" and at the lowest level, "discuss.leetcode.com". When we visit a domain like "discuss.leetcode.com", we will also visit the parent domains "leetcode.com" and "com" implicitly.

// A count-paired domain is a domain that has one of the two formats "rep d1.d2.d3" or "rep d1.d2" where rep is the number of visits to the domain and d1.d2.d3 is the domain itself.

// For example, "9001 discuss.leetcode.com" is a count-paired domain that indicates that discuss.leetcode.com was visited 9001 times.
// Given an array of count-paired domains cpdomains, return an array of the count-paired domains of each subdomain in the input. You may return the answer in any order.

// Input: cpdomains = ["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]
// Output: ["901 mail.com","50 yahoo.com","900 google.mail.com","5 wiki.org","5 org","1 intel.mail.com","951 com"]
// Explanation: We will visit "google.mail.com" 900 times, "yahoo.com" 50 times, "intel.mail.com" once and "wiki.org" 5 times.
// For the subdomains, we will visit "mail.com" 900 + 1 = 901 times, "com" 900 + 50 + 1 = 951 times, and "org" 5 times.

/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
const subdomainVisits = function (cpdomains) {
  let visitCounts = {};
  for (let i = 0; i < cpdomains.length; i++) {
    // Split visits and domains by the space
    const [visits, domains] = cpdomains[i].split(" ");

    // Create array of subdomains in domain
    let subdomains = domains.split(".");

    while (subdomains.length) {
      // Join all items in subdomains array
      let subdomain = subdomains.join(".");

      // If subdomain already exists in object, add to existing count
      visitCounts[subdomain] = visitCounts.hasOwnProperty(subdomain)
        ? Number(visitCounts[subdomain]) + Number(visits)
        : visits;

      // Remove first subdomain from array
      subdomains.shift();
    }
  }

  return Object.keys(visitCounts).map((key) => `${visitCounts[key]} ${key}`);
};

const cpdomains = [
  "900 google.mail.com",
  "50 yahoo.com",
  "1 intel.mail.com",
  "5 wiki.org",
];
let result1 = subdomainVisits(cpdomains);
// console.log(result1);

// Given an array of integers nums, calculate the pivot index of this array.

// The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.

// If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.

// Return the leftmost pivot index. If no such index exists, return -1.

/**
 * @param {number[]} nums
 * @return {number}
 */
const pivotIndex = function (nums) {
  let sum = 0;
  let leftSum = 0;

  for (let i = 0; i < nums.length; i++) sum += nums[i];

  for (let i = 0; i < nums.length; i++) {
    if (leftSum === sum - nums[i] - leftSum) return i;
    leftSum += nums[i];
  }

  return -1;
};

// console.log(pivotIndex([1, 7, 3, 6, 5, 6]));

// You are given an integer array nums where the largest integer is unique.

// Determine whether the largest element in the array is at least twice as much as every other number in the array. If it is, return the index of the largest element, or return -1 otherwise.

/**
 * @param {number[]} nums
 * @return {number}
 */
const dominantIndex = function (nums) {
  let largestNum = 0;

  for (let i = 0; i < nums.length; i++) {
    const element = nums[i];
    if (largestNum < element) largestNum = element;
  }

  for (let i = 0; i < nums.length; i++) {
    let twice = nums[i] * 2;
    if (twice > largestNum && nums[i] != largestNum) {
      //   console.log("sdf", twice);
      return -1;
    }
  }

  return nums.indexOf(largestNum);
};

const nums = [1];
let largestIndex = dominantIndex(nums);
// console.log(largestIndex);

// Given an m x n matrix, return all elements of the matrix in spiral order.
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
const spiralOrder = function (matrix) {
  const res = [];

  //   while (matrix.length) {
  //     const first = matrix.shift();
  //     res.push(...first);

  //     for (const m of matrix) {
  //       let val = m.pop();
  //       if (val) res.push(val);
  //       m.reverse();
  //     }

  //     matrix.reverse();
  //   }

  //   console.log(matrix[0][matrix.length]);
  let rowBegin = 0;
  let rowEnd = matrix[0][matrix.length];

  let colBegin = 0;
  let colEnd = matrix[1][matrix.length];

  console.log(colEnd);

  while (rowBegin <= rowEnd && colBegin <= colEnd) {
    // Traverse Right
    for (let j = colBegin; j <= colEnd; j++) {
      res.push(matrix[rowBegin][j]);
    }
    rowBegin++;
  }

  console.log(res);
  return res;
};

const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];

let resultArray = spiralOrder(matrix);
// console.log(resultArray);
