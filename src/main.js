import { checkNode } from './utils/check'
import { showWarn } from './utils/log'
import isPC from './utils/isPC'
import { base64Ripple } from './assets/images/ripple'
import Promise from 'promise'
import animationData from './utils/animation-data'

const BOX_CLASSNAME = 'simulated-ripple-box'
var ISPC = isPC()

class TouchRipple {
  constructor (el, hideSelf) {
    this.initData(el, hideSelf) && this.init()
  }

  /**
   * 检查和初始化传入参数
   */
  initData (el, hideSelf) {
    this.el = checkNode(el)
    if (!this.el) return
    this.filterId = `filter-ripple-${new Date() - 0}`
    this.hideSelf = hideSelf
    return true
  }

  init () {
    this.el.style.filter = `url(#${this.filterId})`
    this.createSvg()
    this.addClickEvent()
  }

  createSvg () {
    // 创建svg
    let { offsetTop, offsetLeft } = this.el
    let el = this.el
    let { offsetWidth, offsetHeight } = this.el
    this.svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
    let svg = this.svg
    svg.setAttribute('version', '1.1')
    svg.setAttribute('class', 'svg-filter')
    svg.setAttribute('style', ` position: absolute;
                                left: ${offsetLeft}px; 
                                top: ${offsetTop}px; 
                                z-index: -1;
                                opacity: 0;
                                width: ${offsetWidth}px;
                                height: ${offsetHeight}px`)
    svg.innerHTML = `
    <defs>
      <filter id="${this.filterId}">
        <feImage href="${base64Ripple}" x="30" y="20" width="0" height="0" result="ripple"></feImage>
        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" color-interpolation-filters="sRGB" in="SourceGraphic" in2="ripple" scale="20" result="dm" />
        <feComposite operator="in" in2="ripple"></feComposite>
        <feComposite class="SourceGraphic" in2="SourceGraphic"></feComposite>
      </filter>
    </defs>
    `
    el.parentNode.insertBefore(svg,el)
  }

  addClickEvent () {
    this.el.addEventListener('mousedown', this.onShowRipple.bind(this))
  }

  onShowRipple (e) {
    if (this.showingRipple) return
    this.showingRipple = true

    var turb = document.querySelector(`#${this.filterId} feImage`)
    var feDisplacementMap = document.querySelector(`#${this.filterId} feDisplacementMap`)
    var feComposite = document.querySelector(`#${this.filterId} .SourceGraphic`)
    let hideSelf = this.hideSelf
    if (hideSelf) {
      feComposite.setAttribute('in2', '')
    }
    // console.log(feComposite.attributes.scale.value)
    if (!turb) return
    const width = this.el.offsetWidth
    const height = this.el.offsetHeight
    let length = width > height ? width : height
    length = length * 3

    let oldX = e.offsetX
    let oldY = e.offsetY
    let time = 1200
    console.log(width, height, oldX, oldY)
    // 执行动画
    let setX = animationData.set(turb.attributes.x, 'value', oldX, oldX - length / 2, time)
    let setY = animationData.set(turb.attributes.y, 'value', oldY, oldY - length / 2, time)
    let setW = animationData.set(turb.attributes.width, 'value', 0, length, time)
    let setH = animationData.set(turb.attributes.height, 'value', 0, length, time)
    let setS = animationData.set(feDisplacementMap.attributes.scale, 'value', 30, 0, time)
    // 等待动画执行完毕
    // await setX
    // await setY
    // await setW
    // await setH
    // setTimeout(() => {
    //   console.log('执行完毕')
    //   turb.attributes.x.value = oldX
    //   turb.attributes.y.value = oldY
    //   turb.attributes.width.value = 0
    //   turb.attributes.height.value = 0
    //   feDisplacementMap.attributes.scale.value = 20
    //   this.showingRipple = false
    // }, time)
    setH.then(() => {
      setTimeout(() => {
        console.log('执行完毕')
        turb.attributes.x.value = oldX
        turb.attributes.y.value = oldY
        turb.attributes.width.value = 0
        turb.attributes.height.value = 0
        feDisplacementMap.attributes.scale.value = 0
        if (hideSelf) {
          feComposite.setAttribute('in2', 'SourceGraphic')
        }
        this.showingRipple = false
      }, 200)
    }).catch((err) => {
      console.log(err)
    })

  }
}

module.exports = TouchRipple
