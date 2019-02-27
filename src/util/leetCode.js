/**
 * Created by yi.dai on 2019/2/15.
 */
// 给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数。
//
// 示例 1 :
//
// 输入:nums = [1,1,1], k = 2
// 输出: 2 , [1,1] 与 [1,1] 为两种不同的情况。
// 说明 :
//
//     数组的长度为 [1, 20,000]。
// 数组中元素的范围是 [-1000, 1000] ，且整数 k 的范围是 [-1e7, 1e7]。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

function sumArrItem(nums, i, j) {
  let sum = 0;
  let x = i;
  const y = j;
  for(; x <= y; x++) {
    sum += nums[x];
  }

  return sum;
}

const subarraySum = function(nums, k) {
  const len = nums.length;
  let res = 0;
  for(let i = 0; i < len; i++) {
    for(let j = i; j < len; j++) {
      if(sumArrItem(nums, i, j) === k) {
        res += 1;
      }
    }
  }
  return res;
};

// 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
//
// 示例 1：
//
// 输入: "babad"
// 输出: "bab"
// 注意: "aba" 也是一个有效答案。
// 示例 2：
//
// 输入: "cbbd"
// 输出: "bb"
/**
 * @param {string} s
 * @return {string}
 */

const longestPalindrome = function(c) {
  if(!c) return c;

  let res = c[c.length - 1];
  let s = false;
  for(let i = 0; i < c.length; i++) {
    for(let j = 0; j < c.length; j++) {
      s = loop(c, i, j);

      if(s) {
        res = res.length > c.slice(i, j + 1).length ? res : c.slice(i, j + 1);
      }
    }
  }
  return res;
};


var loop = function(char, i, j) {
  if(i === j) {
    return true;
  }
  if(j === i + 1) {
    return char[i] === char[j];
  }
  if(j - i >= 2) {
    return (char[i] === char[j] && loop(char, i + 1, j - 1));
  }
  return false;
};

// 5个物品，（重量，价值）分别为：（5，12），（4，3），（7，10），（2，3），（6，6）。
// n个物品，W重量

function loop() {

}
