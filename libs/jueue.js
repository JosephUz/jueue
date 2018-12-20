const options = require('./options');

function Jueue(list) {
    var ecb = null;
    var cb = null;
    var e = {};
    var index = 0;

    Object.defineProperties(this, {
        next: {
            get: function () {
                return function (obj) {
                    e.next(obj);
                };
            }
        },
        throw: {
            get: function () {
                return ecb;
            },
            set: function (value) {
                if (typeof (value) == "function")
                    ecb = value;
            }
        },
        done: {
            get: function () {
                return cb;
            },
            set: function (value) {
                if (typeof (value) == "function")
                    cb = value;
            }
        }
    });

    Object.defineProperties(e, {
        next: {
            get: function () {
                return function (obj) {
                    function next() {
                        if (options.running) {
                            var opt = {};

                            if (typeof (obj) == "object")
                                opt = obj;
                            else if (typeof (obj) == "string")
                                opt.name = obj;
                            else if (typeof (obj) == "number")
                                opt.step = obj;

                            var step = opt.step, name = opt.name, fnmodel = opt.model, args = opt.args;

                            if (step != null)
                                index = step;
                            else if (name) {
                                index = list.map(function (fn) {
                                    return fn.name == name;
                                }).indexOf(true);
                            } else
                                index++;

                            if (list[index]) {
                                try {
                                    if (fnmodel == null)
                                        e.model = null;
                                    else
                                        e.model = fnmodel;

                                    if (args) {
                                        args.unshift(e);
                                        list[index].apply(e, args);
                                    } else
                                        list[index](e);
                                } catch (err) {
                                    e.throw(err);
                                }
                            } else
                                e.throw(new Error("No item in progress."));
                        } else {
                            setTimeout(next, options.pauseTime);
                        }
                    }
                    setTimeout(next, 0);
                }
            }
        },
        throw: {
            get: function () {
                return ecb || function () { };
            }
        },
        done: {
            get: function () {
                return cb || function () { };
            }
        }
    });

    setTimeout(function () {
        e.next({ step: 0 });
    }, 0);
}

Jueue.prototype.then = function (cb) {
    this.done = cb;
    return this;
}

Jueue.prototype.catch = function (ecb) {
    this.throw = ecb;
    return this;
}

module.exports = Jueue;