const GET_ALL_USERS = "SELECT u.id, u.name, age, g.type AS gender, " +
	"(SELECT COUNT(*) from book where author_id = u.id) AS nrOfBooks " +
	"FROM user u LEFT JOIN gender g ON u.gender = g.id"
const GET_USER_BY_ID = GET_ALL_USERS + " WHERE u.id = ?"
const GET_FILTERED_USERS_BY_NAME = GET_ALL_USERS + " WHERE u.name LIKE ?"
const GET_FILTERED_USERS_BY_USER = GET_ALL_USERS + " WHERE u.name = ?"
const GET_FILTERED_USERS_BY_GENDER = GET_ALL_USERS + " WHERE g.id = ?"

const DELETE_USER = "DELETE FROM user WHERE id = ?"
const INSERT_USER = "INSERT INTO user SET ?"
const UPDATE_USER = "UPDATE user SET ? WHERE id = ?"
const GET_ALL_USERS_WITH_BOOKS = "SELECT * FROM v_users_with_book"
const ORDER_BY_AGE = " ORDER BY age DESC"


module.exports.GET_ALL_USERS = GET_ALL_USERS;
module.exports.GET_USER_BY_ID = GET_USER_BY_ID;
module.exports.DELETE_USER = DELETE_USER;
module.exports.INSERT_USER = INSERT_USER;
module.exports.UPDATE_USER = UPDATE_USER;
module.exports.GET_FILTERED_USERS_BY_NAME = GET_FILTERED_USERS_BY_NAME;
module.exports.GET_FILTERED_USERS_BY_USER = GET_FILTERED_USERS_BY_USER;
module.exports.GET_FILTERED_USERS_BY_GENDER = GET_FILTERED_USERS_BY_GENDER;
module.exports.GET_ALL_USERS_WITH_BOOKS = GET_ALL_USERS_WITH_BOOKS;