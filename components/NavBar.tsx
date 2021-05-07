import React, { useState } from 'react'
import { Drawer, Button, Row, Col, Typography } from 'antd'
import { MenuOutlined, LogoutOutlined } from '@ant-design/icons'
import { signOut } from 'next-auth/client'
import { Token } from '@interfaces/global'
const { Text } = Typography

type Props = {
  menu: React.ReactNode
  session: Token
}

const NavBar: React.FC<Props> = ({ session, menu }) => {
  const [visible, setVisible] = useState(false)
  return (
    <nav className="navbar">
      <Row>
        <Col span={18}>
          <div className={'logo-area'}>
            <div className={'logo'}>
              <a href="/">Logo</a>
            </div>

            <Button
              className="menu"
              type="link"
              icon={<MenuOutlined style={{ fontSize: 20, color: '#FFF' }} />}
              onClick={() => setVisible(true)}
            />
          </div>
        </Col>
        <Col span={6}>
          <div className={'profile-area'}>
            <Text style={{ color: '#FFF' }}>{session.owner.email}</Text>

            <Button
              type={'link'}
              onClick={() => {
                signOut()
              }}
            >
              <LogoutOutlined style={{ color: '#FFF' }} />
            </Button>
          </div>
        </Col>
      </Row>

      <Drawer title="Menu" placement="left" onClose={() => setVisible(false)} visible={visible}>
        {menu}
      </Drawer>
    </nav>
  )
}
export default NavBar
