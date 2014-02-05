function getJsonFromUrl(url, res) {
    var http = require('http');
    http.get(url,function (result) {
        var body = '';

        result.on('data', function (chunk) {
            body += chunk;
        });
        if(body == ''){
            res.send("");
            return;
        }
        result.on('end', function () {
            res.send(JSON.stringify(JSON.parse(body)));
        });
    }).on('error', function (e) {
        res.send("");
    })
}
/**
 * Created by andrebauer on 30.01.14.
 */

exports.listXBMC = function(req, res){
    var url = 'http://192.168.1.102:4000/temps';
    getJsonFromUrl(url, res);
}
exports.listPI = function(req, res){
    var url = 'http://localhost:4000/temps';
    getJsonFromUrl(url, res);
}

