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
    domain_agreements: async (
      _,
      { market_id, tlds, privacy, for_transfer },
      { dataSources },
    ) =>
      dataSources.godaddyAPI.getDomainAgreements(
        market_id,
        tlds,
        privacy,
        for_transfer,
      ),
    domain_availability: async (
      _,
      { domain, check_type, for_transfer },
      { dataSources },
    ) =>
      dataSources.godaddyAPI.getDomainAvailability(
        domain,
        check_type,
        for_transfer,
      ),
    domains_availability: async (_, { domains, check_type }, { dataSources }) =>
      dataSources.godaddyAPI.getDomainsAvailability(domains, check_type),
    supported_tlds: async (_, {}, { dataSources }) =>
      dataSources.godaddyAPI.getSupportedTlds(),
    domain: async (_, { domain }, { dataSources }) =>
      dataSources.godaddyAPI.getDomain(domain),
  },
}
