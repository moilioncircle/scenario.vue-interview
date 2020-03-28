# web 笔试题
## 一. 代码
#### 1. 优化下面的代码

``` js
function showErrorMessage(errorCode) {
  let errorMsg = 'unknown error';
  if (errorCode === 1001) {
    errorMsg = 'network error';
  } else if (errorCode === 1002) {
    errorMsg = 'database error';
  } else if (errorCode === 1003) {
    errorMsg = 'authorization error';
  } else if (errorCode === 1004) {
    errorMsg = 'service not found';
  }
  return errorMsg;
}
```

#### 2. 人肉逻辑机: 看代码, 写输出 

> 下面代码没有写错, 请以代码为准

``` js
async function request() {
  return new Promise(resolve => {
    function callback() {
      console.log(1);
      resolve(2);
    }
    setTimeout(callback(), 100);
    console.log(3);
  });
}

const result = request();
console.log(result);
console.log(4);
```

## 二. 数据结构
#### 1. 链表, 数组的优缺点, 惯用法

## 三. Vue
#### 1. 组件间传值有哪些方法

#### 2. keep-alive 如何缓存某指定组件, 生命周期hook有哪些?

#### 3. 用过 $attrs 与 $listeners 吗? 在处理什么问题时用到的?

### 四. 网络
#### 1. http协议, 你知道哪些控制缓存的方法?

### 五. 工具
#### 1. yarn.lock的作用
