// async 函数

/* （1）内置执行器。
Generator 函数的执行必须靠执行器，所以才有了co模块，
而async函数自带执行器。也就是说，async函数的执行，
与普通函数一模一样，只要一行 */
// asyncReadFile();

/* （2）更好的语义。
async和await，比起星号和yield，语义更清楚了。
async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。 */

/* （3）更广的适用性。
co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，
而async函数的await命令后面，可以是 Promise 对象和原始类型的值
（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。 */

/* （4）返回值是 Promise。
async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。
你可以用then方法指定下一步的操作。 
进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，
而await命令就是内部then命令的语法糖。 */

// 函数前面的async关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个Promise对象。
async function aa(name) {
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

aa('goog').then(function (result) {
  console.log(result);
});


// 指定多少毫秒后输出一个值。
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('world', 50);


// 由于async函数返回的是 Promise 对象，可以作为await命令的参数。
// 所以，上面的例子也可以写成下面的形式。
async function timeout(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);



/* 语法
async函数的语法规则总体上比较简单，难点是错误处理机制 */

/* async函数返回一个 Promise 对象。
async函数内部return语句返回的值，会成为then方法回调函数的参数。 */
async function f() {
  return 'world';
}

f().then(v => console.log(v))

/* async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。
抛出的错误对象会被catch方法回调函数接收到。 */
async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log(v),
  e => console.log(e)
)

 
/* Promise 对象的状态变化
async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，
才会发生状态改变，除非遇到return语句或者抛出错误。 */
async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)



/* await 命令
正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。
如果不是 Promise 对象，就直接返回对应的值。 */
async function f() {
  return await 123;
}

f().then(v => console.log(v))

// await命令后面是一个thenable对象（即定义then方法的对象），那么await会将其等同于 Promise 对象。
class Sleep {
  constructor(timeout) {
    this.timeout = timeout;
  }
  then(resolve, reject) {
    const startTime = Date.now();
    setTimeout(
      () => resolve(Date.now() - startTime),
      this.timeout
    );
  }
}

(async () => {
  const sleepTime = await new Sleep(1000);
  console.log(sleepTime);
})();

// await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。
async function f() {
  await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))


/* 错误处理
如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。 */
async function f() {
  await new Promise(function (resolve, reject) {
    throw new Error('出错了');
  });
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))

// 如果有多个await命令，可以统一放在try...catch结构中。
async function main() {
  try {
    const val1 = await firstStep();
    const val2 = await secondStep(val1);
    const val3 = await thirdStep(val1, val2);

    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}



/* async 函数的实现原理
async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。 */
async function fn(args) {
  // ...
}
// 等同于
function fn(args) {
  return spawn(function* () {
    // ...
  });
}