# Book system mangments

This application is made as an assignment for the Database theory course in Linneaus university.

## Installation

Clone this repo to your local machine then run the following command


```bash
npm install
```

## Usage
Go to dbPareser.js file and edit the follwing configuration so that the app will connect to your local database

```javaScript

const dbConfig = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'password',
	database: 'myDatabase'
}
```
To start the app run this command 
```bash
npm run start
```

And for developemnt you may run 
```bash
npm run dev
```
## To be implemented
The app for now has no Error handling which cause a server termination on wrong request or query to the database
