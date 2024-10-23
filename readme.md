# Cogip

## Overview

Cogip is a billing application that consists of a front-end and a back-end API. The application utilizes **Keycloak** for authentication and authorization, providing a secure way to manage user access and roles.

### Directories
- **Frontend**: Contains the Vue.js application for managing invoices. Please note that the front-end is currently under development, and some features are yet to be completed. See the [README](Frontend/README.md) for more details.
- **Backend**: Contains the API for creating, reading, updating, and deleting invoices, as well as managing contacts. The CRUD functionality for contacts and invoices in the admin section is still to be finalized. See the [README](Backend/README.md) for more details.

## Keycloak Integration
Keycloak is used in this application to manage user authentication and authorization. It provides features such as single sign-on (SSO), user federation, and identity brokering, ensuring that only authorized users can access specific functionalities.

## Installation

Follow the instructions in each directory's README file to install and configure the project locally.

### Remaining Tasks
- Finalize the development of the front-end features.
- Complete the CRUD functionality for:
    - **Contacts** (Admin section)
    - **Invoices** (Admin section)
