var fs    = require('fs'),
 restify  = require('restify'),
 mongoose = require('mongoose'),
 logger   = require('./app/core/logger');
 config   = require('config');

// mongodb
require('./app/core/mongoose');

/* Controller scripts load */
var controllers = {},
    controllers_path = process.cwd() + '/app/controllers';
fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
});


// Restify
var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


/* URL Mapping */
server.get("/get-records", controllers.records.getRecords);
server.get("/get-record/:id", controllers.records.getSingleRecord);
server.post("/create-record", controllers.records.createRecord);
server.put('/update-record-method1/:id', controllers.records.updateRecordMethod1);
server.put('/update-record-method2/:id', controllers.records.updateRecordMethod2);
server.del('/delete-record-method1/:id', controllers.records.deleteRecordMethod1);
server.del('/delete-record-byid/:id', controllers.records.deleteRecordByID);
server.del('/delete-all-records', controllers.records.deleteAllRecords);

server.get(/^\/?.*/, restify.serveStatic({
    directory: './public/',
    default: 'index.html'
}));

/* Server start */
var serverPort = 3000; // default
if (config.server && config.server.port) {
    serverPort = config.server.port;
}
server.listen(serverPort, function (err) {
    if (err) {
        console.error(err)
    } else {
        console.log('App is ready at : ' + serverPort)
    }
});
