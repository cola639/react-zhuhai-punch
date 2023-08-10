import { FC, ReactNode, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Item from './Item'

interface ITabBar {
  tabs: { name: string; icon: ReactNode; iconFilled: ReactNode; url: string }[]
}
const TabBar: FC<ITabBar> = ({ tabs }) => {
  const { pathname } = useLocation()

  const navigate = useNavigate()
  const handleActive = (url: string) => {
    navigate(url)
  }

  return (
    <Wrap>
      <ul>
        {tabs.map(tab => (
          <Item
            key={tab.name}
            tab={tab}
            handleActive={handleActive}
            activeTab={pathname}
            color={'#5628ee'}
          />
        ))}
      </ul>
    </Wrap>
  )
}

const Wrap = styled.nav`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  width: 100vw;
  background: #fff;
  padding: 0 4px;
  box-shadow: 0 4px 12px -1px rgba(18, 22, 33, 0.08);
  position: relative;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    position: relative;
    z-index: 1;
  }
`

export default TabBar
