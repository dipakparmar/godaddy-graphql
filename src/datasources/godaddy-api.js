const { RESTDataSource } = require('apollo-datasource-rest')

class GodaddyAPI extends RESTDataSource {
  constructor() {
    super()
  }

  setBaseURL(api_version = 'v1') {
    const env = this.context.headers.get('X-API-ENV')
    const version = api_version
    this.baseURL =
      'https://api.' +
      (env == 'OTE' ? 'ote-godaddy' : 'godaddy') +
      '.com/' +
      version +
      '/'
  }

  willSendRequest(request) {
    request.headers.set(
      'Authorization',
      'sso-key ' +
        this.context.headers.get('X-API-KEY') +
        ':' +
        this.context.headers.get('X-API-SECRET'),
    )
  }

  async getDomains(
    shopper_id,
    statuses,
    status_groups,
    limit,
    marker,
    includes,
    modified_date,
  ) {
    this.setBaseURL()
    statuses = statuses ? statuses.join(',') : ''
    status_groups = status_groups ? status_groups.join(',') : ''
    includes = includes ? includes.join(',') : ''
    return await this.get(
      'domains',
      {
        ...(statuses && { statuses: statuses }), // comma separated list of statuses
        ...(limit && { limit: limit }),
        ...(marker && { marker: marker }),
        ...(includes && { includes: includes }), // comma separated list of includes
        ...(modified_date && { modified_date: modified_date }), // ISO 8601 date
      },
      {
        headers: {
          ...(shopper_id ? { 'X-Shopper-Id': shopper_id } : {}),
        },
      },
    )
  }

  async getDomainAgreements(market_id = 'en-US', tlds, privacy, for_transfer) {
    this.setBaseURL()
    tlds = tlds ? tlds.join(',') : ''
    console.log(tlds)
    return await this.get(
      'domains/agreements',
      {
        ...(tlds && { tlds: tlds }), // comma separated list of tlds
        ...(privacy && { privacy: privacy }), // boolean
        ...(for_transfer && { for_transfer: for_transfer }), // boolean
      },
      {
        headers: {
          ...(market_id ? { 'X-Market-Id': market_id } : {}), // market id (e.g. en-US)
        },
      },
    )
  }

  async getDomainAvailability(
    domain,
    check_type = 'FAST',
    for_transfer = false,
  ) {
    this.setBaseURL()
    return await this.get(
      'domains/available',
      {
        domain: domain,
        ...(check_type && { checkType: check_type }), // FAST or FULL or fast or full (default FAST)
        ...(for_transfer && { forTransfer: for_transfer }), // boolean
      },
      {
        headers: {},
      },
    )
  }

  async getDomainsAvailability(domains, check_type = 'FAST') {
    this.setBaseURL()
    const body = [...domains]
    const path =
      'domains/available' + (check_type ? '?checkType=' + check_type : '')
    const data = await this.post(path, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return data.domains
  }

  async getDomain(domain) {
    this.setBaseURL()
    return await this.get('domains/' + domain, {}, {})
  }
}

module.exports = GodaddyAPI
