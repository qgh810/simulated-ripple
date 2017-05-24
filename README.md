## simulated-ripple

触摸涟漪反馈效果, 可能存在兼容性问题, 供大家欣赏<br>

[查看DEMO](https://qiuguohui.coding.me/demo/simulated-ripple/index.html)<br>


<img src="https://github.com/qgh810/qgh810.github.io/blob/master/demo/simulated-ripple/assets/demo.png?raw=true" width="250" />

### 安装方法
-  方式一
```bash
npm install simulated-ripple --save
```

- 方式二

```bash
下载项目中的dist/simulated-ripple.min.js, 然后用script标签插入到你的项目中, 如下
这种方式可以通过window.SimulatedRipple访问
```

```html
<script type="text/javascript" src="dist/simulated-ripple.min.js"></script>
```

<br>

### 使用方法

```js
import SimulatedRipple from 'simulated-ripple'

// 最简单的使用方法
new SimulatedRipple('.btn')

// 更多配置
new SimulatedRipple('.btn', {
  time: 1200, // 设置涟漪时间
  hideSelf: true // 设置动画过程是否将原图隐藏
})
```
