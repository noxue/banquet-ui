/**
 * 字符串去空
 * @param {Object} str
 */
export function trim(str) {
  return String.prototype.trim.call(str)
}

export function isEmpty(string) {
  if (string === null || string === undefined || (typeof string === 'string' && string.trim() === '')) {
    return true
  } else {
    return false
  }
}

/**
 * 判断类型
 * @param {Object} arg
 * @param {Object} type
 */
export function isType(arg, type) {
  return Object.prototype.toString.call(arg) === '[object ' + type + ']'
}

/**
 * 是否是微信微信浏览器
 */
export function isWeixin() {
  return navigator.userAgent.toLowerCase().includes('micromessenger')
}

/**
 * 是否是微信h5开发工具
 */
export function isWeChatH5DevTools() {
  return navigator.userAgent.toLowerCase().includes('wechatdevtools')
}

/**
 * url转对像
 */
export function parseQuery() {
  const res = {}

  const query = (location.href.split('?')[1] || '').trim().replace(/^(\?|#|&)/, '')

  if (!query) {
    return res
  }

  query.split('&').forEach(param => {
    const parts = param.replace(/\+/g, ' ').split('=')
    const key = decodeURIComponent(parts.shift())
    const val = parts.length > 0 ? decodeURIComponent(parts.join('=')) : null

    if (res[key] === undefined) {
      res[key] = val
    } else if (Array.isArray(res[key])) {
      res[key].push(val)
    } else {
      res[key] = [res[key], val]
    }
  })

  return res
}

/**
 * 对象转URL
 */
export function urlEncode(data) {
  const _result = []
  if (typeof data === 'object') {
    for (const key in data) {
      const value = data[key]
      _result.push(key + '=' + value)
    }
    return _result.join('&')
  }
}

export function getBrowserInfo() {
  const ua = window.navigator.userAgent.toLocaleLowerCase()
  let browserType = null
  if (ua.match(/msie/) !== null || ua.match(/trident/) !== null) {
    browserType = 'IE'
  } else if (ua.match(/firefox/) !== null) {
    browserType = '火狐'
  } else if (ua.match(/ubrowser/) !== null) {
    browserType = 'UC'
  } else if (ua.match(/opera/) !== null) {
    browserType = '欧朋'
  } else if (ua.match(/bidubrowser/) !== null) {
    browserType = '百度'
  } else if (ua.match(/metasr/) !== null) {
    browserType = '搜狗'
  } else if (ua.match(/tencenttraveler/) !== null || ua.match(/qqbrowse/) !== null) {
    browserType = 'QQ'
  } else if (ua.match(/maxthon/) !== null) {
    browserType = '遨游'
  } else if (ua.match(/chrome/) !== null) {
    if (window.navigator.userActivation) {
      browserType = '谷歌'
    } else {
      browserType = '360'
      const is360js = _mime('type', 'application/vnd.chromium.remoting-viewer')

      function _mime(option, value) {
        const mimeTypes = navigator.mimeTypes
        for (const mt in mimeTypes) {
          if (mimeTypes[mt][option] === value) {
            return true
          }
        }
        return false
      }

      if (is360js) {
        browserType = '360兼容模式'
      } else {
        browserType = '360急速模式'
      }
    }
  } else if (ua.match(/safari/) !== null) {
    browserType = 'Safari'
  }
  return browserType
}

function classof(o) {
  if (o === null) return 'Null'
  if (o === undefined) return 'Undefined'
  return Object.prototype.toString.call(o).slice(8, -1) // 获取对象类型
}

export function dataType(value) {
  const str = classof(value)
  switch (str) {
    case 'undefined': // undefined类型
      return undefined
    case 'Object': // null类型, 任意内置对象, 数组
      return 'object'
    case 'Boolean': // true, false类型
      return 'boolean'
    case 'String': // string字符串类型
      return 'string'
    case 'Function': // 任意函数
      return 'function'
    case 'Number': // 任意的数值类型,包含NaN
      return 'number'
    case 'Date': // 日期
      return 'date'
    case 'Array': // 数组
      return 'array'
    case 'RegExp': // 正则
      return 'regExp'
    case 'Null': // 正则
      return 'null'
  }
}

export function checkPass(s) {
  if (s.length < 6) {
    return 0
  }
  var ls = 0
  if (s.match(/([a-z])+/)) {
    ls++
  }
  if (s.match(/([0-9])+/)) {
    ls++
  }
  if (s.match(/([A-Z])+/)) {
    ls++
  }
  if (s.match(/[^a-zA-Z0-9]+/)) {
    ls++
  }
  return ls
}

/**
 * 判断版本
 * @desc 并发1.1.0  2.0.0 这样的格式
 * @param v1 版本1
 * @param v2 版本2
 * @return {number} 1 v1大  0 相等 -1 v2大
 */
export function compareVersion(v1, v2) {
  // 执分数组
  v1 = v1.split('.')
  v2 = v2.split('.')

  // 将位数少的版本进行补齐
  const len = Math.max(v1.length, v2.length)
  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  // 接位比较
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}
