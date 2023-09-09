const mysql = require('mysql2');

// Connection Pool
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// View Users
exports.view = (req, res) => {
    // User the connection
    connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
        // When done with the connection, release it
        if (!err) {
          //  let removedUser = req.query.removed;
            res.render('home', { rows });
        } else {
            console.log(err);
        }
        console.log('The data from user table: \n', rows);
    });
    
}
exports.find = (req, res) => {
    let searchterm = req.body.search
    // User the connection
    connection.query('SELECT * FROM user WHERE first_name like ? or last_name like ? or email like ?',['%'+searchterm+'%','%'+searchterm+'%','%'+searchterm+'%'], (err, rows) => {
        // When done with the connection, release it
        if (!err) {
          //  let removedUser = req.query.removed;
            res.render('home', { rows });
        } else {
            console.log(err);
        }
        console.log('The data from user table: \n', rows);
    });
    
}
exports.viewall = (req,res) => {
    connection.query('select * from user where id =?',[req.params.id],(err,rows)=>{
        if(err) throw err;
        res.render('viewuser',{rows});
    });
}
exports.deleteuser =(req,res) =>{
    connection.query('update user set status ="DELETED" where id =?',[req.params.id],(err,rows)=>{
    if(err) throw err;
    connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
        if(err) throw err;
        res.render('home',{rows,alert:'user has been marked as  DELETED'});
    });
    });
}
exports.edituser = (req,res) =>{
    connection.query('select * from user where id =?',[req.params.id],(err,rows)=>{
        if(err) throw err;
        res.render('edituser',{rows});
    });
}
exports.updateuser = (req,res)=>{
    const {first_name,last_name,email,phone,comments} = req.body;
    connection.query('update user set first_name = ?,last_name = ?,email = ?,phone = ?,comments = ? where id =?',[first_name,last_name,email,phone,comments,req.params.id],(err,rows)=>{
        connection.query('select * from user where id =?',[req.params.id],(err,rows)=>{
           
            res.render('edituser',{rows,alert:`${first_name} has been updated successfully`});
        });
    });
}
exports.adduser = (req,res) =>{
    const {first_name,last_name,email,phone,comments} = req.body;
    connection.query('insert into user set first_name =?,last_name = ?,email=?,phone=?,comments=?',[first_name,last_name,email,phone,comments],(err,rows)=>{
        if(err) throw err;
        res.render('adduser',{alert:"User added successfully"});
    });
}

exports.showform = (req,res)=>{
    res.render('adduser');
}

exports.inactive = (req, res) => {
    // User the connection
    connection.query('SELECT * FROM user WHERE status = "deleted"', (err, rows) => {
        // When done with the connection, release it
        if (!err) {
          //  let removedUser = req.query.removed;
            res.render('inactive', { rows });
        } else {
            console.log(err);
        }
        console.log('The data from user table: \n', rows);
    });
    
}

exports.activateuser = (req, res) => {
    connection.query('update user set status ="active" where id =?', [req.params.id], (err, rows) => {
        if (err) throw err;
        connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
            if (err) throw err;
            res.render('home', { rows, alert: 'user has been marked as  Active' });
        });
    });
}


exports.deleteper =(req,res) =>{
    connection.query('delete from user where id =?',[req.params.id],(err,rows)=>{
    if(err) throw err;
    connection.query('select * from user where status = "deleted"',(err,rows)=>{
        if(!err)
        res.render('inactive',{rows,alert:'user has been DELETED permanently'});
    })
        
    });
}