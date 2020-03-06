//This file contains the database configuration and connecction

const mysql = require("mysql");

//Create the database connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "myaccounts"
});

//open the sql connection
connection.connect(error=> {
    if (error) throw error;
    console.log("Successfully connect to the database.");
});


//export the database
module.exports = connection;