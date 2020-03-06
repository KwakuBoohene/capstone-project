module.exports = app =>{
const database = require("../database/db.js");

//get all the users
    app.get('/expenses/:user_id', function (req, res) {

    database.query('SELECT * FROM expenses where user_id = ?',[req.params.user_id],
    function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
        });
    });

    app.post('/expenses/add',function(req, res){
        var name = req.body.name;
        var amount = req.body.amount;
        var date = req.body.date;
        var userid = req.body.userid;

        database.query('INSERT (name')
    })
}
