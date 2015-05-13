var mongoose = require('mongoose'),
      logger = require('./app/core/logger'),
      Record = mongoose.model("Record"),
    ObjectId = mongoose.Types.ObjectId;


exports.getRecords = function(req, res) {
    Record.find({}, function(err, result) {
        if (err) {
            console.log(err);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: result
            })            
        }
    });
};

exports.getSingleRecord = function(req, res) {
    Record.find({ _id: req.params.id }, function(err, result) {
        if (err) {
            console.log(err);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: result
            })            
        }
    });
};

exports.createRecord = function(req, res, next) {
    var rData = {
        title: req.params.title,
        name: req.params.name
    }

    var recordModel = new Record(rData);

    recordModel.save(function(err, recordData) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: recordData
            })
        }
    })
};

// Update the record directly using the ID
exports.updateRecordMethod1 = function(req, res, next) {
    var rData = {
        title: req.params.title,
        name: req.params.name
    }
    //var recordModel = new Record(rData);

    Record.findByIdAndUpdate(req.params.id, rData, function (err, recordData) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: recordData
            })
        }
    })
};

// First, find the record, and then update
exports.updateRecordMethod2 = function(req, res, next) {

    Record.findById(req.params.id, function(err, record) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            record.title = req.params.title;
            record.name = req.params.name;

            record.save(function(err, recordData) {
                if (err) {
                    res.status(500);
                    res.json({
                        type: false,
                        data: "Error occured: " + err
                    })
                } else {
                    res.json({
                        type: true,
                        data: recordData
                    })
                }                
            });
        }
    })

};

// Update the record directly using the ID
exports.deleteRecordMethod1 = function(req, res, next) {

    Record.find( { _id: req.params.id } , function (err, record) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            record.remove(function(err) {
                if (err) {
                    res.status(500);
                    res.json({
                        type: false,
                        data: "Error occured: " + err
                    })
                } else {
                    res.json({
                        type: true,
                        data: "Record deleted successfully"
                    })
                }                
            });
        }
    })
};

// Update the record directly using the ID
exports.deleteRecordByID = function(req, res, next) {

    Record.findByIdAndRemove( req.params.id , function (err) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: "Record deleted successfully"
            })
        }
    })
};

// Update the record directly using the ID
exports.deleteAllRecords = function(req, res, next) {

    Record.remove({}, function(err) { 
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            console.log("Records deleted successfully");
            res.json({
                type: true,
                data: "Records deleted successfully"
            })
        }
    });
};
