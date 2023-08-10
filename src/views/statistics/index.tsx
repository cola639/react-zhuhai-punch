import { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { Calendar } from 'antd-mobile'
import { Steps } from 'antd-mobile'
// ui lib

// components

// hooks

// options
const { Step } = Steps
// ==============================|| index ||============================== //
interface IStatistics {}

const Statistics: FC<IStatistics> = () => {
  useEffect(() => {
    return () => {}
  }, [])

  return (
    <Wrap className="flex-column">
      <div className="calendar">
        <Calendar
          nextYearButton={false}
          prevYearButton={false}
          renderDate={date => {
            const dates = [16, 17, 18, 19]
            const d = dayjs(date).date()
            return <div className="custom-cell">{d}</div>
          }}
        />
      </div>

      <div className="detail">
        <Steps
          className="detail_steps"
          direction="vertical"
          style={{
            '--title-font-size': '17px',
            '--description-font-size': '15px',
            '--indicator-margin-right': '12px',
            '--icon-size': '22px'
          }}
        >
          <Step title="签到时间" description="最晚签到时间：08：30" status="process" />
          <Step title="签退时间" description="最晚签到时间：17：30" status="wait" />
        </Steps>
      </div>
    </Wrap>
  )
}

const Wrap = styled.div`
  .calendar {
    background-color: #fff;
    width: 95vw;
    margin-top: 10px;
  }

  .detail {
    width: 95vw;
    height: 20vh;
    background-color: #fff;
    border-radius: 6px;
    margin-top: 10px;
    .detail_steps {
      margin-left: 0.5333rem;
    }

    .custom-cell {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      &-selected {
        background: #5628ee;
        color: #fff;
      }
    }
  }
`

export default Statistics
