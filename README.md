# wong-patrick-IS24-full-stack-competition-req97073

# General Information

This application displays all products from the Information Ministry Branch (IMB) product catalog. The user can add new products and update existing products. The user use the search bar to filter the products by either a developer name or a scrum master name.

# Tech Stack

[Nest.js](https://nestjs.com/) is used as the microservice to run the project's API calls. [Angular](https://angular.io/) is used as the front-end framework to build the application. The data source is stored in the products.json file found in the `api` microservice.

# Instructions

Docker is used to run the the IMB Product Catalog application.

1.  To confirm if you have docker installed in your terminal, run `docker -v`
2.  On the directory that contains the docker-compose.yml file, type the command `docker-compose build --pull`
3.  This will build the images for the server and the client. Once built, you do not need to run the build command anymore.
4.  Type `docker-compose up -d` to start the server and client containers
5.  To stop the application, type `docker-compose stop`
6.  If you want to stop and remove the client and server containers, run `docker-compose down`

# Routes

## Client Webpage Routes

The url of the application is http://localhost:4200. This will be available once the docker compose instance is activated. See instructions on how to do that.

-   `/`
    -   Homepage of the application. It shows all the products and contains a search bar to find specific developers or scrum masters
-   `/add-product`
    -   A form to fill out to add a product to the product catalog
-   `/edit-product/:id`
    -   A form to edit specific fields of a product
    -   This route is only available if the users clicks on the edit icon of the product from the product list in the / path

## API Routes

The base url of the microservice is `http://localhost:3000/api`

-   `GET` `/products`
    -   Gets all products found in the data store
-   `GET` `/products/:id`
    -   Gets product by productId of `:id`
-   `GET` `/api-docs`
    -   Displays all routes of the microservice using [Swagger UI](https://swagger.io/tools/swagger-ui)
    -   The webpage includes details about request and response types of each resource.
-   `POST` `/products`
    -   Inserts a product to the data store
-   `PUT` `/product/:ids`
    -   Updates the product with productId of `:id` to the data store
-   `DELETE` `/product/:ids`
    -   Deletes the product with productId of `:id` from the data store
