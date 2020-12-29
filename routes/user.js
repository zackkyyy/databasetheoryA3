'use strict'
let router = require('express').Router()
let db = require('../dbParser');

// signing up handling

router.get('/createuser', function (req, res) {
	db.getAllGender().then(data => {
		res.render('user/create', { genders: data })
	})
})

router.get('/users', (request, response) => {
	const queryKeys = Object.keys(request.query);
	if (queryKeys.length > 0) {
		Promise.all([db.getFilteredUsers(request.query), db.getAllUsers(), db.getAllGender()]).then((values) => {
			response.render('user/usersView', { filteredUsers: values[0], users: values[1], genders: values[2] })
		})
	} else {
		Promise.all([db.getAllUsers(), db.getAllGender()]).then((values) => {
			response.render('user/usersView', { users: values[0], genders: values[1] })
		})
	}
})


router.post('/user/delete/:id', (request, response) => {
	var id = request.params['id']
	db.deleteUser(id)
		.then(data => response.status(201).redirect('/'))
})


router.get('/user/:id', function (req, res) {
	var id = req.params['id']
	Promise.all([db.getUser(id), db.getBooksByUserId(id)]).then((values) => {
		res.render('user/show', { user: values[0], books: values[1] })
	})
})
router.post('/user', (request, response) => {
	db.createUser(request).then(data => {
		response.status(201).redirect('/')
	})
})

router.get('/user/update/:id', (req, res) => {
	var id = req.params['id']
	Promise.all([db.getUser(id), db.getAllGender()]).then((values) => {
		res.render('user/update', { user: values[0], genders: values[1] })
	})
})


router.post('/user/update/:id', (req, res) => {
	var id = req.params['id']
	Promise.all([db.updateUser(id, req), db.getBooksByUserId(id)]).then((values) => {
		res.redirect('/user/' + id)
	})
})


router.get('/gender/delete/:id', (request, response) => {
	var id = request.params['id']
	Promise.all([db.deleteGender(id), db.getAllGender()]).then(values => {
		response.render('genders', { genders: values[1] })
	})
});

router.get('/genders', (request, response) => {
	db.getAllGender().then((data) => {
		response.render('genders', { genders: data })
	})
})

router.post('/gender', (request, response) => {
    Promise.all([db.insertGender(request), db.getAllGender()]).then(values => {
        response.render('genders', { genders: values[1] })
    })
})


module.exports = router
