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
    var type = req.body.type

    database.query("INSERT INTO expenses(expense_name,amount,date_recorded,user_id,expense_type) VALUES (?,?,?,?,?)",
    [ename,amount,date,userid,type],function(error,results){
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

    database.query('SELECT SUM(amount) AS amount,DATE_FORMAT(date_recorded,"%b") AS date,date_recorded FROM expenses WHERE user_id=? GROUP BY date ORDER BY date_recorded ASC',[id],function(error,results){
        if(error) throw error;
        if(!error){
            res.end(JSON.stringify(results));
        }
    })
})

app.get('/expense-types',function(req,res){
    database.query('SELECT id,type FROM expense_type',function(error,results){
        if(error)throw error;
        if(!error){
            res.end(JSON.stringify(results))
        }
    })
})

}