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

``` js
// 答案: 利用object的key-value来快速查找.  switch case方案是初级解法
const ERROR_MESSAGE = {
  1001: 'network error',
  1002: 'database error',
  1003: 'authorization error',
  1004: 'service not found',
};
function showErrorMessage(errorCode) {
  return ERROR_MESSAGE[errorCode] || 'unknown error';
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

```
结果:
1
Promise对象
4

-----------------------------
 考察点: 
Promise 与 callback 函数的使用
故意调用request时没加await, 故意将callback()传给setTimeout

```

## 二. 数据结构
#### 1. 链表, 数组的优缺点, 惯用法

## 三. Vue
#### 1. 组件间传值有哪些方法
```
答案: 
1. props+emit
2. EventBus(即Vue Component的 $emit, $on), Vuex
```

#### 2. keep-alive 如何缓存某指定组件, 生命周期hook有哪些?
```
答案:
include(包含的组件缓存) 与 exclude(排除的组件不缓存，优先级大于include) 
activated / deactivated 生命周期hook
```

#### 3. 用过 $attrs 与 $listeners 吗? 在处理什么问题时用到的?
```
答案:
 在对组件进行二次封装时, 很有用, 使用起来的感觉类似于http interceptor
```

### 四. 网络
#### 1. http协议, 你知道哪些控制缓存的方法?
```
答案:
 Cache-Control: maxAge, Last-Modified, Etag等
```

### 五. 工具
#### 1. yarn.lock的作用
```
答案:
 锁定依赖的版本号, 避免协作开发或上线部署时, 因依赖的版本不同, 而出现bug
```
