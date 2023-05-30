<p align="center">
  <a href="https://github.com/leodaiub/ticket-system">
  </a>

  <h3 align="center">Tickets Redemption System</h3>

  <p align="center">
   Application to enable users to sign up, log in, and then create tickets, as well as redeem the tickets to them. At the same
   time maintaining a history of each attempt at redemption.
    <br />
    <a href="https://tickets-system.up.railway.app/api">View deployed Api</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

  * [About the Project](#about-the-project)
  * [Built With](#built-with)
  * [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)


<!-- ABOUT THE PROJECT -->
## About The Project
Check the deployed API at [https://tickets-system-production.up.railway.app/](https://tickets-system.up.railway.app/api)

Used the CQRS Architecture pattern to separate the write logic into commands, and read logic into queries, so the responsibility is no longer of the controllers and services, which allows the application to scale efficiently, and provide an opinionated design to help with maintainability.

Breakdown of a few files:

the `tickets/sagas/tickets-sagas.ts` handle the side effect of each ticket redemption attempt, either successful or not, and saves them to the database as a history of attempts per user.

### Built With

* NestJS
* PostgreSQL
* TypeScript
* Nestjs/CQRS
* RxJS
* Swagger/OpenAPI

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* node.js and npm.
* docker and docker-compose.

### Installation

1. Clone the repo.
```sh
git clone https://github.com/leodaiub/ticket-system.git
```

2. Start the database and API with docker-compose.
```sh
docker-compose up
```
