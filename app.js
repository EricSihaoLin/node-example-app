/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , os = require('os')

var environment = "DEV"


var app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.enable('trust proxy');
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home',
    serverip: req.connection.localAddress,
    serverport: req.connection.localPort,
    hostname: os.hostname(),
    env: environment
  }
  )
})

app.listen(3000)
if(process.argv[2] == "dev"){
  console.log("DEBUG Express server running on port 3000")
  environment = "DEV"
}else{
  console.log("PRODUCTION Express server running on port 3000")
  environment = "PROD"
}
