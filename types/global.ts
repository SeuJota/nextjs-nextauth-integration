import React, { ReactNode } from 'react'

export interface Owner {
  name: string
  email: string
}

export interface Token {
  access_token: string
  expires_in: number
  token_type: string
  scope: string
  refresh_token: string
  expires_date: string
  owner: Owner
}

export interface MenuOnClickEvent {
  key: string
  keyPath: string[]
  item: ReactNode
  domEvent: React.MouseEvent<HTMLElement>
}
