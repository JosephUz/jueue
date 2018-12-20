const jueue = require('../');

describe("index.js test", function () {
    it("process by queue", function (done) {
        var tick = 0;
        function getTick() {
            return ++tick;
        }

        jueue.get(
            function (e) {
                if (getTick() !== 1) {
                    return done(new Error("start function is not working."));
                }
                e.next();
            },
            function (e) {
                if (getTick() === 2)
                    done();
                else
                    done(new Error("queue structure is not working properly."));
            }
        ).catch(function (err) {
            done(err);
        });
    });

    it("process by queue for array parameters", function (done) {
        var tick = 0;
        function getTick() {
            return ++tick;
        }

        jueue.get([
            function (e) {
                if (getTick() !== 1) {
                    return done(new Error("start function is not working."));
                }
                e.next();
            },
            function (e) {
                if (getTick() === 2)
                    done();
                else
                    done(new Error("queue structure is not working properly."));
            }
        ]).catch(function (err) {
            done(err);
        });
    });

    it("process using desired call by function name", function (done) {
        var tick = 0;
        function getTick() {
            return ++tick;
        }

        jueue.get(
            function first(e) {
                if (getTick() !== 1) {
                    return done(new Error("start function is not working."));
                }
                e.next("second");
            },
            function fourth(e) {
                if (getTick() === 4)
                    done();
                else
                    done(new Error("calling structure is not working properly."));
            },
            function third(e) {
                if (getTick() !== 3) {
                    return done(new Error("calling structure is not working properly."));
                }
                e.next({ name: "fourth" });
            },
            function second(e) {
                if (getTick() !== 2) {
                    return done(new Error("calling structure is not working properly."));
                }
                e.next(2);
            }
        ).catch(function (err) {
            done(err);
        });
    });

    it("process using desired call by step of function", function (done) {
        var tick = 0;
        function getTick() {
            return ++tick;
        }

        jueue.get(
            function first(e) {
                if (getTick() !== 1) {
                    return done(new Error("start function is not working."));
                }
                e.next({ step: 3 });
            },
            function fourth(e) {
                if (getTick() === 4)
                    done();
                else
                    done(new Error("calling structure is not working properly."));
            },
            function third(e) {
                if (getTick() !== 3) {
                    return done(new Error("calling structure is not working properly."));
                }
                e.next({ step: 1 });
            },
            function second(e) {
                if (getTick() !== 2) {
                    return done(new Error("calling structure is not working properly."));
                }
                e.next({ step: 2 });
            }
        ).catch(function (err) {
            done(err);
        });
    });

    it("process by queue using jueue variable", function (done) {
        var tick = 0;
        function getTick() {
            return ++tick;
        }

        var queue = jueue.get(
            function (e) {
                if (getTick() !== 1) {
                    return done(new Error("start function is not working."));
                }
                queue.next();
            },
            function (e) {
                if (getTick() === 2)
                    done();
                else
                    done(new Error("queue structure is not working properly."));
            }
        ).catch(function (err) {
            done(err);
        });
    });

    it("transfer data as field to next function", function (done) {
        jueue.get(
            function (e) {
                e.field = 1;
                e.next();
            },
            function (e) {
                if (e.field === 1)
                    done();
                else
                    done(new Error("transfer data is not working."));
            }
        ).catch(function (err) {
            done(err);
        });
    });

    it("transfer data as model to next function", function (done) {
        jueue.get(
            function (e) {
                e.next({ model: 1 });
            },
            function (e) {
                if (e.model === 1)
                    done();
                else
                    done(new Error("transfer data is not working."));
            }
        ).catch(function (err) {
            done(err);
        });
    });

    it("transfer data as argument to next function", function (done) {
        jueue.get(
            function (e) {
                e.next({ args: [1, 2] });
            },
            function (e, numberOne, numberTwo) {
                if (numberOne === 1 && numberTwo == 2)
                    done();
                else
                    done(new Error("transfer data is not working."));
            }
        ).catch(function (err) {
            done(err);
        });
    });

    it("error capture in queue function", function (done) {
        jueue.get(
            function (e) {
                e.next();
            },
            function () {
                throw new Error("test error");
            }
        ).catch(function (err) {
            if (err.message == "test error")
                done();
            else
                done(err);
        });
    });

    it("error capture as callback in queue function", function (done) {
        jueue.get(
            function (e) {
                e.next();
            },
            function (e) {
                setTimeout(function () {
                    e.throw(new Error("test error"));
                }, 100);
            }
        ).catch(function (err) {
            if (err.message == "test error")
                done();
            else
                done(err);
        });
    });

    it("error capture in queue function using jueue variable", function (done) {
        var queue = jueue.get(
            function (e) {
                e.next();
            },
            function (e) {
                setTimeout(function () {
                    queue.throw(new Error("test error"));
                }, 100);
            }
        ).catch(function (err) {
            if (err.message == "test error")
                done();
            else
                done(err);
        });
    });

    it("pause all queue process", function (done) {
        var tickFirst = 0, tickSecond = 0;
        var tempTickFirst, tempTickSecond;

        setTimeout(function () {
            tempTickFirst = tickFirst;
            tempTickSecond = tickSecond;

            jueue.set("running", false);

            setTimeout(function () {
                if (tempTickFirst == tickFirst && tempTickSecond == tickSecond)
                    done();
                else
                    done(new Error("pause all queue process is not working."));
            }, 100);
        }, 100);

        jueue.get(
            function recursive(e) {
                tickFirst++;
                setTimeout(function () {
                    e.next({ name: "recursive" });
                }, 10);
            },
        ).catch(function (err) {
            done(err);
        });

        jueue.get(
            function recursive(e) {
                tickSecond++;
                setTimeout(function () {
                    e.next({ name: "recursive" });
                }, 10);
            },
        ).catch(function (err) {
            done(err);
        });
    });

    it("resume queue process", function (done) {
        var tickFirst = 0;
        var tempTickFirst = 0;

        jueue.set({
            running: false,
            pauseTime: 100 //to shorten the test period
        });

        setTimeout(function () {
            tempTickFirst = 1;
            jueue.set({ running: true });
        }, 100);

        jueue.get(
            function recursive(e) {
                if (tempTickFirst == 1 && tickFirst == 0)
                    done();
                else {
                    if (tempTickFirst == 2)
                        done(new Error("pause/resume queue process is not working."));

                    tickFirst++;
                    tempTickFirst++;
                    setTimeout(function () {
                        e.next({ name: "recursive" });
                    }, 10);
                }
            },
        ).catch(function (err) {
            done(err);
        });
    });

    it("set done function", function (done) {
        jueue.get(
            function (e) {
                e.next();
            },
            function (e) {
                e.done("done");
            }
        ).then(function (value) {
            if (value == "done")
                done();
            else
                done(new Error("set done function is not working."));
        }).catch(function (err) {
            done(err);
        });
    });

    it("use promise", function (done) {
        jueue.promise(
            function (e) {
                e.next();
            },
            function (e) {
                e.done("done");
            }
        ).then(function (value) {
            if (value == "done")
                done();
            else
                done(new Error("use promise is not working."));
        }).catch(function (err) {
            done(err);
        });
    });

    it("catch error by using promise", function (done) {
        jueue.promise(
            function (e) {
                e.next();
            },
            function (e) {
                e.throw(new Error("some"));
            }
        ).then(function (value) {
            done(new Error("catch error by using promise is not working."));
        }).catch(function (err) {
            if (err.message == "some")
                done()
            else
                done(err);
        });
    });
});