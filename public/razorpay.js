require("dotenv").config();

const app = require('express')();
var http = require('http').Server(app);
const path = require('path');

const paymentRoute = require('./routes/paymentRoute');


app.use('/',paymentRoute);

app.get('/success', (req, res)=>{
    res.sendFile(path.join(__dirname, 'success.html'));
});



http.listen(3137, function(){
    console.log('Server is running at port 3137');
});