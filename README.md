# Gigxerr

:cloud: :computer: An end-to-end (E2E) application inspired by "Fiverr".
Developed using React and Node.js. The objective was to create a platform that connects freelancers with clients seeking specific services.
The application allows users to create an account and either offer services for sale or purchase services from other users. Users can filter search results to match their preferences, and each user has a dashboard providing real-time statistics.

<!-- //  A website inspired by Fiverr, implemented as a full stack bootcamp project using React, SCSS, Node.js, Express, and MongoDB. -->

[Demo Website](https://gigxerr.onrender.com/)

<h2>Table of Contents</h2>

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Getting Started
To get started, clone this repository to your local machine:


```
git clone https://github.com/IreneDuchovny/gigxerr.git
```
### Prerequisites
To run this project, you need to have the following tools installed on your machine:

- Node.js (v14 or higher)
- MongoDB
## Installing
To install the dependencies for both the frontend and backend, run the following command in each directory:

```
npm install
```
### Running the Application
To start both the frontend and backend servers, run the following command in each directory:

```
npm run start
```
This will start the frontend server on http://localhost:3000 and the backend server on http://localhost:3030. The start script will also watch for changes to both the frontend and backend files and automatically rebuild the application.

### Configuration
The backend server uses a configuration file located at backend/config/dev.js to specify the database connection details. By default, the configuration file uses the following values:

```
module.exports = {
  dbURL: `mongodb://127.0.0.1:27017`,
  dbName: "fiverr",
};
```
You can modify these values as needed to connect to your MongoDB instance.

## Features
<li>User accounts: Users can create accounts and log in to access the platform's features.</li>
<li>Buying and selling: Users can offer services for sale or purchase services from other users.</li>
<li>Search and filtering: Users can filter search results based on various criteria, such as price, service type, and deliver time.</li>
<li>Dashboard: Each user has a dashboard that provides real-time statistics, such as the number of services sold and earnings.</li>
<li>Wishlist: Users can add "gigs" to their wishlist, enabling them to chack them out later, or to compare them to other gigs.</li>
<li>Reviews: Users may leave a review, and rate sellers.</li>


## Technologies Used

<li>React</li>
<li>Node.js</li>
<li>Express.js</li>
<li>MongoDB</li>
<li>HTML</li>
<li>SCSS</li>

## Contributing
We welcome contributions from the community. To contribute to this project, please create a pull request with your changes.

## Acknowledgements
This project was developed by Irene Duchovny, Lior Geni and Shaul Gabrieli. <br>
This is our Final Project as part of our studies at <i>Coding Academy Bootcamp</i>.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
