import SchemaBuilder from '@pothos/core'
import { GoDaddayCustomers, Context } from './types'
import type { AxiosResponse } from 'axios'

import { GraphQLJSONObject } from 'graphql-scalars'

const builder = new SchemaBuilder<{
  Context: Context
}>({})

builder.queryType({
  fields: (t) => ({
    customers: t.string({
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: async (_, args, context) => {
        const { id } = args
        const text = 'Hello World from GraphQL Server!' + id
        return text
      },
    }),
  }),
})

builder.mutationType({
  fields: (t) => ({
    createCustomer: t.string({
      nullable: true,
      args: {
        name: t.arg.string({ required: true }),
      },
      resolve: async (_, args, context) => {
        const { name } = args
        const text = 'Hello World from GraphQL Server!' + name
        return text
      },
    }),
  }),
})

// builder.addScalarType('JSON', GraphQLJSONObject, {})

export { builder }
