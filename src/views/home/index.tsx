import { FC, useState, useEffect } from 'react'
import Banner from './Banner'
import TimeLine from './TimeLine'
import styled from 'styled-components'

// ==============================|| SAMPLE PAGE ||============================== //

const HomePage = () => {
  return (
    <Wrap>
      <Banner />
      <div className="flex-center">
        <TimeLine />
      </div>
    </Wrap>
  )
}

const Wrap = styled.div`
  min-height: calc(100vh - 50px);
  width: 100%;
  background-color: #f4f4f4;
`

export default HomePage
