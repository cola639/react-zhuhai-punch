import { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { Calendar } from 'antd-mobile'
import { Steps } from 'antd-mobile'
import classNames from 'classnames'
// ui lib

// components

// hooks

// options
const { Step } = Steps
// ==============================|| index ||============================== //
interface IStatistics {}

const Statistics: FC<IStatistics> = () => {
  const today = dayjs()

  const [selectDate, setSelectDate] = useState<dayjs.Dayjs>(today)

  useEffect(() => {
    return () => {}
  }, [])

  const getDayDetail = (date: dayjs.Dayjs) => {
    console.log('🚀 >> getDayDetail >> date:', date.format())
    setSelectDate(date)
    // ajax 选择日期的打卡详情
  }

  const onChangeMonth = (year: number, month: number) => {
    console.log(year, month)
  }

  return (
    <Wrap className="flex-column">
      <div className="calendar">
        <Calendar
          onPageChange={(year, month) => onChangeMonth(year, month)}
          nextYearButton={false}
          prevYearButton={false}
          renderDate={date => {
            const formatedDate = dayjs(date)
            const lateDates = [10, 12]
            const d = dayjs(date).date()

            // 判断日期是否不超过今天
            const isAfterToday = dayjs(date).isAfter(today, 'day')

            return (
              <div
                className={classNames('custom_cell', {
                  ['custom_cell_normal']: !lateDates.includes(d) && !isAfterToday,
                  ['custom_cell_late']: lateDates.includes(d),
                  ['custom_cell_late_selected']:
                    lateDates.includes(d) && selectDate.format() === formatedDate.format(),
                  ['custom_cell_after']: isAfterToday,
                  ['custon_cell_selected']:
                    !lateDates.includes(d) && selectDate.format() === formatedDate.format()
                })}
                onClick={() => getDayDetail(dayjs(date))}
              >
                {d}
              </div>
            )
          }}
          renderLabel={date => {
            if (dayjs(date).isSame(today, 'day')) return <div className="today">今天</div>
          }}
        />
      </div>

      <div className="flex-center detail">
        <div className="detail_date">{selectDate.format('MM月-DD日')}</div>
        {selectDate.isAfter(today, 'day') && <div className="detail_steps">暂不需要打卡~</div>}
        {!selectDate.isAfter(today, 'day') && (
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
        )}
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

    .detail_date {
      flex: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      font-size: 4.2667vw;
    }

    .detail_steps {
      flex: 5;
      margin-left: 0.5333rem;
    }
  }

  .custom_cell {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .custom_cell_normal {
    background: #d3f0fc;
    color: #999;
  }

  .custom_cell_late {
    background: #d9021d;
    color: #fff;
  }

  .custom_cell_late_selected {
    background: #f16;
    color: #fff;
  }

  .custon_cell_selected {
    background: #47a8f2;
    color: #fff;
  }

  .today {
    margin-top: 6px;
    font-weight: 600;
  }
`

export default Statistics
