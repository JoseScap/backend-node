# Knex Project

Knex Project is a project aimed at practicing Node.js and learning about Knex, a library for easily consuming SQL databases.

## Objectives

### Project Structure

- [x] Implement Express server. Example: [File](./index.js)
- [x] Implement Express Validator. Examples: [File 1](./middlewares/common.middlewares.js); [File 2](./middlewares/product.middlewares.js)
- [x] Implement a generic structure to create responses for every endpoint. Examples: [File](./utils/response.utils.js)
- [x] Implement documentation with OpenAPI. Example: [File](./routers/product.router.js)
- [x] Implement controllers modules. Example: [File](./controllers/product.controllers.js)
- [x] Implement routers modules. Examples: [File 1](./routers/index.router.js); [File 2](./routers/product.router.js); 

### Services

#### Products

- [x] Create product.
- [x] Create products bulk.
- [x] List all products.
- [x] List a product by ID.
- [x] Delete product by ID.
- [x] Delete products by ID bulk.

[Location](./controllers/product.controllers.js)

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