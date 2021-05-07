import React from 'react'
import { Layout } from 'antd'

type Props = {
  menu: React.ReactNode
}

const SideBar: React.FC<Props> = ({ menu }) => {
  return (
    <Layout.Sider
      className="sidebar"
      breakpoint={'md'}
      theme="light"
      collapsedWidth={0}
      trigger={null}
    >
      {menu}
    </Layout.Sider>
  )
}

export default SideBar
