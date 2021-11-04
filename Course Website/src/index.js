const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db/index')
const methodOverride = require('method-override')
app.use(express.static(path.join(__dirname, "public")));

//http logger
const morgan = require("morgan");

app.use(methodOverride('_method'))

//template engine
app.engine(
  ".hbs", 
  handlebars({
     extname: ".hbs" ,
     helpers: {
       sum: (a,b) => a+b
     }
    }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
app.use(express.urlencoded({
  extended : true
}
))
app.use(express.json())
app.use(morgan("combined"));



//routes init
route(app)

//connect db
db.connect();

app.listen(port, () => {
  console.log(`Example app listening at http:localhost:${port}`);
});
