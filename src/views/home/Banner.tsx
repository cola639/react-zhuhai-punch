import { FC, useState, useEffect } from 'react'
import styled from 'styled-components'

// ui lib

// components
import { ReactComponent as CalendarIcon } from '@/assets/icons/calendar.svg'

// hooks

// options

// ==============================|| Banner ||============================== //
interface IBanner {}

const Banner: FC<IBanner> = () => {
  // 获取当前日期对象
  const today = new Date()

  // 获取月份 (月份是从0开始的，所以我们要加1)
  const month = String(today.getMonth() + 1).padStart(2, '0')

  // 获取日期 (日)
  const date = String(today.getDate()).padStart(2, '0')

  // 获取星期
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const dayOfWeek = weekDays[today.getDay()]

  // 组合所有信息
  const formattedDate = `${month}月${date}日·${dayOfWeek}`

  useEffect(() => {
    return () => {}
  }, [])

  return (
    <Wrap className="flex-column">
      <div className="title">{formattedDate}</div>
      <div className="flex-center">
        <CalendarIcon className="icon-small icon" />
        <span className="desc">考勤规则-08:30~17:00</span>
      </div>
    </Wrap>
  )
}

const Wrap = styled.div`
  background-color: #fff;
  padding: 6px;
  height: 8vh;

  .title {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 6px;
  }

  .desc {
    font-size: 14px;
    margin-left: 6px;
  }
`

export default Banner
