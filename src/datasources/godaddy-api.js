const { RESTDataSource } = require('apollo-datasource-rest');

class GodaddyAPI extends RESTDataSource {
    constructor() {
        super();
    }

    setBaseURL() {
        const env = this.context.headers.get('X-API-ENV');
        this.baseURL = 'https://api.' + (env == 'dev' ? 'ote-godaddy' : 'godaddy') + '.com/v1/';
    }

    willSendRequest(request) {
        request.headers.set('Authorization', 'sso-key ' + this.context.headers.get('X-API-KEY') + ':' + this.context.headers.get('X-API-SECRET'));
    }

    async getDomains(shopper_id, limit, marker, modified_date) {
        this.setBaseURL();
        return await this.get('domains', {
            ...shopper_id,
            ...limit,
            ...marker,
            ...modified_date,
        }, {});
    }

    async getDomain(domain) {
        this.setBaseURL();
        return await this.get('domains/' + domain, {}, {});
    }
}

module.exports = GodaddyAPI;