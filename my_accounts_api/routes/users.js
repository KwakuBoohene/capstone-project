module.exports = app =>{
const database = require("../database/db.js");

//get all the users
    app.get('/users-all', function (req, res) {

    database.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
        });
    });

//get single user by email
    app.get('/user/:email', function (req, res) {
    var email = [req.params.email];

    database.query('SELECT * FROM users WHERE email = ?',email, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
        });
    });

//Finds a user by the user's email and password
    app.post('/user-search', function (req, res) {
    var email  = req.body.email;
    var password = req.body.password;
    database.query('SELECT fname,lname,password FROM users WHERE email=? and password = ? ',[email,password],
      function (error, results, fields) {
        if (error) throw error;
        // if (results===[]){
        //     res.json({"message": "search invalid"});
        // }
        // console.log(results);
        res.end(JSON.stringify(results));
        });
    });

//

//Add user to the database
    app.post('/user-add',function(req,res){
    
    var fname = req.body.fname; var lname = req.body.lname ; var email = req.body.email ; var password = req.body.password ;

    database.query('INSERT INTO users(fname,lname,email,password) VALUES (?,?,?,?)',[fname,lname,email,password],
        function(error){
            if(error)throw error;
            if(!error){
                res.json({"message": "user successfully added to the database"});
            };

    })
})

}