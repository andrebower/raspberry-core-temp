/**
 * Created by andrebauer on 30.01.14.
 */

exports.saveCoreTemp = function (){

    var exec=require('child_process').exec;
    exec('cat /sys/class/thermal/thermal_zone0/temp',function(err,stdout){
        if(err){

            var temp=(Math.random()*100).toFixed(2);
            writeToDB(temp);

        }else{
            var temp=(parseInt(stdout)/1000).toFixed(2);
            writeToDB(temp);
        }
    });
}

exports.coreTemps = function(req, res){

    var fs = require("fs");
    var file = "test.db";
    var exists = fs.existsSync(file);

    if(!exists) {
        console.log("No DatabaseFile");
        res.send("");
        return;
    }

    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database(file);

    var jsonTemps = {values:[]};
    var time = new Date().getTime() - 1000*60*60*12;

    db.serialize(function() {
        db.all("SELECT timestamp ,temp  FROM temps WHERE timestamp > "+ time +" ORDER BY timestamp", function(err, rows) {
            rows.forEach(function (row) {
                jsonTemps.values.push([row.timestamp,row.temp]);
            });
            res.send(JSON.stringify(jsonTemps));
        });
    });
    db.close();

};


function writeToDB(temp){
    var fs = require("fs");
    var file = "test.db";
    var exists = fs.existsSync(file);

    if(!exists) {
        console.log("Creating DB file.");
        fs.openSync(file, "w");
    }

    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database(file);

    db.serialize(function() {
        if(!exists) {
            db.run("CREATE TABLE temps (timestamp DATETIME, temp NUMERIC)");
        }
        var stmt = db.prepare("INSERT INTO temps VALUES (?,?)");
        stmt.run(new Date().getTime(),temp);
        stmt.finalize();
    });
    db.close();
}