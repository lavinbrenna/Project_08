const express = require('express');
const router = express.Router();
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
/*GET all books*/
router.get('/', asyncHandler(async (req,res)=>{
    const books = await Book.findAll({ order: [['title', 'ASC']]});
    res.render("index", {books})
}));

/*GET new book form */
router.get('/new',(req,res)=>{
    res.render("new-book", {book: {}, title: "New Book"});
});

/* POST new books */
router.post('/', asyncHandler(async(req,res)=>{
    let book;
    try{
        book = await Book.create(req.body);
        res.redirect("/books/" + book.id);
    }catch (error){
        if(error.name ==='SequelizeValidationError'){
         book = await Book.build();
         res.render("new-book", {book, errors: error.errors, title: "New Book"})   
        }else{
            throw error;
        }
    }
}
));

/* GET Individual Books */
router.get("/:id", asyncHandler(async(req, res)=>{
const book = await Book.findByPk(req.params.id);
if(book){
    res.render("update-book", {book, title: book.title})
}else{
    res.sendStatus(404);
}
}));

/*GET Edit book form */

router.get("/:id", asyncHandler(async(req,res)=>{
    const book = await Book.findByPk(req.params.id);
    if(book){
        res.render("update-book", {book, title: "Edit Book"});
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
