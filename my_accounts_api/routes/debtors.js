module.exports = app =>{
const database = require("../database/db.js");

//This function handles the display of  results in JSON form

//get all the users
app.get('/debtors/:id',function (req,res){
    database.query(
    'SELECT id,name,amount,DATE_FORMAT(d_o_borrowing,"%Y-%m-%d") AS dBorrow,DATE_FORMAT(d_o_payment,"%Y-%m-%d") AS dPay,received_payment FROM debtors where user_id = ?',
    [req.params.id],
    function(error,results){
        if (error) throw error;
        res.end(JSON.stringify(results));
    })    
});

app.get('/debtors/single/:id',function (req,res){
    database.query(
    'SELECT name,amount,DATE_FORMAT(d_o_borrowing,"%Y-%m-%d") AS dBorrow,DATE_FORMAT(d_o_payment,"%Y-%m-%d") AS dPay,received_payment AS vPay FROM debtors where id = ?',
    [req.params.id],
    function(error,results){
        if (error) throw error;
        res.end(JSON.stringify(results));
    })    
});

//add all the users to the database
app.post('/debtors/add',function(req, res){
    var name = req.body.name;
    var amount = req.body.amount;
    var dBorrow = req.body.dBorrow;
    var dPay = req.body.dPay;
    var vPay = req.body.vPay;
    var userid = req.body.userid;

    database.query("INSERT INTO debtors(name,amount,d_o_borrowing,d_o_payment,received_payment,user_id) VALUES (?,?,?,?,?,?)",
    [name,amount,dBorrow,dPay,vPay,userid],function(error,results){
        if(error)throw error;
        if(!error){
            res.json({message : "The item was successfully added to the database"});
        }
    });
})

//This deletes a single expense from the database
app.post('/debtors/delete',function(req,res){
    var del = req.body.delete;

    database.query("DELETE FROM debtors WHERE id = ?",[del],function(error){
        if(error)throw error;
        if(!error){
            res.json({message : "The item was successfully deleted"});
        }

    })
})

// This updates the details of a creditor 
app.post('/debtors/update',function(req,res){
    var id = Number(req.body.id);
    var name = req.body.name;
    var amount = req.body.amount;
    var dBorrow = req.body.dBorrow;
    var dPay = req.body.dPay;
    var vPay = req.body.vPay;
    
    database.query("UPDATE debtors SET name = ?, amount = ?, d_o_borrowing = ?,d_o_payment = ?, received_payment=  ? WHERE id = ?",
    [name,amount,dBorrow,dPay,vPay,id],function(error,results){
        if(error)throw error;
        if(!error){
            res.end(JSON.stringify(results));
        }

    })
})

// This selects how much you have borrowed in a given month
app.post('/debtors/month-borrow',function(req,res){
    var id = req.body.id;

    database.query('SELECT SUM(amount) AS amount,DATE_FORMAT(d_o_borrowing,"%b") AS date,d_o_borrowing FROM creditors WHERE user_id=? GROUP BY date ORDER BY d_o_borrowing ASC',[id],function(error,results){
        if(error) throw error;
        if(!error){
            res.end(JSON.stringify(results));
        }
    })
})

app.post('/debtors/month-pay',function(req,res){
    var id = req.body.id;

    database.query('SELECT SUM(amount) AS amount,DATE_FORMAT(d_o_payment,"%b") AS date,d_o_payment FROM creditors WHERE user_id=? GROUP BY date ORDER BY d_o_payment ASC',[id],function(error,results){
        if(error) throw error;
        if(!error){
            res.end(JSON.stringify(results));
        }
    })
})
}