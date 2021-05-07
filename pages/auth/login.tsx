import { getCsrfToken, getSession, signIn } from 'next-auth/client'
import React, { useState } from 'react'
import { Button, Card, Col, Form, Input, Row } from 'antd'
import '@styles/not_authenticated.less'
import { GetServerSideProps } from 'next'

type Props = {
  csrfToken: string
}

type SignForm = {
  [details: string]: string
}

const Login: React.FC<Props> = ({ csrfToken }) => {
  const [formData, setFormData] = useState<Partial<SignForm>>({})

  const handleSubmit = (): void => {
    signIn('credentials', { ...formData, callbackUrl: '/' }).then(() => null)
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const data = Object.assign({}, formData)
    data[event.currentTarget.name] = event.currentTarget.value
    setFormData(data)
  }

  return (
    <section className={'wrapper'}>
      <Row>
        <Col xs={{ span: 24, offset: 0 }} md={{ span: 10, offset: 7 }}>
          <Card title="Login" style={{ width: '100%' }}>
            <Form onFinish={handleSubmit} layout={'vertical'}>
              <Input type={'hidden'} name={'csrfToken'} defaultValue={csrfToken} />
              <Form.Item
                label="E-mail"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input name={'username'} type={'text'} onChange={handleChange} />
              </Form.Item>

              <Form.Item
                label="Senha"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input name={'password'} type={'password'} onChange={handleChange} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Entrar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const { res } = context

  if (session) {
    res.setHeader('Location', '/')
    res.statusCode = 302
    res.end()
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

export default Login
