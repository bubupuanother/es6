//块级作用域
/**
 * let
 * let完全可以取代var，因为两者语义相同，而且let没有副作用
 * 变量应该只在其声明的代码块内有效，var命令做不到这一点。
 * var命令存在变量提升效用，let命令没有这个问题。
*/


/**
 * 全局常量和线程安全
 * let和const之间，建议优先使用const，尤其是在全局环境，不应该设置变量，只应设置常量
 * const可以提醒阅读程序的人，这个变量不应该改变
 * const比较符合函数式编程思想，运算不改变值，只是新建值，而且这样也有利于将来的分布式运算
 * JavaScript 编译器会对const进行优化
 * 防止了无意间修改变量值所导致的错误。
 */

if (true) {
	//console.log(x) //报错
	let x = 1
}


/**
 * 字符串
 * 静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。
 */

const a = 'llo'
const b = 'he' + a + 'world'
const c = `he${a}world`
// a llo
// b helloworld
// c helloworld

/**
 * 结构赋值
 * 使用数组成员对变量赋值时，优先使用解构赋值。
 * 函数的参数如果是对象的成员，优先使用解构赋值。
 * 如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。
 */

const arr = [1, 2, 3, 4]
// const a1 = arr[0]
// const a2 = arr[1]
const [a1, a2] = arr


const add = function (obj) {
	const x = obj.x
	const b = obj.b
}

const add = function ({ a, b }) {
	console.log(a, b)
}
//add({x:1 , y:2})

//4.
/**
 * 对象
 * 单行定义的对象，最后一个成员不以逗号结尾
 * 多行定义的对象，最后一个成员以逗号结尾
 * 对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用Object.assign方法
 * 如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义
 * 对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写。
 */

const obj1 = { a: 1, b: 2 }
const obj2 = {
	a: 1,
	b: 2,
	e: null,
}
obj2.c = 3
Object.assign(obj2, { d: 4 })
obj2.e = 5


/**
 * 数组
 * 使用扩展运算符（...）拷贝数组。
 * 使用 Array.from 方法，将类似数组的对象转为数组。
 * 
 */

const arr1 = [2, 3, 4, 5]
const arr2 = [...arr1]

/**
 * 函数
 * 立即执行函数可以写成箭头函数的形式。
 */
 (() => {
	 console.log('Welcome to the Internet.');
 })();
