const mysql = require('mysql')
const bookQueries = require('./queries/book')
const userQueries = require('./queries/user')
const fs = require('fs');

const dbConfig = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'password',
	database: 'myDatabase'
}
const con = mysql.createConnection(dbConfig)

con.connect(function (err) {
	if (err) {
		console.log('Failed to connect to database')
		throw err
	} else {
		let tableExists = (myTable) => {
			// Return a new promise
			return new Promise(resolve => {
				let sql = "SELECT 1 FROM ??";
				con.query(sql, myTable, function(error, result){
					resolve(!!result)
				});
			});
		}
		tableExists("user").then(result => result ?  console.log('Database is already filled'): dumpData())
		console.log('Database connected!')
	}
})


function dumpData() {
	const dataSql = fs.readFileSync('./startScript.sql').toString()
	const dataArr = dataSql.toString().split(';');
	dataArr.forEach((query) => {
		if(query) {
			con.query(query, function (err, row) {
				err ? console.log('failed to run script') : console.log('Filled the database')
			})
		}
	});
}

/**********************************BOOOK ********************************************/
function getAllBooks() {
	return new Promise((resolve, reject) => {
		con.query(bookQueries.GET_ALL_BOOKS, function (err, rows) {
			if (err) reject(err)
			resolve(rows)
		})
	})
}

function getBookById(id) {
	return new Promise((resolve, reject) => {
		con.query(bookQueries.GET_BOOK_BY_ID, id, function (err, rows) {
			if (err) reject(err)
			resolve(rows)
		})
	})
}

function getBooksByUserId(user_id) {
	return new Promise((resolve, reject) => {
		con.query(bookQueries.GET_BOOK_BY_AUTHOR_ID, [user_id], function (err, rows) {
			if (err) reject(err)
			resolve(rows)
		})
	})
}

function getUsersOtherBooks(id, author_id) {
	return new Promise((resolve, reject) => {
		con.query(bookQueries.GET_USERS_OTHER_BOOKS, [id, author_id], function (err, rows) {
			if (err) reject(err)
			resolve(rows)
		})
	})
}
function deleteBook(id) {
	return new Promise(resolve => {
		con.query(bookQueries.DELETE_BOOK, id, function (err, rows) {
			if (err) reject(err)
			resolve(rows)
		})
	})
}


function insertBook(request, res) {
	return new Promise((resolve, reject) => {
		con.query(bookQueries.INSERT_BOOK, request.body, function (err, result) {
			if (err) {
				console.log('Failed to insert book')
				throw err
			}
			resolve(result)
		})
	})
}

function updateBook(id, req) {
	return new Promise((resolve, reject) => {
		con.query(bookQueries.UPDATE_BOOK, [{
			title : req.body.title,
			rating : req.body.rating,
			publisher : req.body.publisher,
			publishingYear : req.body.publishingYear,
		}, id], function (err, rows) {
			if (err) reject(err)
			resolve(rows)
		})
	})
}

function getFilteredBooks(queryParams) {
	if (queryParams.category) {
		return new Promise((resolve, reject) => {
			con.query(bookQueries.GET_FILTERED_BOOKS_BY_CATEGORY, queryParams.category,  function (err, rows) {
				if (err) reject(err)
				resolve(rows)
			})
		})
	}
	else if (queryParams.user) {
		return new Promise((resolve, reject) => {
			con.query(bookQueries.GET_BOOK_BY_AUTHOR_ID, queryParams.user,  function (err, rows) {
				if (err) reject(err)
				resolve(rows)
			})
		})
	}
	else if (queryParams.title) {
		return new Promise((resolve, reject) => {
			con.query(bookQueries.GET_FILTERED_BOOKS_BY_TITLE, queryParams.title+'%',  function (err, rows) {
				if (err) reject(err)
				resolve(rows)
			})
		})
	}
}

/************************* USER  ********************************************/

function createUser(request) {
	return new Promise((resolve, reject) => {
		con.query(userQueries.INSERT_USER, request.body, function (err, result) {
			if (err) {
				console.log('Error at USER TABLE insert')
				throw err
			}
			resolve(result)
		})
	})
}

function getAllUsers() {
	return new Promise((resolve, reject) => {
		con.query(userQueries.GET_ALL_USERS, function (err, rows) {
			if (err) reject(err)
			resolve(rows)
		})
	})
}

function getAllUsersWithBooks() {
	return new Promise((resolve, reject) => {
		con.query(userQueries.GET_ALL_USERS_WITH_BOOKS, function (err, rows) {
			if (err) reject(err)
			resolve(rows)
		})
	})
}

function getFilteredUsers(queryParams) {
	if (queryParams.gender) {
		return new Promise((resolve, reject) => {
			con.query(userQueries.GET_FILTERED_USERS_BY_GENDER, queryParams.gender,  function (err, rows) {
				if (err) reject(err)
				resolve(rows)
			})
		})
	}
	else if (queryParams.name) {
		return new Promise((resolve, reject) => {
			con.query(userQueries.GET_FILTERED_USERS_BY_NAME, queryParams.name+'%',  function (err, rows) {
				if (err) reject(err)
				resolve(rows)
			})
		})
	}


}

function getUser(id) {
	return new Promise((resolve, reject) => {
		con.query(userQueries.GET_USER_BY_ID, id, function (err, rows) {
			if (err) reject(err)
			resolve(rows)
		})
	})
}

function updateUser(id, req) {
	return new Promise((resolve, reject) => {
		con.query(userQueries.UPDATE_USER, [{
			name : req.body.name,
			age : req.body.age
		}, id], function (err, rows) {
			if (err) reject(err)
			resolve(rows)
		})
	})
}

function deleteUser(id) {
	return new Promise(resolve => {
		con.query(userQueries.DELETE_USER, id, function (err, rows) {
			if (err) reject(err)
			resolve(rows)
		})
	})
}



function insertGender(request) {
	const {
		type
	} = request.body
	return new Promise((resolve, reject) => {
		const insertBookQuery = `INSERT INTO gender(type) VALUES ('${type}');`
		con.query(insertBookQuery, function (err, result) {
			if (err) {
				console.log('Failed to insert gender')
				throw err
			}
			resolve(result)
		})
	})
}

function insertBookType(request) {
	const {
		type
	} = request.body
	const insertBookQuery = `INSERT INTO book_type(type) VALUES ('${type}');`
	return new Promise((resolve, reject) => {
		con.query(insertBookQuery, function (err, result) {
			if (err) {
				console.log('Failed to insert book type')
				throw err
			}
			resolve(result)
		})
	})

}

function getAllCategories() {
	return new Promise((resolve, reject) => {
		con.query('SELECT id, type FROM book_type', function (err, rows) {
			if (err) reject(err)
			resolve(rows)
		})
	})
}

function getAllGender() {
	return new Promise((resolve, reject) => {
		con.query('SELECT type, id FROM gender', function (err, rows) {
			if (err) reject(err)
			resolve(rows)
		})
	})
}

function deleteGender(id) {
	return new Promise(resolve => {
		con.query('DELETE FROM gender WHERE id = ?', id, function (err, rows) {
			if (err) reject(err)
			resolve(rows)
		})
	})
}

function deleteCategory(id) {
	return new Promise(resolve => {
		con.query('DELETE FROM book_type WHERE id = ?', id, function (err, rows) {
			if (err) reject(err)
			resolve(rows)
		})
	})
}


module.exports.getAllBooks = getAllBooks;
module.exports.getAllUsers = getAllUsers;
module.exports.getAllCategories = getAllCategories;
module.exports.getAllGender = getAllGender;
module.exports.insertBookType = insertBookType;
module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.getBooksByUserId = getBooksByUserId;
module.exports.getBookById = getBookById;
module.exports.deleteUser = deleteUser;
module.exports.deleteGender = deleteGender;
module.exports.deleteCategory = deleteCategory;
module.exports.insertGender = insertGender;
module.exports.insertBook = insertBook;
module.exports.deleteBook = deleteBook;
module.exports.getUsersOtherBooks = getUsersOtherBooks;
module.exports.updateUser = updateUser;
module.exports.getFilteredUsers = getFilteredUsers;
module.exports.getFilteredBooks = getFilteredBooks
module.exports.updateBook = updateBook;
module.exports.getAllUsersWithBooks = getAllUsersWithBooks;