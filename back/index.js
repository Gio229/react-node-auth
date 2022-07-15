const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//create express app
const app = express();

//define CORS
app.use(cors());

//setup the server port
const port = process.env.PORT || 8080; //<-- api port

//setup encoding
app.use(bodyParser.urlencoded({extended: false}));

//parsing data content to json
app.use(bodyParser.json());

//root
app.get('/', (req, res) => {
    res.send("<h1>Hi you are on my backend API</h1>");
});

//----------------------------------
//import user routes
const userRoutes = require('./routes/user.route');
//define user routes
app.use("/api", userRoutes);
//----------------------------------


//server listen to the port
app.listen(port, () => {
    console.log(`The server is running at port ${port}`);
})