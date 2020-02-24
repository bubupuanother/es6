/**
 * class
 * ES6 的class可以看作只是一个语法糖
 * class写法只是让对象原型的写法更加清晰、更像面向对象编程
 * 方法之间不需要逗号分隔
 */
class Point {
	constructor(x, y) {
		this.x = x
		this.y = y
	}

	toString() {
		return '(' + this.x + ', ' + this.y + ')'
	}
}

//使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致
class Bar {
	doStuff() {
		console.log('stuff')
	}
}

var b = new Bar()
b.doStuff() // "stuff"



/**
 * constructor
 * constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法
 * 没有加会默认加上空的constructor
 */
class Point {
}

// 等同于
class Point {
	constructor() { }
}

//constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象
class Foo {
	constructor() {
		return Object.create(null)
	}
}

new Foo() instanceof Foo
// false



/**
 * 类的实例
 * 使用new命令
 */
class Point {
	// ...
}

// 报错
var point = Point(2, 3)

// 正确
var point = new Point(2, 3)


//  取值函数（getter）和存值函数（setter）
//  对某个属性设置存值函数和取值函数，拦截该属性的存取行为

class MyClass {
	constructor() {
		// ...
	}
	get prop() {
		return 'getter';
	}
	set prop(value) {
		console.log('setter: ' + value);
	}
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'

// 属性表达式
// 类的属性名，可以采用表达式
let methodName = 'getArea';

class Square {
	constructor(length) {
		// ...
	}

	[methodName]() {
		// ...
	}
}

//Class 表达式
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
}



/**
 * ！！！
 * 类和模块的内部，默认就是严格模式
 * 类不存在变量提升
 * 由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性
 * 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数
 * 类的方法内部如果含有this，它默认指向类的实例，小心使用
 */