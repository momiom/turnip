/* eslint-disable no-empty-pattern */

const debounce = (fn, interval) => {
  let timer
  return function() {
    clearTimeout(timer)
    timer = setTimeout(function() {
      fn()
    }, interval)
  }
}

const throttle = function(fn, delay) {
  let timerId
  let lastExecTime = 0
  return () => {
    const context = this
    const args = arguments
    const elapsedTime = performance.now() - lastExecTime
    const execute = () => {
      fn.apply(context, args)
      lastExecTime = performance.now()
    }
    if (!timerId) {
      execute()
    }
    if (timerId) {
      clearTimeout(timerId)
    }
    if (elapsedTime > delay) {
      execute()
    } else {
      timerId = setTimeout(execute, delay)
    }
  }
}

const zip = (...args) => {
  args = [].slice.call(args)
  const shortest =
    args.length === 0
      ? []
      : args.reduce((a, b) => (a.length < b.length ? a : b))
  return shortest.map((_, i) => {
    return args.map((array) => {
      return array[i]
    })
  })
}

const isUndefined = (x) => typeof x === 'undefined'

const brOpt = (str) => {
  const regex = /\|-(.+?)-\|/g
  const replacement = '<span style="display: inline-block;">$1</span>'
  return str.replace(regex, replacement)
}

export default ({}, inject) => {
  inject('debounce', debounce)
  inject('throttle', throttle)
  inject('zip', zip)
  inject('isUndefined', isUndefined)
  inject('brOpt', brOpt)
}
