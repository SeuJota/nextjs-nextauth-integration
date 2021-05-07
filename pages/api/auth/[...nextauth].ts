import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import API from '@config/api.config'
import { authBasicHeader } from '@config/authHeaders.config'
import type { NextApiRequest, NextApiResponse } from 'next'
import { DateTime } from 'luxon'
import { NextApiHandler } from 'next-auth/internals/utils'
import { Token } from '@interfaces/global'

type Header = {
  [details: string]: string
}

type Credentials = {
  username: string
  password: string
}

const zone = `${process.env.TIME_ZONE}`

const makeOauthRequest = async (body: string, headers: Header): Promise<Token> => {
  try {
    const response = await API.post('/oauth/token/', body, { headers: headers })
    const token: Token = response.data
    const expires_date = DateTime.now().setZone(zone).plus({ seconds: token.expires_in })
    token.expires_date = expires_date.toFormat('yyyyMMddHHmmss')
    return token
  } catch (error) {
    throw new Error(error.response.status)
  }
}

const requestAccessToken = async (credentials: Credentials): Promise<Token> => {
  const body = JSON.stringify({
    grant_type: 'password',
    username: credentials.username,
    password: credentials.password,
  })

  const headers = {
    'Content-Type': 'application/json',
    Authorization: authBasicHeader(),
  }

  return await makeOauthRequest(body, headers)
}

const requestRefreshToken = async (refresh_token: string): Promise<Token> => {
  const body = JSON.stringify({
    grant_type: 'refresh_token',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    refresh_token: refresh_token,
  })

  const headers = {
    'Content-Type': 'application/json',
  }

  return await makeOauthRequest(body, headers)
}

const options = {
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },

  providers: [
    Providers.Credentials({
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },

      //@ts-ignore
      async authorize(data: Record<string, string>) {
        const credentials: Credentials = {
          username: data['username'],
          password: data['password'],
        }

        const token: Token = await requestAccessToken(credentials)
        if (token) {
          return token
        }
        return null
      },
    }),
  ],

  callbacks: {
    async jwt(prevToken: Token, newToken: Token): Promise<Token> {
      if (newToken) {
        return newToken
      }

      const now = DateTime.now().setZone(zone).toFormat('yyyyMMddHHmmss')
      if (parseInt(now, 10) >= parseInt(prevToken.expires_date, 10)) {
        const refreshedToken: Token = await requestRefreshToken(prevToken.refresh_token)
        prevToken = Object.assign({}, refreshedToken)
      }

      return prevToken
    },

    async session(session: Token, token: Token) {
      return token
    },
  },
}

export default (req: NextApiRequest, res: NextApiResponse): ReturnType<NextApiHandler> =>
  // @ts-ignore
  NextAuth(req, res, options)
