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

app.get('/expenses/single/:id',function (req,res){
    database.query(
    'SELECT expense_name,amount,DATE_FORMAT(date_recorded,"%Y-%m-%d") AS date,expense_id FROM expenses where expense_id = ?',
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

//This deletes a single expense from the database
app.post('/expenses/delete',function(req,res){
    var del = req.body.delete;

    database.query("DELETE FROM expenses where expense_id = ?",[del],function(error){
        if(error)throw error;
        if(!error){
            res.json({message : "The item was successfully deleted"});
        }

    })
})

// This updates the details of an expense  
app.post('/expenses/update',function(req,res){
    var id = Number(req.body.id);
    var ename = req.body.ename;
    var amount = req.body.amount;
    var date = req.body.date;

    database.query("UPDATE expenses SET expense_name = ?, amount = ?, date_recorded = ? WHERE expense_id = ?",[ename,amount,date,id],function(error,results){
        if(error)throw error;
        if(!error){
            res.end(JSON.stringify(results));
        }

    })
})

// This selects the expense by a given month
app.post('/expenses/month',function(req,res){
    var id = req.body.id;
    var month = req.body.month;

    database.query('SELECT expense_name,amount,DATE_FORMAT(date_recorded,"%d") AS date FROM expenses WHERE user_id= ? AND MONTH(date_recorded) = ?',[id,month],function(error,results){
        if(error) throw error;
        if(!error){
            res.end(JSON.stringify(results));
        }
    })
}) 
}