## simulited-ripple

触摸涟漪反馈效果, 存在比较严重的兼容性问题, 自己做着玩的, 没有可以做兼容, 供大家欣赏<br>

[查看DEMO](https://qiuguohui.coding.me/demo/simulited-ripple/index.html)<br>


<img src="https://coding.net/u/qiuguohui/p/qiuguohui.coding.me/git/raw/master/demo/simulited-ripple/assets/demo.png" width="250" />

### 安装方法
-  方式一
```bash
npm install simulited-ripple --save
```

- 方式二

```bash
下载项目中的dist/simulited-ripple.min.js, 然后用script标签插入到你的项目中, 如下
这种方式可以通过window.SimulitedRipple访问
```

```html
<script type="text/javascript" src="dist/simulited-ripple.min.js"></script>
```

<br>

### 使用方法

```js
import SimulitedRipple from 'simulited-ripple'

// 最简单的使用方法
new SimulitedRipple('.btn')

// 更多配置
new SimulitedRipple('.btn', {
  time: 1200, // 设置涟漪时间
  hideSelf: true // 设置动画过程是否将原图隐藏
})
```
