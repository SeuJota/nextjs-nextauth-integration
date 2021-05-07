const authBasicHeader = (): string => {
  const buff = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)
  const basicAuthToken = buff.toString('base64')
  return `Basic ${basicAuthToken}`
}

export { authBasicHeader }
