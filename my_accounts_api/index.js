// tutorial followed to create node api
// https://www.restapiexample.com/build-rest-api/create-rest-api-using-node-js-mysql-express/

//require all the different node modules you will 
// store the express server in the app variable

const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
// const database = require("./database/db.js");    
 
const cors = require('cors');

  



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
//test route
app.get("/",(req,res) =>{
    res.json({message: "The api is working"});
})

//the rest of the routes
const users = require("./routes/users.js")(app);
const expenses = require("./routes/expenses.js")(app);
const creditors = require("./routes/creditors.js")(app);
const debtors = require("./routes/debtors.js")(app);
const sales = require("./routes/sales.js")(app);
const income = require("./routes/income.js")(app);


//puts the requests in json form


//listening port
app.listen(5000,()=>{
    console.log("Express is working on port 5000");
});