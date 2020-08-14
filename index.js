const options = require('./libs/options');
const Jueue = require('./libs/jueue');

var exports = {};

exports.set = function (key, value) {
    if (typeof (key) == "object") {
        options.running = key.running || options.running;
        options.pauseTime = key.pauseTime || options.pauseTime;
        options.processTimeout = key.processTimeout || options.processTimeout;
    } else if (typeof (key) == "string") {
        options[key] = value;
    }
}

exports.get = function (list) {
    return new Jueue(list instanceof Array ? list : Array.prototype.map.call(arguments, function (item) { return item; }));
}

exports.promise = function () {
    var args = arguments;
    return new Promise(function (res, rej) {
        exports.get.apply({}, args).then(res).catch(rej);
    });
}

module.exports = exports;