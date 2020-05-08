module.exports = app => {
    const database = require("../database/db.js");

// This function handles the display of results in JSON form

//get all expenses and group by expense type 
app.post('/istatement/expenses',function(req, res){
    var userid = req.body.userid;
    var year = req.body.year;

    database.query("SELECT SUM(amount) AS amount,expense_type FROM expenses WHERE user_id=? AND YEAR(date_recorded) = ? GROUP BY expense_type",
    [userid,year],function(error,results){
        if(error)throw error;
        if(!error){
            res.end(JSON.stringify(results));
        }
    });
})

//get all cost of good sold/cost of service expenses
app.post('/istatement/sales',function(req, res){
    var userid = req.body.userid;
    var year = req.body.year;

    database.query("SELECT SUM(amount) AS amount FROM sales WHERE user_id=? AND YEAR(date_recorded) = ?",
    [userid,year],function(error,results){
        if(error)throw error;
        if(!error){
            res.end(JSON.stringify(results));
        }
    });
})

}