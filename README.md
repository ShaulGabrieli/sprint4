# gigxerr
:cloud: :computer: A website inspired by Fiverr, implemented as a full stack bootcamp project using React, SCSS, Node.js, Express, and MongoDB.

[Demo Website](https://gigxerr.onrender.com/)

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
npm run dev
```
This will start the frontend server on http://localhost:3000 and the backend server on http://localhost:3030. The dev script will also watch for changes to both the frontend and backend files and automatically rebuild the application.

### Configuration
The backend server uses a configuration file located at backend/config/dev.js to specify the database connection details. By default, the configuration file uses the following values:

```
module.exports = {
  dbURL: `mongodb://127.0.0.1:27017`,
  dbName: "fiverr",
};
```
You can modify these values as needed to connect to your MongoDB instance.

## Contributing
We welcome contributions from the community. To contribute to this project, please create a pull request with your changes.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
