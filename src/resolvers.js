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
    domain_agreements: async (_, { market_id, tlds, privacy, for_transfer }, {dataSources}) =>
      dataSources.godaddyAPI.getDomainAgreements(
        market_id,
        tlds,
        privacy,
        for_transfer,
      ),
    domain: async (_, { domain }, { dataSources }) =>
      dataSources.godaddyAPI.getDomain(domain),
  },
}
