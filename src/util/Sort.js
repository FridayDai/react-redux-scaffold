/* eslint-disable */
/**
 * Created by yi.dai on 2019/1/21.
 */
export default class Sort {
  constructor(arr) {
    //
  }

  static swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }


  // 思路：
  // 1. 定义i从第二个元素开始，一个一个往后走
  // 2. 同时定义j从第i的位置，一个一个往前对比，是否当前值要小于前一个值，如果是的话将大的值swap到后面
  // [3], 1, 2, 5, 4
  // [1, 3], 2, 5, 4
  // [1, 2, 3], 5, 4
  // [1, 2, 3, 5], 4
  // [1, 2, 3, 4, 5]
  static insertSort(arr) {
    if (Object.prototype.toString.call(arr) !== '[object Array]') return arr;
    if (arr.length < 2) return arr;

    for (let i = 1; i < arr.length; i++) {
      for (let j = i; j > 0; j--) {
        if (arr[j] < arr[j - 1]) { // 大的往后排
          this.swap(arr, j, j - 1);
        } else {
          break;
        }
      }
    }

    return arr;
  }

  // 思路：每一次冒泡都把最大的冒到最上面，由于要先比较然后交换，所以i不用遍历的最后一个，只需要arr。length - 1
  //      由于每i次冒泡都能将i个最大的冒出去，所以j不用遍历已经冒出去的i个元素，只需要arr.length - 1 - i
  // 1. 定义两个指针，内循环两两比较，将大的往后移，一轮后就能将最大的冒到最后面
  // 2. 再外循环 i - 1 次即可
  static bubbleSort(arr) {
    if (Object.prototype.toString.call(arr) !== '[object Array]') return arr;

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          this.swap(arr, j, j + 1);
        }
      }
    }
    return arr;
  }

  // 该方法的基本思想是：填坑法
  // 1．先从数列中取出一个数作为基准数。
  // 2．分区过程，将比这个数大的数全放到它的右边，小于或等于它的数全放到它的左边。
  // 3．再对左右区间重复第二步，直到各区间只有一个数。

  quickSort = (array) => {
    const sort = (arr, left = 0, right = arr.length - 1) => {
      if (left >= right) {//如果左边的索引大于等于右边的索引说明整理完毕
        return
      }
      let i = left;
      let j = right;
      const baseVal = arr[j]; // 取无序数组最后一个数为基准值
      while (i < j) {//把所有比基准值小的数放在左边大的数放在右边
        while (i < j && arr[i] <= baseVal) { //找到一个比基准值大的数交换
          i++;
        }
        arr[j] = arr[i];// 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）
        console.log('i: ', arr);
        while (j > i && arr[j] >= baseVal) { //找到一个比基准值小的数交换
          j--;
        }
        arr[i] = arr[j]; // 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
        console.log('j: ', arr);
      }
      arr[j] = baseVal; // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
      console.log('ij: ', arr);
      sort(arr, left, j-1); // 将左边的无序数组重复上面的操作
      sort(arr, j+1, right); // 将右边的无序数组重复上面的操作
    };
    const newArr = array.concat(); // 为了保证这个函数是纯函数拷贝一次数组
    sort(newArr);
    return newArr;
  }


  // 二路归并排序
  static MergeSort(array) {
    if(array.length < 2) {
      return array;
    }

    const index = Math.floor(array.length / 2);
    const left = this.MergeSort(array.slice(0, index));
    const right = this.MergeSort(array.slice(index));

    return this.MergeSortItem()
  }

}

// Function.prototype.call = function myCall(context) {
//     const args = [...arguments].slice(1);
//
//     return this.apply(context, args);
// };
//
// Function.prototype.bind = function myBind(context) {
//     const _this = this;
//     const args = [...arguments].slice(1);
//
//     return function F() {
//         if(this instanceof F) {
//             return new _this(...args, ...arguments);
//         }
//
//         return _this.apply(context, args.concat(...arguments));
//     }
// };

// 0, 1 背包问题
// 物品ID/重量   价值
//   1           3
//   2           7
//   3           12
// 你的背包容量有10，请问怎么放能价值最高

// 思路： f(n) = max{ w[1] + f(n-1), w[2] + f(n-2), w[3] + f(n-3) } ,此时 n>=3， f(1) = 3, f(2) = 7; 放个map用来做缓存
function addToMap(map, key, value) {
  if(!map[key]) {
    map[key] = value;
  }
  return map;
}
const map = {};
function loop(n) {
  if(map[n]) return map[n];

  if(n === 0) {
    addToMap(map, 0, 0);
    return 0;
  }
  if(n === 1) {
    addToMap(map, 1, 3);
    return 3;
  }
  if(n === 2) {
    addToMap(map, 2, 7);
    return 7;
  }

  if(n >= 3) {
    const maxValue =  Math.max(3 + loop(n-1), 7 + loop(n-2), 12 + loop(n-3));
    addToMap(map, n, maxValue);
    return maxValue;
  }
}

// 走台阶问题 ，打印所有方案
function consoleStep(n) {
  if(n === 0) return [];
  if(n === 1) return ['1'];

  if(n === 2) return ['11', '2'];

  if(n > 2) {
    const tempOne = consoleStep(n - 1);
    const tempTwo = consoleStep(n - 2);
    const oneArr = [];
    const twoArr = [];
    tempOne.forEach((item) => {
      const one = `1${item}`;
      oneArr.push(one);
    });
    tempTwo.forEach((item) => {
      const two = `2${item}`;
      twoArr.push(two);
    });

    return oneArr.concat(twoArr);
  }
}

//
