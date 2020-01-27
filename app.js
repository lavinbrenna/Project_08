const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'library.db'
});

(async()=>{

    try{
        await sequelize.authenticate();
        console.log('connection to the database successful!');
    }catch (error){
        console.error('error connecting', error)

    }
})();