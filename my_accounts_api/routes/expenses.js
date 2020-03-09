module.exports = app =>{
const database = require("../database/db.js");

//This function handles the display of  results in JSON form

//get all the users
app.get('/expenses/:id',function (req,res){
    database.query(
    'SELECT expense_name,amount,DATE_FORMAT(date_recorded,"%Y-%m-%d") AS date,expense_id FROM expenses where user_id = ?',
    [req.params.id],
    function(error,results){
        if (error) throw error;
        res.end(JSON.stringify(results));
    })    
});

//add all the users to the database
app.post('/expenses/add',function(req, res){
    var ename = req.body.ename;
    var amount = req.body.amount;
    var date = req.body.date;
    var userid = req.body.userid;

    database.query("INSERT INTO expenses(expense_name,amount,date_recorded,user_id) VALUES (?,?,?,?)",
    [ename,amount,date,userid],function(error,results){
        if(error)throw error;
        if(!error){
            res.json({message : "The item was successfully added to the database"});
        }
    });
})

//This deletes a single user from the database
app.delete('/expenses/delete',function(req,res){
    var del = req.body.delete;

    database.query("DELETE FROM expenses where expense_id = ?",[del],function(error){
        if(error)throw error;
        if(!error){
            res.json({message : "The item was successfully deleted"});
        }

    })
})

}