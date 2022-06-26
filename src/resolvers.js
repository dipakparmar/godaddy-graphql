module.exports = {
  Query: {
    domains: async (_, { shopper_id, limit, marker, modified_date }, { dataSources }) => dataSources.godaddyAPI.getDomains(shopper_id, limit, marker, modified_date),
    domain: async (_, { domain }, { dataSources }) => dataSources.godaddyAPI.getDomain(domain),
  },
}
