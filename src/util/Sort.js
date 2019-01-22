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
      for (let j = 1; j < arr.length - 1 - i; j++) {
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
  static partition(arr, left, right) {
    if (Object.prototype.toString.call(arr) !== '[object Array]') return arr;

    const temp = arr[left];
    while (left < right) {
      while (arr[right] >= temp && left < right) {
        right--;
      }
      arr[left] = arr[right];

      while (arr[left] <= temp && left < right) {
        left++;
      }
      arr[right] = arr[left];
    }
    arr[left] = temp;
    return left;
  }

  static quickSort(arr, left, right) {
    if (left >= right) {
      return;
    }
    const pivot = Sort.partition(arr, left, right);
    Sort.quickSort(arr, left, pivot - 1);
    Sort.quickSort(arr, pivot + 1, right);
  }

  static duiSort() {

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
