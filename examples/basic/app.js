var jueue = require('../../');

var users = [
    { id: 1, name: "Selçuk", gender: "male" },
    { id: 2, name: "Nurhan", gener: "female" },
    { id: 3, name: "Ebru", gener: "female" },
    { id: 4, name: "Yusuf", gender: "male" },
    { id: 5, name: "Muharrem", gender: "male" },
    { id: 6, name: "Ayda", gener: "female" }
];

var couples = [
    { male: 1, female: 2 },
    { male: 5, female: 3 },
    { male: 4, female: 6 }
]

function getUser(nameOrId, cb) {
    // Bring a user by name from the database for 2 seconds.
    setTimeout(function () {
        cb(users.filter(function (item) {
            return item.name == nameOrId || item.id == nameOrId;
        })[0]);
    }, 1000);
}

function getCouple(id, cb) {
    // Bring a couple by user id from the database for 3 seconds.
    setTimeout(function () {
        cb(couples.filter(function (item) {
            return item.male == id || item.female == id;
        })[0]);
    }, 1000);
}

// Bring Yusuf's wife.
jueue.get(
    function (e) {
        getUser("Yusuf", function (user) {
            if (user) {
                e.userId = user.id;
                e.next({ name: "couple", model: e.userId, args: ["my", "love"] });
            }
        });
    },
    function couple(e, one, two) {
        var userId = e.model;
        console.log(userId == e.userId ? "yes," : "no", one, two);
        getCouple(e.userId, function (couple) {
            if (couple) {
                e.coupleId = couple.female;
                e.next();
            }
        });
    },
    function (e) {
        getUser(e.coupleId, function (user) {
            if (user) {
                console.log(user.name);
            }
        });
    }
).catch(function (err) {
    console.log(err)
});