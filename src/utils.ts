import jwt from 'jsonwebtoken'

import { UserHasuraClaims } from './types'

if (!process.env.GODADDY_API_ENV) {
  throw new Error('GODADDY_API_ENV env var is not set')
}

if (!process.env.GODADDY_API_KEY) {
  throw new Error('GODADDY_API_KEY env var is not set')
}

if (!process.env.GODADDY_API_SECRET) {
  throw new Error('GODADDY_API_SECRET env var is not set')
}

export const getUserClaims = (req: Request): UserHasuraClaims | undefined => {
  try {
    const authorizationHeader = req.headers.get('authorization')

    const accessToken = authorizationHeader?.split(' ')[1]

    if (!accessToken) {
      return undefined
    }

    if (!process.env.NHOST_JWT_SECRET) {
      throw new Error('NHOST_JWT_SECRET env var is not set')
    }

    const jwtSecret = JSON.parse(process.env.NHOST_JWT_SECRET)

    const decodedToken = jwt.verify(accessToken, jwtSecret.key) as any
    return decodedToken['https://hasura.io/jwt/claims'] as UserHasuraClaims
  } catch (error) {
    return undefined
  }
}
