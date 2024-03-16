# Knex Project

Knex Project is a project aimed at practicing Node.js and learning about Knex, a library for easily consuming SQL databases.

## Objectives

### Project Structure

- [x] Implement Express server. Example: [Application](./index.js)
- [x] Implement Express Validator. Examples: [Common middlewares](./middlewares/common.middlewares.js); [Product middlewares](./middlewares/product.middlewares.js)
- [x] Implement a generic structure to create responses for every endpoint. Examples: [Response utilities](./utils/response.utils.js)
- [x] Implement documentation with OpenAPI. Example: [Product router](./routers/product.router.js)
- [x] Implement controllers modules. Example: [Product controller/module](./controllers/product.controllers.js)
- [x] Implement routers modules. Examples: [Root router](./routers/index.router.js); [Product router](./routers/product.router.js); 

### Services

#### Products

- [x] Create product.
- [x] Create products bulk.
- [x] List all products.
- [x] List a product by ID.
- [x] Delete product by ID.
- [x] Delete products by ID bulk.

Location: [Product Module](./controllers/product.controllers.js)

#### Users

- [ ] Create users.
- [ ] Delete user.

#### Cart

- [ ] Create cart.
- [ ] Add product to cart.
- [ ] Change quantity.
- [ ] Delete product from cart.
- [ ] Clear cart.

#### Order

- [ ] Create order.
- [ ] Cancel order.
- [ ] Close order.

## Getting Started

To get started with the Knex Project, follow these steps:

1. Clone this repository.
2. Install dependencies by running `npm install`.
3. Set up your database configurations in the `.env` file.
4. Run the server using `npm start`.
5. Start testing the endpoints using your preferred API testing tool.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request to improve this project.

## License

This project is licensed under the [MIT License](LICENSE).