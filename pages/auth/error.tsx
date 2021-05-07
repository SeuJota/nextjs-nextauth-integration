import React from 'react'
import { GetServerSideProps } from 'next'
import { Button, Card, Col, Row, Space, Typography } from 'antd'
import '@styles/not_authenticated.less'
import { useRouter } from 'next/router'

type Props = {
  error: string
}

type ErrorDetail = {
  statusCode: number
  heading: React.ReactNode
  message: React.ReactNode
}

const Error: React.FC<Props> = ({ error }) => {
  const router = useRouter()
  const { Text, Link } = Typography

  const errors: Record<string, ErrorDetail> = {
    '400': {
      statusCode: 400,
      heading: <Text type="danger">Ops!</Text>,
      message: (
        <Text>
          A combinação de usuário e senha parece não estar correta.
          <br />
          <br />
          Verifique seus dados e tente novamente.
        </Text>
      ),
    },

    '401': {
      statusCode: 401,
      heading: <Text type="danger">Acesso Restrito</Text>,
      message: (
        <Space direction="vertical">
          <Text>
            A página que você está tentando acessar, só pode ser visualizada por usuários
            autenticados.
          </Text>
          <Text>
            Caso você esteja com problemas para acessar sua conta{' '}
            <Link href="/feedback/error" type={'danger'}>
              clique aqui
            </Link>{' '}
            e comunique o problema.
          </Text>
          <Text>Ou clique no link abaixo, para realizar um novo login.</Text>
        </Space>
      ),
    },

    '500': {
      statusCode: 500,
      heading: <Text type="danger">Ops!</Text>,
      message: (
        <Text>
          Há um problema com a configuração do servidor.
          <br />
          <br />
          Já estamos verificando.
          <br />
          <br />
          Tente novamente mais tarde.
        </Text>
      ),
    },

    default: {
      statusCode: 500,
      heading: <Text type="danger">Ops!</Text>,
      message: (
        <Text>
          Há um problema com a configuração do servidor
          <br />
          <br />
          Tente novamente mais tarde.
        </Text>
      ),
    },
  }

  const { heading, message } = errors[error.toLowerCase()] ?? errors.default

  return (
    <section className={'wrapper'}>
      <Row>
        <Col xs={{ span: 24, offset: 0 }} md={{ span: 10, offset: 7 }}>
          <Card title={heading} style={{ width: '100%' }}>
            {message}
            <br />
            <br />
            <Button
              type="primary"
              danger={true}
              onClick={() => {
                router.push('/auth/login')
              }}
            >
              Fazer Login
            </Button>
          </Card>
        </Col>
      </Row>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      error: context.query.error,
    },
  }
}

export default Error
