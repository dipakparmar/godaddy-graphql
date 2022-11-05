module.exports = {
  Query: {
    domains: async (
      _,
      {
        shopper_id,
        statuses,
        status_groups,
        limit,
        marker,
        includes,
        modified_date,
      },
      { dataSources },
    ) =>
      dataSources.godaddyAPI.getDomains(
        shopper_id,
        statuses,
        status_groups,
        limit,
        marker,
        includes,
        modified_date,
      ),
    domain: async (_, { domain }, { dataSources }) =>
      dataSources.godaddyAPI.getDomain(domain),
  },
}
