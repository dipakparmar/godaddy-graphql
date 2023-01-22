import type { CORSOptions, YogaInitialContext } from '@graphql-yoga/node'

export type GoDaddyGraphQLContext = {
    isAllowed: (godaddyCustomerId: string, context: Context) => boolean | Promise<boolean>
    userClaims?: UserHasuraClaims
    isAdmin: boolean
  }

export type Context = YogaInitialContext & GoDaddyGraphQLContext

export type GoDaddayCustomers = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  country: string
}


export type CreateServerProps = {
  cors?: CORSOptions
  isAllowed?: (
    godaddyCustomerId: string,
    context: Context,
  ) => boolean | Promise<boolean>
  graphiql?: boolean
  graphqlEndpoint?: string
}

export type UserHasuraClaims = {
  'x-hasura-user-id': string
  'x-hasura-default-role': string
  'x-hasura-allowed-roles': string[]
} & {
  [key: string]: string // had to add this here to avoid adding `| string[]` at the end here.
}
