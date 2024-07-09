domain: https://anatta-test-store.myshopify.com/
admin token: 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
storefront token: 6d6dda47f54e5a5ff4e04d4822b4de91

Task:
Create a script (eg: app.js) that communicates with Shopify through Shopify’s graphql APIs. It takes input product names and fetches the appropriate products that match the name and list down the variants sorting by price.

Script input
`node app.js –name glove`

Output:
My Glove - variant A - price $20
Your Gloves - variant X - price $22
My Glove - variant B - price $25

Using Graphql APIs is Preferable . https://shopify.dev/docs/api/admin-graphql
