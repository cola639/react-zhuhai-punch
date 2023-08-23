// @ts-nocheck
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔

    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()

    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时

    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)

      context = args = null
    }

    return result
  }
}

function rad(d) {
  return (d * Math.PI) / 180.0
}

/** 根据两点经纬度 计算距离
 * @param {string} lat1 lat1, lng1, lat2, lng2 第一点的纬度，经度 第二点的纬度，经度
 * @returns {Object}
 */
export function getDistances(lat1, lng1, lat2, lng2) {
  var radLat1 = rad(lat1)
  var radLat2 = rad(lat2)
  var a = radLat1 - radLat2
  var b = rad(lng1) - rad(lng2)
  var s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    )
  s = s * 6378.137 // EARTH_RADIUS;
  // 输出为公里
  s = Math.round(s * 10000) / 10000

  var distance = s
  var distance_str = ''

  if (parseInt(distance) >= 1) {
    // distance_str = distance.toFixed(1) + "km";
    distance_str = distance.toFixed(2) + 'km'
  } else {
    // distance_str = distance * 1000 + "m";
    distance_str = (distance * 1000).toFixed(2) + 'm'
  }

  //s=s.toFixed(4);

  // console.info('距离是', s);
  // console.info('距离是', distance_str);
  // return s;

  //小小修改，这里返回对象
  let objData = {
    distance: distance,
    distance_str: distance_str
  }
  return objData
}

/** 获取当前url中参数
 * @param {string} url
 * @returns {Object}
 */
export function paramToObj(url = window.location.href) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
