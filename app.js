import axios from "axios";
import 'dotenv/config';

const getArgValue = (argName) => {
    const argIndex = process.argv.indexOf(argName);
    return (argIndex !== -1 && argIndex < process.argv.length - 1) ? process.argv[argIndex + 1] : null;
};

const name = getArgValue('--name');

if (name) {
    fetchProducts(name)
    console.log(`Looking for products with: ${name}`);
} else {
    console.log('--name parameter is not provided.');
}

async function fetchProducts(verifyTitle) {
    const query = `
    {
      products(first: 50) {
        edges {
          node {
            id
            title
            description
            images(first: 5) {
              edges {
                node {
                  src
                  altText
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  price
                }
              }
            }
          }
        }
      }
    }
  `;

    try {
        const response = await axios({
            url: process.env.SHOPIFY_STORE_URL,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.ACCESS_TOKEN
            },
            data: JSON.stringify({ query })
        });

        const products = response.data.data.products.edges.map(edge => edge.node);
        if (products.length > 0) {
            products.forEach(({ title: productTitle, variants }) => {
                if (productTitle.includes(verifyTitle)) {
                    variants.edges.forEach(({ node }) => {
                        console.log(`${productTitle}-${node.title}-price $${node.price}`)
                    })
                }
            });
        } else {
            console.log("No products found with that name");
        }
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

