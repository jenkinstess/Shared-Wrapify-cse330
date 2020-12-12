const express = require('express');
const path = require('path');
const app2 = express();
// a test route to make sure we can reach the backend
//this would normally go in a routes file
app2.get('/test', (req, res) => {
res.send('Welcome to the backend!')
})
//Set the port that you want the server to run on
const port = process.env.PORT || 2345;
app2.listen(port);
console.log('App2 is listening on port ' + port);