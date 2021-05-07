import { Provider } from 'next-auth/client'
import type { AppProps } from 'next/app'
import React from 'react'

const CmsApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default CmsApp
