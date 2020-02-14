import axios from 'axios'
import bqb from './a.jpg'
export default function () { return 'Promise' }

//只要p1、p2、p3之中有一个被rejected，
//p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
// const ajax = () => {
//   return new Promise((resolve, reject) => {
//     axios.get('https://elm.cangdu.org/v2/signout')
//       .then( res => {
//         resolve(res)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }

// const pall1 = Promise.all([ajax(), ajax(), ajax()])
//   .then(res => {
//     console.log(res)
//   })

//   p的状态由p1、p2、p3决定，分成两种情况。
  // const p1 = new Promise((resolve, reject) => {
  //   reject(1)
  // })
  //   .catch(err => {
  //     console.log(err)
  //   })

  // const p2 = new Promise((resolve, reject) => {
  //   resolve(2)
  // })

  // const p3 = new Promise((resolve, reject) => {
  //   resolve(3)
  // })

  // const pall2 = Promise.all([p1, p2, p3])
  // .then(res => {
  //   console.log(res)
  // })
  // .catch(err => {
  //   console.log(err)
  // })



//有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。
// const jsPromise = Promise.resolve($.ajax('/whatever.json'));
// 上面代码将 jQuery 生成的deferred对象，转为一个新的 Promise 对象。


//Promise.resolve(1)
// 等价于
//new Promise(resolve => resolve(1))

//参数分为4种

//1.参数是一个 Promise 实例
//那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
//Promise.resolve(ajax())
  // .then(res => {
  //   console.log(res)
  // })

//2.参数是一个thenable对象
//thenable对象指的是具有then方法的对象，比如下面这个对象。

//Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。

// const thenable = {
//   then (resolve, reject) {
//     resolve(42);
//   }
// }

// const pt = Promise.resolve(thenable)
// pt
//   .then(res => {
//     console.log(res)  // 42
//   })

 // 上面代码中，thenable对象的then方法执行后，
 //对象p1的状态就变为resolved，从而立即执行最后那个then方法指定的回调函数，输出 42。

//3.参数不是具有then方法的对象，或根本就不是对象
//如果参数是一个原始值，或者是一个不具有then方法的对象，
//则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。

// const p = Promise.resolve('Hello');
// p
//   .then(res => {
//     console.log(res)  // Hello
//   })

  // 上面代码生成一个新的 Promise 对象的实例p。
  // 由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），
  // 返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。
  // Promise.resolve方法的参数，会同时传给回调函数。

//4.不带有任何参数
//Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。
//如果希望得到一个 Promise 对象，比较方便的方法就是直接调用

// const ps = Promise.resolve();

// ps.then(() => {
//   // ...
// })



//Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

//Promise.reject(1)
// 等价于
//new Promise(reject => reject(1))

// const thenable = {
//   then(resolve, reject) {
//     reject('出错了');
//   }
// }

// Promise.reject(thenable)
// .catch(err => {
//   console.log(err)
//   console.log(err === thenable)
// })
// true

//图片加载实例

const preloadImage =  (path) => {
  return new Promise( (resolve, reject) => {
    const image = new Image()
    image.onload  = resolve
    image.onerror = reject
    image.src = path
  })
}
preloadImage(bqb)
  .then(res => {
    console.log(res)
  })
  .catch( err => [
    console.log(err)
  ])
