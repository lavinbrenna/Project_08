const createError= require('http-errors');
const express = require('express');
const path = require('path');
const sequelize=require('./models').sequelize;

const routes = require('./routes/index');
const books = require('./routes/books');

const app = express();
const port = 3000;
app.set('view engine', 'pug');

app.use(express.json());
app.use('/', routes);
app.use('/books', books);
app.use(express.static(path.join(__dirname, "public")));


// catch 404 and forward to error handler
app.use( (req, res, next) => {
    next(createError(404));
});
  
  // error handler
app.use( (err, req, res, next) => {
// set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'library' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
  


app.listen(port, ()=> console.log(`App listening on port ${port}!`));

module.exports = app;


