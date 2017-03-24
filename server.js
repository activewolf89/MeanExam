var express = require('express')
 app  = express();
 path = require('path');
 var session = require('express-session');
 app.use(session({secret: 'codingdojorocks'}));
 bodyParser = require('body-parser')
 app.use(bodyParser.json());
 require("./server/config/mongoose.js")
 route_app = require("./server/config/configRoute.js")
 route_app(app)
 app.use(express.static(path.join(__dirname, './client')))
 app.listen(8000, function(){})
