## ecommerce-vouchers

A demo application that simulates an ecommerce of vouchers.

The application has been developed using nodejs with express. 
It uses the prisma library to interact with a mysql db.

Both the application and the database has been containerized using docker and can be deployed locally using docker-compose.
The database has a seed that allow to insert some initial data.


## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the app.

* Docker installed

### Installation and Usage

1. Clone the repo
   ```sh
   git clone https://github.com/piscoroma/ecommerce-vouchers.git
   ```
2. Enter in the project's directory
   ```sh
   cd ecommerce-vouchers
   ```
2. Create the env file starting from the example env
   ```sh
   cp .env.example .env
   ```
3. Run docker compose
   ```sh
   docker compose up
   ```

## Documentation

Please refer to Wiki section for the API documentation.

ER Diagram is located under the database dir of the project

## Utils

Under the postman directory you can find the collection and the environment files to test the api through postman.

## Todo List

* Integrate automatic tests
* Intregate STRIPE API
* Integrate upload of photos for the assets
* Integrate logout function
