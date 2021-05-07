import React from 'react'
import { Menu } from 'antd'
import { MailOutlined } from '@ant-design/icons'

type Props = {
  selectedKey: string
  changeSelectedKey: Function
}

const TopicMenu: React.FC<Props> = ({ selectedKey, changeSelectedKey }) => {
  return (
    <>
      {/*
       // @ts-ignore */}
      <Menu mode="inline" selectedKeys={[selectedKey]} onClick={changeSelectedKey}>
        <Menu.Item icon={<MailOutlined />}>Link 1</Menu.Item>
        <Menu.Item icon={<MailOutlined />}>Link 2</Menu.Item>
      </Menu>
    </>
  )
}

export default TopicMenu
