// ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
const foo = 'bar'
const baz = { foo }
console.log(baz) // {foo: "bar"}

// 等同于

const baz = { foo: foo }


//方法也可以简写
function f(x, y) {
	return { x, y }
}

// 等同于

function f(x, y) {
	return { x: x, y: y }
}

f(1, 2) // Object {x: 1, y: 2}


//注意，简写的对象方法不能用作构造函数，会报错。
const obj = {
	f() {
		this.foo = 'bar'
	}
}

new obj.f() // 报错


/*JavaScript 定义对象的属性，有两种方法。 */
// 方法一
obj.foo = true

// 方法二
obj['a' + 'bc'] = 123

// ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。
let lastWord = 'last word'

const a = {
	'first word': 'hello',
	[lastWord]: 'world'
}

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"
//也可以使用到方法名
let obj = {
	['h' + 'ello']() {
		return 'hi'
	}
}

obj.hello() // hi

// 注意，属性名表达式与简洁表示法，不能同时使用，会报错。
// 报错
const foo = 'bar'
const bar = 'abc'
const baz = { [foo] }

//注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]
const keyA = { a: 1 }
const keyB = { b: 2 }

const myObject = {
	[keyA]: 'valueA',
	[keyB]: 'valueB'
}

myObject // Object {[object Object]: "valueB"}



/**解构赋值 */
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
x // 1
y // 2
z // { a: 3, b: 4 }

//由于解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象。
let { ...z } = null // 运行时错误
let { ...z } = undefined // 运行时错误
// 解构赋值必须是最后一个参数，否则会报错。
let { ...x, y, z } = someObject // 句法错误
let { x, ...y, ...z } = someObject // 句法错误


//解构赋值的拷贝是浅拷贝
let o1 = { a: 1 }
let o2 = { b: 2 }
o2.__proto__ = o1
let { ...o3 } = o2
o3 // { b: 2 }
o3.a // undefined


//...可用于遍历对象
let z = { a: 3, b: 4 }
let n = { ...z }
n // { a: 3, b: 4 }

//因为数组也是对象 所以也适用数组
let foo = { ...['a', 'b', 'c'] }
foo
// {0: "a", 1: "b", 2: "c"}

//如果扩展运算符后面是一个空对象，则没有任何效果
// {...{}, a: 1}
// { a: 1 }

// 如果扩展运算符后面不是对象，则会自动将其转为对象。
// 等同于 {...Object(1)}
// {...1} // {} 字符串也会转成对象

//对象的扩展运算符等同于使用Object.assign()方法。
let aClone = { ...a }
// 等同于
let aClone = Object.assign({}, a)


//如果想完整克隆一个对象，还拷贝对象原型的属性
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj
}


//扩展运算符可以用于合并两个对象。
let ab = { ...a, ...b }
// 等同于
let ab = Object.assign({}, a, b)