jueue
==================

For proper coding and to run sequential asynchronous function.


## Installation

```shell
$ npm install jueue
```


## Usage

```javascript
var jueue = require('jueue');

// To set jueue options.

jueue.set({
  running: true,
  pauseTime: 1000
});

// or

jueue.set("running", true);
jueue.set("pauseTime", 1000);

// No settings needed at the start. Because all settings have defaults.

// To use queue for functions.

jueue.get(
  function (e) {
    //...
    e.next();
  },
  function (e) {
    //...
    // If there is an error
    e.throw(error);
    // or complete jueue.
    e.done(); // this calls then function callback
  }
).then(function (result) {
  // Write function to manage done.
}).catch(function(err) {
  // Write function to catch error.
});

```


```javascript
var jueue = require('jueue');
jueue.get(
  function (e) {
    //...
    e.next({ name: "test", model: "test", args: [1, 2] });
  },
  function (e) {
    //...
    e.next();
  },
  function test(e, one, two) {
    var modelValue = e.model;
    //...
  }
);

```


### Methods


#### `jueue.set([options])` or `jueue.set(key, value)`

**Parameters:**

* `[options]`: Optional object containing any of the following properties:
  
  * `running`: Indicates the working status of all queues. Default value: true
  
  * `pauseTime`: Indicates the duration of next pause control. Default value: 1000

***Or***

* `key`: String key names of the above properties (running or pauseTime).

* `value`: Value of the above properties (running or pauseTime).


#### `jueue.get(list)` or `jueue.get()`

**Parameters:**

* `[list]`:  Required array of functions. For queue. 

***Or***

* `[arguments]`: list may write like arguments.


#### `jueue.promise(list)` or `jueue.promise()`
`Used to get instance of promise for jueue.`

**Parameters:**

* `[list]`:  Required array of functions. For queue. 

***Or***

* `[arguments]`: list may write like arguments.


#### `jueue.catch(ecb)`

**Parameters:**

* `ecb`:  Optional error function. Used to catch errors.


#### `jueue.then(cb)`

**Parameters:**

* `cb`:  Optional done function. Used to catch done.
  

#### `e.next([options])` or `e.next(step)` or `e.next(name)`

**Parameters:**

* `[options]`: Optional object containing any of the following properties:
  
  * `step`: The index of the function you want to go directly.

  * `name`: The name of the function you want to go directly.
  
  * `model`: The object model you want to send to the next function.
  
  * `args`: The arguments you want to send to the next function.

***Or***

* `step`: The index of the function you want to go directly. options may write like step.

***Or***

* `name`: The name of the function you want to go directly. options may write like name.


#### `e.throw(err)`

**Parameters:**

* `err`: It must be instance of Error.


#### `e.done(result)`

**Parameters:**

* `result`: Object that you want to send.


## Examples

### [Basic Usage][]

This example shows the most basic way of usage.

[Basic Usage]: https://github.com/JosephUz/jueue/tree/master/examples/basic


License
-------

This software is free to use under the JosephUz. See the [LICENSE file][] for license text and copyright information.


[LICENSE file]: https://github.com/JosephUz/jueue/blob/master/LICENSE