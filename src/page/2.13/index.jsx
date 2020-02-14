//非严格模式 this 代表当前正在执行的对象

const name = '小兰'
//普通函数的 this在调用时指向
const obj = {
	name: '小花',
	testFn() {
		console.log(this.name)
	}
}

obj.testFn()
//小花

const fn = obj.testFn
fn()
//小兰


//箭头函数的 this在定义时已经指向并且不会改变
const obj2 = {
	name: '小花',
	testFn: () => {
		console.log(this.name)
	}
}

obj2.testFn()
// 小兰

obj2.testFn.call({ name: '小黑' })
// 小兰

//Promise
//三种状态 pending（进行中）、fulfilled（已成功）和rejected（已失败
//一旦状态改变，就不会再变，任何时候都可以得到这个结果
//可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数
//无法取消Promise，一旦新建它就会立即执行，无法中途取消。，
//如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
//当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成

const p1 = new Promise(function (resolve, reject) {
	resolve(1)
})
p1
	.then(res => {
		console.log(res)
	})

const p2 = new Promise(function (resolve, reject) {
	reject('错误')
})
p2
	.catch(err => {
		console.log(err)
	})


function loadImg(url) {

	return new Promise(function (resolve, reject) {
		const image = new Image()
		console.log(1)
		image.onload = function () {
			console.log(2)
			resolve(image);
		}

		image.onerror = function () {
			console.log(3)
			reject('Could not load image at ' + url);
		}
		console.log(4)
		image.src = url
	})
}
loadImg('./qq.png')
	.then(res => {
		console.log(res)
	})
	.catch(err => {
		console.log(err)
	})


const p3 = new Promise(function (resolve, reject) {
	resolve(1)
})

const p4 = new Promise(function (resolve, reject) {
	resolve(p3)
})
p4
	.then(res => {
		console.log(res)
	})

const p5 = new Promise(function (resolve, reject) {
	reject('错误')
})
	.catch(err => {
		console.log(err)
	})

p2
	.catch(err => {
		console.log(err)
	})

const pAll = Promise.all([p3, p4, p5])
pAll
	.then(res => {
		console.log(res)
	})
	.catch(err => {
		console.log(err)
	})

const fns = () => {
	return 'abc'
}

Promise.resolve(fns())
	.then(res => {
		console.log(res, 1111)
		return 'edf'
	})
	.then(res => {
		console.log(res, 2222)
		return 'ghi'

	})
	.then(res => {
		console.log(res, 3333)
	})