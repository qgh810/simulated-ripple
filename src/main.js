import { checkNode } from './utils/check'
import { showWarn } from './utils/log'
import isPC from './utils/isPC'
import { base64Ripple } from './assets/images/ripple'
// import animationData from './utils/animation-data'

const BOX_CLASSNAME = 'simulated-ripple-box'
var ISPC = isPC()

class TouchRipple {
  constructor (el, options) {
    this.initData(el, options) && this.init()
  }

  /**
   * 检查和初始化传入参数
   */
  initData (el) {
    this.el = checkNode(el)
    if (!this.el) return
    this.filterId = `filter-ripple-${new Date() - 0}`
    return true
  }

  init () {
    this.createSvg()
    this.addClickEvent()
  }

  createSvg () {
    // 创建svg
    let { offsetTop, offsetLeft } = this.el
    let el = this.el    
    this.svg = document.createElement('svg')
    let svg = this.svg
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svg.setAttribute('version', '1.1')
    svg.setAttribute('class', 'svg-filter')
    svg.setAttribute('style', ` position: absolute;
                                left: ${offsetLeft}px; 
                                top: ${offsetTop}px; 
                                z-index: -1;
                                opacity: 0;`)
    svg.innerHTML += `
    <defs>
      <filter id="${this.filterId}">
        <feImage xlink:href="${base64Ripple}" x="30" y="20" width="0" height="0" result="ripple"></feImage>
        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" color-interpolation-filters="sRGB" in="SourceGraphic" in2="ripple" scale="20" result="dm" />
        <feComposite operator="in" in2="ripple"></feComposite>
        <feComposite in2="SourceGraphic"></feComposite>
      </filter>
    </defs>
    `

    el.parentNode.insertBefore(svg,el)
  }

  addClickEvent () {
    // this.el.addEventListener('mousedown', this.onShowRipple.bind(this))
  }
}

module.exports = TouchRipple
