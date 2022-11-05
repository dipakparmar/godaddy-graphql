# GoDaddy API in GraphQL

An [Apollo GraphQL](https://www.apollographql.com/) server, built with [Cloudflare Workers](https://workers.cloudflare.com). [Try a demo by looking at a deployed GraphQL playground](https://godaddy.dipak.io/playground).

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/dipakparmar/godaddy-graphql)

## Usage

API Key & Secret can be generated from [GoDaddy Developer Portal](https://developer.godaddy.com/keys). For more information, please refer to [GoDaddy API Documentation](https://developer.godaddy.com/getstarted).

For OTE Environment, use `X-API-ENV` header with value `OTE`.
For Production Environment, use `X-API-ENV` header with value `PROD`. **Default is PROD**

Setting up the API Key & Secret

- `X-API-KEY` - GoDaddy API Key
- `X-API-SECRET` - GoDaddy API Secret

### GraphQL Playground Headers JSON

```json
{
  "X-API-ENV": "OTE",
  "X-API-KEY": "YOUR_API_KEY",
  "X-API-SECRET": "YOUR_API_SECRET"
}
```

### Development

You can run it locally by [installing Wrangler](https://workers.cloudflare.com/docs/quickstart/), the Workers command-line tool:

```sh
wrangler dev
````

## License

This project is licensed with the [AGPL-3.0 License](https://github.com/dipakparmar/godaddy-graphql/blob/main/LICENSE).
