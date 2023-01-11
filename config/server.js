require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
const path = require('path');

const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: '',
  layoutsDir: ''
});

class Server {
  
  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8080';

    this.setTemplateEngine();

    this.middlewares();

    this.routes();
  }

  setTemplateEngine() {
    this.app.engine('.hbs', hbs.engine);

    this.app.set('view engine', 'hbs');
  }

  middlewares = () => {
    this.app.use(express.static('public'));
    this.app.use(express.json());
  
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      debug: true
    }));
  }

  routes() {
    this.app.use('/index', require('../routes/index.routes'));
    this.app.use('/upload', require('../routes/upload.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Listening on port ', this.port);
    });
  }

}

module.exports = Server;