/**
 * 扩展运算符（spread）是三个点（...）。
 * 它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
 * 该运算符主要用于函数调用
 * 可用于表达式
 */
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

//函数调用
function push(array, ...items) {
	array.push(...items)
}

function add(x, y) {
	return x + y
}

const numbers = [4, 38]
add(...numbers) // 42


	// 如果扩展运算符后面是一个空数组，则不产生任何效果。
	// [...[], 1]
	// [1]

	//注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。
	(...[1, 2])
// Uncaught SyntaxError: Unexpected number

// console.log((...[1, 2]))
// Uncaught SyntaxError: Unexpected number

console.log(...[1, 2])
// 1 2



/**
 * 数组实例的find方法，用于找出第一个符合条件的数组成员
 * 找到返回值为true
 * 找不到为undefined
 */
[1, 4, -5, 10].find((n) => n < 0)
// -5

//find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
[1, 5, 10, 15].find(function (value, index, arr) {
	return value > 9
}) // 10


/**
 * findIndex与find相似
 * 找到为true
 * 找不到返回-1
 */
[1, 5, 10, 15].findIndex(function (value, index, arr) {
	return value > 9
}) // 2

//find函数接收了第二个参数person对象，回调函数中的this对象指向person对象。
function f(v) {
	return v > this.age
}
let person = { name: 'John', age: 20 }
[10, 12, 26, 15].find(f, person)    // 26

//这两个方法都可以发现NaN
[NaN].findIndex(y => Object.is(NaN, y))
// 0


/**
 * includes方法返回一个布尔值，
 * 与字符串的includes方法类似
 * 找到返回true
 * 找不到返回false
 */
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false

//可以接第二个参数，为起始位置，为负数就从0开始
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true

//可以查找NaN
[NaN].includes(NaN)
// true



/**
 * flat用于数组扁平化
 */
[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]

//默认只会扁平化一层  可以输入参数表示扁平化几层
//如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数
[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]


/**
 * flatMap
 * 对数组的每一个成员执行map方法 对返回值执行flat方法
 * 返回新数组 不改变原数组
 * 只能展开一层数组
 * 该函数可以接受三个参数
 * 当前数组成员、当前数组成员的位置、原数组
 */
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]

// arr.flatMap(function callback(currentValue[, index[, array]]) {
//   // ...
// }[, thisArg])