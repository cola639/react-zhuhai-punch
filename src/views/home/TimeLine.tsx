import { FC, useState, useEffect, useRef } from 'react'
import { getTencentGeocoder } from 'api/map'
import { ReactComponent as PunchIcon } from '@/assets/icons/punch.svg'
import { Steps } from 'antd-mobile'
import styled from 'styled-components'
import { TENCENT_APPKEY } from 'constant'
import haversine from 'haversine'
import dayjs from 'dayjs'

// options
const { Step } = Steps

// @ts-ignore
const geolocation = new qq.maps.Geolocation(TENCENT_APPKEY, 'location_app')

// ==============================|| TimeLine ||============================== //
interface ITimeLine {}

const TimeLine: FC<ITimeLine> = () => {
  const [isRange, setIsRange] = useState(false)
  const [isRequest, setIsRequest] = useState(false)
  const [currentTime, setCurrentTime] = useState(dayjs().format('HH:mm'))
  const isRequestRef = useRef(isRequest) // 使用ref来存储请求状态

  useEffect(() => {
    getAddress()
    return () => {}
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format('HH:mm'))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     !isRequestRef.current && getAddress() // 使用ref的值来检查请求的状态
  //   }, 1000 * 3)

  //   // 清除函数在组件卸载时执行
  //   return () => {
  //     console.log('执行销毁')
  //     clearInterval(intervalId)
  //   }
  // }, [])

  const getAddress = () => {
    console.log('开始获取经纬度')
    setIsRequest(true)
    const options = { timeout: 10 * 1000 }
    // 加载完成后就取当前位置
    geolocation.getLocation(showPosition, showErr, options)

    function showPosition(position: any) {
      console.log('position', position.lat, position.lng)
      console.log('position.lat', position.lat)
      console.log('position.lng', position.lng)
      const animeStarPosition = {
        latitude: 23.125741,
        longitude: 113.264985
      }

      const currentPosition = {
        latitude: position.lat,
        longitude: position.lng
      }
      const distance = haversine(animeStarPosition, currentPosition, { unit: 'meter' })
      distance < 500 ? setIsRange(true) : setIsRange(false)
      console.log('🚀 >> showPosition >> distance:', `${distance} m`)

      setIsRequest(false)
      // 解析地址
      // convertAddress(position.lat, position.lng)
    }

    function showErr() {
      setIsRequest(false)
      console.log('定位失败')
    }
  }

  const convertAddress = async (lat: number, lng: number) => {
    console.log(`address: ${lat} ${lng}`)

    const res = await getTencentGeocoder(lat, lng, TENCENT_APPKEY)

    const standard_address = res.data.result.formatted_addresses.standard_address
    console.log('standard_address', standard_address)
  }

  const handlePunch = () => {
    if (!isRange) return
    // ajax 进行打卡记录
  }

  return (
    <Wrap className="flex-column">
      <div className="timeline">
        <Steps
          direction="vertical"
          style={{
            '--title-font-size': '17px',
            '--description-font-size': '15px',
            '--indicator-margin-right': '12px',
            '--icon-size': '22px'
          }}
        >
          <Step
            title={`签到时间 ${currentTime}`}
            description="最晚签到时间：08：30"
            status="process"
          />
          <Step title="签退时间" description="最早签到时间：17：30" status="wait" />
        </Steps>
        <button
          className={`flex-column timeline_punch ${isRange ? 'can_punch breath' : 'no_punch'}`}
          onClick={handlePunch}
        >
          <span>打卡</span>
          <span className="timeline_punch_time">{currentTime}</span>
        </button>
      </div>
      <div className="flex-center description">
        <PunchIcon className="icon-middle description_icon" />
        {isRange && (
          <span className="description_text">已进入考勤范围 - 珠海市香洲区梅华西路96号</span>
        )}
        {!isRange && <span className="description_text_error">不在考勤范围！</span>}
      </div>
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 90vw;
  margin-top: 10px;
  .timeline {
    width: 100%;
    height: 60vh;
    background-color: #fff;
    border-radius: 6px;
    position: relative;
    padding-top: 5.3333vw;

    .timeline_punch {
      position: absolute;
      bottom: 5.3333vw;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 80px;
      border-radius: 50%;
      color: #fff;
      border: none;
      font-size: 16px;
      .timeline_punch_time {
        margin-top: 6px;
        font-size: 14px;
      }
    }

    .can_punch {
      background-color: #02a7f0;
    }

    .no_punch {
      background-color: #d7d7d7;
    }
  }

  .description {
    border-radius: 6px;
    width: 100%;
    height: 13vh;
    max-height: 15vh;
    margin-top: 10px;
    background-color: #fff;
    .description_icon {
      fill: #02a7f0;
      flex: 1;
    }
    .description_text {
      flex: 6;
      font-size: 14px;
      color: #999;
      line-height: 1.5;
    }
    .description_text_error {
      flex: 6;
      font-size: 14px;
      font-weight: 700;
      color: #f16;
      line-height: 1.5;
    }
  }

  .breath {
    animation: breath 1s linear infinite alternate;
  }

  @keyframes breath {
    from {
      box-shadow: 0px 0px 1px 0px #d3f0fc;
    }

    to {
      box-shadow: 0px 0px 15px 15px #d3f0fc;
    }
  }
`

export default TimeLine
