module.exports = {
  Query: {
    domain: async (_, { domain }, { dataSources }) => dataSources.godaddyAPI.getDomain(domain),
  },
}
