//默认参数

const fn1 = function (x, y) {
	y = y || 2
	console.log(x, y)
}

const fn1 = function (x, y = 2) {
	console.log(x, y)
}

fn1(1) //1,2
fn1(1, 3) //1,3
fn1(1, '') //1,2


/**
 * 变量是默认声明的，不能用let或const再次声明
 * 使用参数默认值时，函数不能有同名参数
 * 参数默认值不是传值的，而是每次都重新计算默认值表达式的值,参数默认值是惰性求值的
 */
const fn = function (x = 1) {
	let x = 2 //报错
	const x = 2 //报错
}

let a = 99
const fn2 = function (y = a + 1) {
	console.log(y)
}
fn2() //100
a = 100
fn2() //101

const fn3 = function ({ x, y = 5 }) {
	console.log(x, y)
}

fn3({}) // undefined,5
fn3({ x: 1 }) //1,5
fn3({ x: 1, y: 2 }) //1,2
fn3() //报错

const fn3 = function ({ x, y = 5 } = {}) {
	console.log(x, y)
}
fn3() //undefined 5

const fn4 = function (x = 1, y) {
	return [x, y]
}

fn4() // [1, undefined]
fn4(2) // [2, undefined]
//fn4(,1) //报错
fn4(undefined, 1) // [1, 1]

	(function (a) { }).length // 1
	(function (a = 5) { }).length // 0
	(function (a, b, c = 5) { }).length // 2

//rest参数
const add = function (...num) {
	console.log(num)
}

add(2, 3, 4) //[2, 3, 4]

//严格模式
// 报错
function doSomething(a, b = a) {
	'use strict';
	// code
}
// 报错
const doSomething = function ({ a, b }) {
	'use strict';
	// code
};
// 报错
const doSomething = (...a) => {
	'use strict';
	// code
};
const obj = {
	// 报错
	doSomething({ a, b }) {
		'use strict';
		// code
	}
};

//箭头函数
/**
 * 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
 * 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
 * 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
 * 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
 * 上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭 
 */

const f1 = v => v //const f1 = function(v){ return v }

//函数的尾逗号
// 函数定义和调用时，都不允许最后一个参数后面出现逗号。
function a(a, b, ) {
} // 报错
a(1, 2)//报错