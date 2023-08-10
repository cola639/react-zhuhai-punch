import { FC, useState, useEffect } from 'react'
import styled from 'styled-components'

// ui lib
import { Steps } from 'antd-mobile'
import { ReactComponent as PunchIcon } from '@/assets/icons/punch.svg'
// components

// hooks

// options
const { Step } = Steps

// ==============================|| TimeLine ||============================== //
interface ITimeLine {}

const TimeLine: FC<ITimeLine> = () => {
  useEffect(() => {
    return () => {}
  }, [])

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
          <Step title="签到时间" description="最晚签到时间：08：30" status="process" />
          <Step title="签退时间" description="最晚签到时间：17：30" status="wait" />
        </Steps>
        <button className="flex-column timeline_punch breath">
          <span>签到</span>
          <span className="timeline_punch_time">17:42</span>
        </button>
      </div>
      <div className="flex-center description">
        <PunchIcon className="icon-middle description_icon" />
        <span className="description_text">
          已进入考勤范围- 珠海市香洲区梅 华西路 珠海市香洲区梅 华西路 珠海市香洲区梅 华西路96号
        </span>
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

    .timeline_punch {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 21.3333vw;
      height: 21.3333vw;
      border-radius: 50%;
      background-color: #02a7f0;
      /* background-color: #d7d7d7; 不能签到*/
      color: #fff;
      border: none;
      font-size: 16px;
      .timeline_punch_time {
        margin-top: 6px;
        font-size: 14px;
      }
    }
  }

  .description {
    border-radius: 6px;
    width: 100%;
    height: 15vh;
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
