import Promise from 'promise'
let self = {}

function set (obj, key, oldValue, targetValue, time = 1000) {
  return new Promise((resolve, reject) => {
    let d = targetValue - oldValue
    let step = d / (time / 16)
    obj[key] = oldValue - 0

    ;(function handle () {
      self['frameId' + key] = requestAnimationFrame(handle)
      obj[key] = obj[key] - 0 + step
      if (Math.abs(obj[key] - targetValue) <= Math.abs(step)) {
        obj[key] = targetValue
        cancelAnimationFrame(self['frameId' + key])
        resolve()
      }
    })()
  })
}

export default {set}
