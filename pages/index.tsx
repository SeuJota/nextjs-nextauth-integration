import { getSession } from 'next-auth/client'
import React from 'react'
import { GetServerSideProps } from 'next'
import AppLayout from '@components/AppLayout'
import { Col, Row, Typography } from 'antd'
import { Token } from '@interfaces/global'

const { Title } = Typography

type Props = {
  session: Token
}

const Home: React.FC<Props> = ({ session }) => {
  return (
    <AppLayout session={session}>
      <Row>
        <Col>
          <Title level={3} style={{ color: '#2b2d42' }}>
            Dashboard
          </Title>
        </Col>
      </Row>
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const { res } = context

  if (!session) {
    res.setHeader('Location', '/auth/error?error=401')
    res.statusCode = 302
    res.end()
  }

  return {
    props: {
      session: session,
    },
  }
}

export default Home
