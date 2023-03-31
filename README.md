# wong-patrick-IS24-full-stack-competition-req97073

# General Information

This application displays all products from the Information Ministry Branch (IMB) product catalog. The user can add new products and update existing products. The user can use the search bar to filter products by either developer name or scrum master name.

# Tech Stack

[Nest.js](https://nestjs.com/) is used as the microservice to run the project's API calls. [Angular](https://angular.io/) is used as the front-end framework to build the application. The data source is stored in the `products.json` file found in the `api` microservice.

# Instructions

[Docker Compose](https://docs.docker.com/compose/) used to run the the IMB Product Catalog application.

1.  To confirm if you have docker compose installed in your terminal, run `docker-compose -v`. You should be able to see its version number. If that is not the case, please install [Docker](https://www.docker.com/), which includes Docker Compose.
2.  On the directory that contains the docker-compose.yml file, type the command `docker-compose build --pull`
3.  This will build the containers for the server and the client. Once built, you do not need to run the build command anymore.
4.  Type `docker-compose up -d` to start the server and client containers
5.  To stop the application, type `docker-compose stop`
6.  If you want to stop and remove the client and server containers, run `docker-compose down`

# Routes

## Client Webpage Routes

The url of the application is http://localhost:4200. This will be available once the client and api containers have been started.

-   `/`
    
    <img width="1506" alt="Screen Shot 2023-03-30 at 7 06 43 PM" src="https://user-images.githubusercontent.com/43553331/229004592-c9cae909-2a8b-4c72-8e1e-84904e224573.png">
    
    -   Homepage of the application. It shows all products fetched from the microservice and contains a search bar to find specific developers or scrum masters
-   `/add-product`

    <img width="1506" alt="Screen Shot 2023-03-30 at 6 43 55 PM" src="https://user-images.githubusercontent.com/43553331/229004260-8af1a0b2-3cbf-4199-a288-02b9af4437f6.png">

    -   A form to fill out to add a product to the product catalog
-   `/edit-product/:id`

    <img width="1506" alt="Screen Shot 2023-03-30 at 6 44 03 PM" src="https://user-images.githubusercontent.com/43553331/229004291-48ee01f9-6dd1-4eab-a9e5-7341efd19839.png">

    -   A form to edit specific fields of a product
    -   This route is only available if the users clicks on the edit icon of the product from the product list on the homepage.
    -   Refreshing this route will be redirected to the home page.

## API Routes

The base url of the microservice is `http://localhost:3000/api`

-   `GET` `/products`
    -   Gets all products found in the data store
-   `GET` `/products/:id`
    -   Gets product by productId of `:id`
-   `GET` `/api-docs`

    <img width="1506" alt="Screen Shot 2023-03-30 at 7 02 03 PM" src="https://user-images.githubusercontent.com/43553331/229004110-8841f3b8-ee1a-4d07-9702-c39ad7abb8e5.png">
    
    -   Displays all routes of the microservice using [Swagger UI](https://swagger.io/tools/swagger-ui)
    -   The webpage includes details about request and response types of each resource.
-   `POST` `/products`
    -   Inserts a product to the data store
-   `PUT` `/product/:id`
    -   Updates the product with productId of `:id` to the data store
-   `DELETE` `/product/:id`
    -   Deletes the product with productId of `:id` from the data store
