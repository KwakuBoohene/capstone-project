module.exports = app =>{
const database = require("../database/db.js");

//This function handles the display of  results in JSON form

//get all the users
app.get('/sales/:id',function (req,res){
    database.query(
    'SELECT description,amount,quantity,DATE_FORMAT(date_recorded,"%Y-%m-%d") AS date,sale_id FROM sales where user_id = ?',
    [req.params.id],
    function(error,results){
        if (error) throw error;
        res.end(JSON.stringify(results));
    })    
});

app.get('/sales/single/:id',function (req,res){
    database.query(
    'SELECT user_id,description,amount,DATE_FORMAT(date_recorded,"%Y-%m-%d") AS date,quantity,sale_id FROM sales where sale_id = ?',
    [req.params.id],
    function(error,results){
        if (error) throw error;
        res.end(JSON.stringify(results));
    })    
});

//add all the users to the database
app.post('/sales/add',function(req, res){
    var description = req.body.description;
    var amount = req.body.amount;
    var date = req.body.date;
    var userid = req.body.userid;
    var quantity = req.body.quantity;


    database.query("INSERT INTO sales(description,amount,date_recorded,user_id,quantity) VALUES (?,?,?,?,?)",
    [description,amount,date,userid,quantity],function(error,results){
        if(error)throw error;
        if(!error){
            res.json({message : "The item was successfully added to the database"});
        }
    });
})

//This deletes a single expense from the database
app.post('/sales/delete',function(req,res){
    var del = req.body.delete;

    database.query("DELETE FROM sales where sale_id = ?",[del],function(error){
        if(error)throw error;
        if(!error){
            res.json({message : "The item was successfully deleted"});
        }

    })
})

// This updates the details of an expense  
app.post('/sales/update',function(req,res){
    var id = Number(req.body.id);
    var description = req.body.description;
    var amount = req.body.amount;
    var date = req.body.date;
    var quantity = req.body.quantity;

    database.query("UPDATE sales SET description = ?, amount = ?, date_recorded = ?,quantity = ? WHERE sale_id = ?",[description,amount,date,quantity,id],function(error,results){
        if(error)throw error;
        if(!error){
            res.end(JSON.stringify(results));
        }

    })
})

// This selects the expense by a given month
app.post('/sales/month',function(req,res){
    var id = req.body.id;

    database.query('SELECT SUM(amount) AS amount,DATE_FORMAT(date_recorded,"%b") AS date,date_recorded FROM sales WHERE user_id=? GROUP BY date ORDER BY date_recorded ASC',[id],function(error,results){
        if(error) throw error;
        if(!error){
            res.end(JSON.stringify(results));
        }
    })
})



}