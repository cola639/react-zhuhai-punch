import { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

// ui lib
import { ReactComponent as CalculateIcon } from '@/assets/icons/calculate_v1.svg'
import { ReactComponent as PunchIcon } from '@/assets/icons/punch_v1.svg'
// components
import Tabar from '../components/Tabar3/tabar'

// hooks

// options
const tabs = [
  { name: '打卡', url: '/', icon: <PunchIcon />, iconFilled: <PunchIcon /> },
  { name: '统计', url: '/statistics', icon: <CalculateIcon />, iconFilled: <CalculateIcon /> }
]

// ==============================|| TEMPLATE ||============================== //

const Index: FC = () => {
  useEffect(() => {
    return () => {}
  }, [])

  return (
    <Container>
      <div className="layout-content">
        <Outlet />
      </div>
      <div className="layout-footer">
        <Tabar tabs={tabs} />
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  background-color: #f4f4f4;

  .layout-content {
    padding-bottom: 60px;
  }

  .layout-footer {
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 0;
  }
`

export default Index
