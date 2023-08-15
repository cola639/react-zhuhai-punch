import { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 导入中文语言包

import { ReactComponent as CalendarIcon } from '@/assets/icons/calendar.svg'

interface IBanner {}

const Banner: FC<IBanner> = () => {
  const [formattedDate, setFormattedDate] = useState('')

  const updateDate = () => {
    const currentDate = dayjs().locale('zh-cn')
    const formatted = `${currentDate.format('MM月DD日·dddd')}`
    setFormattedDate(formatted)
  }

  useEffect(() => {
    updateDate() // 初始化时更新日期

    const interval = setInterval(updateDate, 1000) // 每秒更新日期

    return () => clearInterval(interval) // 组件卸载时清除定时器
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
