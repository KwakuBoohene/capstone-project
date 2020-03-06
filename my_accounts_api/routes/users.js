module.exports = app =>{
const database = require("../database/db.js");

//get all the users
    app.get('/users-all', function (req, res) {
    database.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
        });
    });

    app.post('/user', function (req, res) {
    var email  = req.body.email;
    var password = req.body.password;
    console.log(email);

    database.query('SELECT fname,lname,password FROM users WHERE email=? and password = ? ',[email,password],
      function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
        });
    });


}