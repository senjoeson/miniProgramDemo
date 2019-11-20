# taro 框架介绍

#### 简介(目前只用于开发小程序)

Taro 是一套遵循 React 语法规范的 多端开发 解决方案。现如今市面上端的形态多种多样，Web、React-Native、微信小程序等各种端大行其道，当业务要求同时在不同的端都要求有所表现的时候，针对不同的端去编写多套代码的成本显然非常高，这时候只编写一套代码就能够适配到多端的能力就显得极为需要。

使用 Taro，我们可以只书写一套代码，再通过 Taro 的编译工具，将源代码分别编译出可以在不同端（微信/百度/支付宝/字节跳动小程序、H5、React-Native 等）运行的代码。

#### 设备兼容

参考设计稿，按照设计稿1:1尺寸编写样式，单位使用px。taro会根据config/index.js 文件以下配置，自动换算单位；
```js
    designWidth: 750,
    deviceRatio: {
        "640": 2.34 / 2,
        "750": 1,
        "828": 1.81 / 2
    },
```
* 如果，设计稿尺寸为640px；则designWidth属性设置为640即可。

#### 路由

```js
// 跳转到目的页面，打开新页面
Taro.navigateTo({
  url: '/pages/page/path/name'
})

// 跳转到目的页面，在当前页面打开 重定向
Taro.redirectTo({
  url: '/pages/page/path/name'
})

// 路由传参 传入参数 id=2&type=test
Taro.navigateTo({
  url: '/pages/page/path/name?id=2&type=test'
})

//获取路由参数
class C extends Taro.Component {
  componentWillMount () {
    console.log(this.$router.params) // 输出 { id: 2, type: 'test' }
  }
}

```
#### 开发注意事项
* 不能使用 Array#map 之外的方法操作 JSX 数组 (taro/manipulate-jsx-as-array);
Taro 在小程序端实际上把 JSX 转换成了字符串模板，而一个原生 JSX 表达式实际上是一个 React/Nerv 元素(react-element)的构造器，因此在原生 JSX 中你可以随意地一组 React 元素进行操作。但在 Taro 中你只能使用 map 方法，Taro 转换成小程序中 wx:for。
无效代码
```js
test.push(<View />)

numbers.forEach(numbers => {
  if (someCase) {
    a = <View />
  }
})

test.shift(<View />)

components.find(component => {
  return component === <View />
})

components.some(component => component.constructor.__proto__ === <View />.constructor)
```

解决方案
先处理好需要遍历的数组，然后再用处理好的数组调用 map 方法。
```js
numbers.filter(isOdd).map((number) => <View />)

for (let index = 0; index < array.length; index++) {
  // do you thing with array
}

const element = array.map(item => {
  return <View />
})
```

* 不要以 id、class、style 作为自定义组件的属性与内部 state 的名称，因为这些属性名在微信小程序小程序中会丢失。
* 不要在 state 与 props 上用同名的字段，因为这些被字段在微信小程序中都会挂在 data 上。
* 不要在render方法直接获取路由参数, 由于微信小程序里页面在 onLoad 时才能拿到页面的路由参数，而页面 onLoad 前组件都已经 attached 了。因此页面的 componentWillMount 可能会与预期不太一致
```js
// 错误写法
render () {
  // 在 willMount 之前无法拿到路由参数
  const abc = this.$router.params.abc
  return <Custom adc={abc} />
}

// 正确写法
componentWillMount () {
  const abc = this.$router.params.abc
  this.setState({
    abc
  })
}
render () {
  // 增加一个兼容判断
  return this.state.abc && <Custom adc={abc} />
}
```
* 在 Taro 中，JS 代码里必须书写单引号，特别是 JSX 中，如果出现双引号，可能会导致编译错误。