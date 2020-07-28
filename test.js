console.log('1');// 主线程同步代码 
setTimeout(function () {
    console.log('2');
    process.nextTick(function () {
        console.log('3');
    })
    new Promise(function (resolve) {
        console.log('4');
        resolve();
    }).then(function () {
        console.log('5')
    })
})
new Promise(function (resolve) {
    console.log('6');//同步代码
    resolve();
}).then(function () {
    console.log('7')
})
process.nextTick(function () {
    console.log('8');
})
setImmediate(() => {
    console.info('9')
})
new Promise(function (resolve) {
    console.log('10');//同步
    resolve();
}).then(function () {
    console.log('11')
})
setTimeout(function () {
    console.log('12');
    setImmediate(() => {
        console.info('13')
    })
    process.nextTick(function () {
        console.log('14');
    })
    new Promise(function (resolve) {
        console.log('15');
        resolve();
    }).then(function () {
        console.log('16')
    })
})
process.nextTick(function () {
    console.log('17');
})

// 1 6 10 8 17 7 11  2  4  12  15 3 14   5  16  9  13
//结论：同步代码最先执行>process.nextTick()>微任务>timer（定时器）> setImmediate
