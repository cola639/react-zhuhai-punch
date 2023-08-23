import { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { Calendar } from 'antd-mobile'
import { Steps } from 'antd-mobile'
import { getRecordHistory } from 'api/punch'
import classNames from 'classnames'
import { PUNCH_STATUS } from 'constant'
import { useSelector } from 'store'
import { getRecord } from 'api/punch'

// ui lib

// components

// hooks

// options
const { Step } = Steps
// ==============================|| index ||============================== //
interface IStatistics {}

const Statistics: FC<IStatistics> = () => {
  const today = dayjs()
  const openId = useSelector(state => state.punch.openId)
  const punchConfig = useSelector(state => state.punch.punchConfig)
  const [isWeekend, setIsWeekend] = useState(false)
  const [punchDetail, setPunchDetail] = useState<any>()
  const [selectDate, setSelectDate] = useState<dayjs.Dayjs>(today)
  const [normalDays, setNormalDays] = useState<string[]>([])
  const [leaveEarlyDays, setLeaveEarlyDays] = useState<string[]>([])
  const [lateDays, setLateDays] = useState<string[]>([])

  useEffect(() => {
    openId && getHistoryPunch()
    openId && getDayDetail(new Date())
    return () => {}
  }, [openId])

  const getDayDetail = async (date: Date) => {
    console.log('🚀 >> getDayDetail >> date:', dayjs(date).format('YYYY-MM-DD'))

    const isWeekend = dayjs(date).day() === 0 || dayjs(date).day() === 6
    const params = { openId, punchDate: dayjs(date).format('YYYY-MM-DD') }
    const { data } = await getRecord(params)
    setSelectDate(dayjs(date))
    setIsWeekend(isWeekend)

    if (data.length) {
      const { punchTimeStart, punchTimeEnd, status } = data[0]
      const punchDetail = { punchTimeStart, punchTimeEnd, status }
      setPunchDetail(punchDetail)
    } else {
      setPunchDetail({})
    }

    console.log('🚀 >> getDayDetail >> punchTime:', punchDetail)
  }

  const getHistoryPunch = async () => {
    const params = { openId }
    const { data } = await getRecordHistory(params)

    configDifferentArr(data)
  }

  const onChangeMonth = (year: number, month: number) => {
    console.log(year, month)
  }

  const configDifferentArr = (data: any) => {
    const punchTimeStart = punchConfig.punchStart as string
    const punchTimeEnd = punchConfig.punchEnd as string
    let lateDays: string[] = []
    let levelEarlyDays: string[] = []
    let normalDays: string[] = []

    data.forEach((item: { punchTimeStart: string; punchTimeEnd: string; punchDate: string }) => {
      const itemPunchTimeStart = item.punchTimeStart && item.punchTimeStart.split(' ')[1]
      const itemPunchTimeEnd = item.punchTimeEnd && item.punchTimeEnd.split(' ')[1]
      console.log('today', today.format('YYYY-MM-DD'))

      console.log('item.punchDate', item.punchDate === today.format('YYYY-MM-DD'))
      const isToday = item.punchDate === today.format('YYYY-MM-DD')

      if (!isToday && itemPunchTimeStart > punchTimeStart) {
        lateDays.push(item.punchDate)
      }

      if (!isToday && itemPunchTimeEnd < punchTimeEnd) {
        levelEarlyDays.push(item.punchDate)
      }

      if (!isToday && itemPunchTimeStart <= punchTimeStart && itemPunchTimeEnd >= punchTimeEnd) {
        normalDays.push(item.punchDate)
      }

      if (isToday) {
        normalDays.push(item.punchDate)
      }
    })

    setLateDays(lateDays)
    setLeaveEarlyDays(levelEarlyDays)
    setNormalDays(normalDays)
    console.log('🚀 >> configDifferentArr >> lateDays:', lateDays)
    console.log('🚀 >> configDifferentArr >> levelEarlyDays:', levelEarlyDays)
    console.log('🚀 >> configDifferentArr >> normalDays:', normalDays)
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
            const d = dayjs(date).date()
            const tempDate = dayjs(date).format('YYYY-MM-DD')
            const isAfterToday = dayjs(date).isAfter(today, 'day')
            const isWeekend = dayjs(date).day() === 0 || dayjs(date).day() === 6

            return (
              <div
                className={classNames('cell', {
                  ['cell_normal']: (normalDays.includes(tempDate) || isWeekend) && !isAfterToday,
                  ['cell_error']:
                    leaveEarlyDays.includes(tempDate) ||
                    lateDays.includes(tempDate) ||
                    (!isWeekend && !normalDays.includes(tempDate) && !isAfterToday),
                  ['cell_after']: isAfterToday,
                  ['custon_cell_selected']: selectDate.format() === formatedDate.format()
                })}
                onClick={() => getDayDetail(date)}
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
        {(selectDate.isAfter(today, 'day') || isWeekend) && (
          <div className="detail_steps">不需要打卡哦~</div>
        )}
        {!selectDate.isAfter(today, 'day') && !isWeekend && (
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
            <Step
              title={`签到时间：${
                punchDetail?.punchTimeStart
                  ? dayjs(punchDetail.punchTimeStart).format('HH:mm')
                  : '无签到时间'
              }`}
              description={`最晚签到时间：${punchConfig.punchStart}`}
              status="finish"
            />
            <Step
              title={`签退时间：${
                punchDetail?.punchTimeEnd
                  ? dayjs(punchDetail.punchTimeEnd).format('HH:mm')
                  : '无签退时间'
              }`}
              description={`最早签退时间：${punchConfig.punchEnd}`}
              status="process"
            />
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
    height: 25vh;
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

  .cell {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cell_normal {
    background: #d3f0fc;
    color: #999;
  }

  .cell_error {
    background: #d9021d;
    color: #fff;
  }

  .cell_late_selected {
    background: #f16;
    color: #fff;
  }

  .custon_cell_selected {
    border: 2px solid #47a8f2;
    font-weight: 700;
  }

  .today {
    margin-top: 6px;
    font-weight: 600;
  }
`

export default Statistics
