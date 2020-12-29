'use strict'

let router = require('express').Router()
let db = require('../dbParser');

router.get('/createbook', function (req, res) {
	Promise.all([db.getAllUsers(), db.getAllCategories()]).then(value => {
		res.render('book/create', {users : value[0], categories: value[1]})
	})
})

router.post('/book', (request, response) => {
	db.insertBook(request, response).then(data => {
		response.status(201).redirect('/')
	})
})

router.post('/book/delete/:id', (request, response) => {
	var id = request.params['id']
	db.deleteBook(id)
		.then(data =>  response.status(200).redirect('/'))
})

router.get('/book/:id', function (req, res) {
	var id = req.params['id']
	db.getBookById(id).then((data) => {
		const userId = data[0].author_id;
		db.getUsersOtherBooks(id, userId).then(books => {
			res.render('book/show', {book: data, books})
		})
	})
})

router.get('/books', (request, response) => {

	const queryKeys = Object.keys(request.query);
	if (queryKeys.length > 0) {
		Promise.all([db.getFilteredBooks(request.query), db.getAllBooks(), db.getAllCategories(), db.getAllUsersWithBooks()]).then((values) => {
			response.render('book/booksView', {filteredBooks: values[0], books : values[1], categories: values[2], users: values[3]})
		})
	} else {
		Promise.all([db.getAllBooks(), db.getAllCategories(), db.getAllUsersWithBooks()]).then((values) => {
			response.render('book/booksView', {books: values[0], categories : values[1], users: values[2]})
		})
	}
})

router.get('/book/update/:id', (req, res) => {
	var id = req.params['id']
	console.log(id);
	Promise.all([db.getBookById(id), db.getAllCategories()]).then((values) => {
		res.render('book/update', {book: values[0], categories : values[1]})
	})
})


router.post('/book/update/:id', (req, res) => {
	var id = req.params['id']
	db.updateBook(id, req).then(res.redirect('/book/' + id));
})



router.get('/categories', (request, response) => {
	db.getAllCategories().then((data) => {
		response.render('categories', { categories: data })
	})
})


router.post('/category', (request, response) => {
	Promise.all([db.insertBookType(request), db.getAllCategories()]).then(values => {
		response.render('categories', { categories: values[1] })
	})
})


router.get('/category/delete/:id', (request, response) => {
	var id = request.params['id']
	Promise.all([db.deleteCategory(id), db.getAllCategories()]).then(values => {
		response.render('categories', { categories: values[1] })
	})
});

module.exports = router
