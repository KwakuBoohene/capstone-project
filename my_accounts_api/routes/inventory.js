module.exports = app =>{
const database = require("../database/db.js");

//This function handles the display of  results in JSON form

//get all the users
app.get('/inventory/:id',function (req,res){
    database.query(
    'SELECT id,name,price,qty_in_stock FROM inventory where user_id = ?',
    [req.params.id],
    function(error,results){
        if (error) throw error;
        res.end(JSON.stringify(results));
    })    
});

app.get('/inventory/single/:id',function (req,res){
    database.query(
    'SELECT name,price,qty_in_stock FROM inventory where id = ?',
    [req.params.id],
    function(error,results){
        if (error) throw error;
        res.end(JSON.stringify(results));
    })    
});

//add all the users to the database
app.post('/inventory/add',function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var qty = req.body.qty;
    var userid = req.body.userid;

    database.query("INSERT INTO inventory(name,price,qty_in_stock,user_id) VALUES (?,?,?,?)",
    [name,price,qty,userid],function(error,results){
        if(error)throw error;
        if(!error){
            res.json({message : "The item was successfully added to the database"});
        }
    });
})

//This deletes a single user from the database
app.post('/inventory/delete',function(req,res){
    var del = req.body.delete;

    database.query("DELETE FROM inventory where id = ?",[del],function(error){
        if(error)throw error;
        if(!error){
            res.json({message : "The item was successfully deleted from inventory"});
        }

    })
})


app.post('/inventory/update',function(req,res){
    var id = Number(req.body.id);
    var name = req.body.name;
    var price = req.body.price;
    var qty = req.body.qty;

    database.query("UPDATE inventory SET name = ?, price = ?, qty_in_stock = ? WHERE id = ?",[name,price,qty,id],function(error,results){
        if(error)throw error;
        if(!error){
            res.end(JSON.stringify(results));
        }

    })
})
}