const options = require('./libs/options');
const Jueue = require('./libs/jueue');

var exports = {};

exports.set = function (key, value) {
    if (typeof (key) == "object") {
        options.running = key.running || options.running;
        options.pauseTime = key.pauseTime || options.pauseTime;
    } else if (typeof (key) == "string") {
        options[key] = value;
    }
}

exports.get = function (list) {
    return new Jueue(list instanceof Array ? list : Array.prototype.map.call(arguments, function (item) { return item; }));
}

module.exports = exports;