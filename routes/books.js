var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

function asyncHandler(cb){
  return async(req,res,next)=>{
      try{
          await cb(req,res,next)
      }catch(error){
          res.status(500).send(error);
      }
  }
}
/*GET all books by year ascending*/
router.get('/', asyncHandler(async (req,res)=>{
  const books = await Book.findAll({ order: [['year', 'ASC']]});
  res.render("index", {books})
}));

/*GET new book form */
router.get('/new',(req,res)=>{
  res.render("books/new-book", {book: {}});
});

/* POST new books if error, show error message*/
router.post('/new', asyncHandler(async(req,res)=>{
  let book;
  try{
      book = await Book.create(req.body);
      res.redirect("/books/");
  }catch (error){
      if(error.name ==='SequelizeValidationError'){
       book = await Book.build();
       res.render("books/form-error", {book, errors: error.errors})   
      }else{
          throw error;
      }
  }
}
));

/* GET Individual Books if book id doesn't exist, show page not found*/
router.get("/:id", asyncHandler(async(req, res)=>{
const book = await Book.findByPk(req.params.id);
if(book){
  res.render("books/update-book", {book, title: book.title})
}else{
  res.render("books/page-not-found");
}
}));

/*GET Edit book form */

router.get("/:id", asyncHandler(async(req,res)=>{
  const book = await Book.findByPk(req.params.id);
  if(book){
      res.render("books/update-book", {book, title: "Edit Book"});
  }else {
      res.sendStatus(404);
  }
}));

/*POST update book*/
router.post("/:id", asyncHandler(async (req,res)=>{
  const book = await Book.findByPk(req.params.id);
  if(book){
      await book.update(req.body);
      res.redirect("/books/" + book.id);
  }else{
      res.sendStatus(404);
  }
}));
  

/*Delete book form */
router.get("/id:/delete", asyncHandler(async (req,res)=>{
  const book = await Book.findByPk(req.params.id);
  if(book){
      await book.destroy();
      res.redirect("/books");
  }else{
      res.sendStatus(404);
  }
}));

/*Post Delete Book */
router.post('/:id/delete', asyncHandler(async(req,res)=>{
  const book = await Book.findByPk(req.params.id);
  if(book){
      await book.destroy();
      res.redirect("/books");
  }else{
      res.sendStatus(404);
  }
}));

module.exports = router;
