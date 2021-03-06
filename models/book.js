// creates book model for library database table
'use strict';

const Sequelize = require('sequelize');

module.exports= (sequelize)=> {
    class Book extends Sequelize.Model{}
    Book.init({
        title:{
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
                notEmpty:{
                    msg: "Title is required"
                }
            }
        },
        author:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "Author's name is required"
                }
            }
        },
        genre: Sequelize.STRING,
        year: Sequelize.INTEGER
    }, {
        sequelize
    });
    return Book;
};