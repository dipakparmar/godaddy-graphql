module.exports = {
  Query: {
    getDomains: async (_, { shopper_id, limit, marker, modified_date }, { dataSources }) => dataSources.godaddyAPI.getDomains(shopper_id, limit, marker, modified_date),
  },
}
