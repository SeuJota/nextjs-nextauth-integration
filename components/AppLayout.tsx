import React, { useState } from 'react'
import { Layout } from 'antd'

import TopicMenu from '@components/TopicMenu'
import NavBar from '@components/NavBar'
import SideBar from '@components/Sidebar'

import '@styles/layout.less'
import { MenuOnClickEvent, Token } from '@interfaces/global'

type Props = {
  session: Token
}

const AppLayout: React.FC<Props> = ({ session, children }) => {
  const [contentIndex, setContentIndex] = useState(0)
  const [selectedKey, setSelectedKey] = useState('0')

  const changeSelectedKey = (event: MenuOnClickEvent): void => {
    const key = event['key']
    setSelectedKey(key)
    setContentIndex(+key)
  }

  const Menu = <TopicMenu selectedKey={selectedKey} changeSelectedKey={changeSelectedKey} />

  return (
    <div className="App">
      <NavBar menu={Menu} session={session} />
      <Layout className={'app-root'}>
        <SideBar menu={Menu} />
        <Layout.Content className="content">
          <div className="site-layout-content">{children}</div>
        </Layout.Content>
      </Layout>
    </div>
  )
}

export default AppLayout
