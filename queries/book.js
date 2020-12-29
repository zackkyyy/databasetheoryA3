const GET_ALL_BOOKS = "SELECT b.id, u.name AS author, b.author_id, title, publisher, publishingYear, rating, book_type.type FROM book b Left JOIN book_type on book_type_id = book_type.id LEFT JOIN user u on u.id = b.author_id"
const GET_BOOK_BY_ID = GET_ALL_BOOKS + " WHERE b.id = ?"
const GET_BOOK_BY_AUTHOR_ID = GET_ALL_BOOKS + " WHERE b.author_id = ?"
const GET_FILTERED_BOOKS_BY_CATEGORY = GET_ALL_BOOKS + ' WHERE book_type_id = ?';
const GET_FILTERED_BOOKS_BY_TITLE = GET_ALL_BOOKS + ' WHERE b.title LIKE ? '
const GET_USERS_OTHER_BOOKS = GET_ALL_BOOKS + " WHERE b.id != ? AND b.author_id = ?"
const DELETE_BOOK = "DELETE FROM book WHERE id = ?"
const INSERT_BOOK = "INSERT INTO book SET ?"
const UPDATE_BOOK = "UPDATE book SET ? WHERE id = ?"

module.exports.GET_USERS_OTHER_BOOKS = GET_USERS_OTHER_BOOKS
module.exports.GET_BOOK_BY_AUTHOR_ID = GET_BOOK_BY_AUTHOR_ID
module.exports.INSERT_BOOK = INSERT_BOOK;
module.exports.GET_ALL_BOOKS = GET_ALL_BOOKS;
module.exports.UPDATE_BOOK = UPDATE_BOOK;
module.exports.DELETE_BOOK = DELETE_BOOK;
module.exports.GET_BOOK_BY_ID = GET_BOOK_BY_ID;
module.exports.GET_FILTERED_BOOKS_BY_CATEGORY = GET_FILTERED_BOOKS_BY_CATEGORY;
module.exports.GET_FILTERED_BOOKS_BY_TITLE = GET_FILTERED_BOOKS_BY_TITLE;