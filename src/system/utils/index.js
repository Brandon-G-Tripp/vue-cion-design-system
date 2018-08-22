import Vue from 'vue'
import camelCase from 'lodash/camelCase'
import { tokenMap } from '@@/tokens'

const bus = new Vue({
  data: {
    windowSize: {
      width: null,
      height: null
    }
  }
})

function getWindowSize() {
  bus.windowSize.width =
    window.clientWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth

  bus.windowSize.height =
    window.clientHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
}

let init = false

function initListener() {
  if (init) {
    return
  }
  if (window && typeof window !== 'undefined') {
    window.addEventListener('resize', getWindowSize)
    getWindowSize()
    init = true
  }
}

export const windowSize = () => {
  return bus.windowSize
}

export const getResponsiveStyles = (prop, parser) => {
  initListener()
  if (prop === null) {
    return {}
  }
  if (typeof prop !== 'object') {
    return parser(prop)
  }
  let result = prop.base ? parser(prop.base) : {}
  Object.keys(tokenMap.mediaSize)
    .reverse()
    .some(key => {
      const width = tokenMap.mediaSize[key].value
      if (width <= bus.windowSize.width && prop[key]) {
        result = parser(prop[key])
        return true
      }
    })
  return result
}

export const getSpace = space => {
  const spaceName = camelCase(space)
  return tokenMap.spaceSize[spaceName] ? tokenMap.spaceSize[spaceName].value : 0
}
