# Changelog
All notable changes to this project will be documented in this file.

## [1.0.2] - 2019-12-20
### Added
- Added promise function that returns instance of Promise for jueue. [README.md](https://github.com/JosephUz/jueue#jueuepromiselist-or-jueuepromise)
- Unit test "use promise" is added. [Test File](https://github.com/JosephUz/jueue/blob/master/test/index.test.js#L342)
- Unit test "catch error by using promise" is added. [Test File](https://github.com/JosephUz/jueue/blob/master/test/index.test.js#L360)

### Changed
- Readme updated for "promise". [README.md](https://github.com/JosephUz/jueue#jueuepromiselist-or-jueuepromise)


## [1.0.1] - 2019-12-20
### Added
- Added "then" to catch called done in jueue. [README.md](https://github.com/JosephUz/jueue/blob/master/README.md#jueuethencb)
- Added "e.done" to trigger "then". [README.md](https://github.com/JosephUz/jueue/blob/master/README.md#edoneresult)
- Unit test "set done function" is added. [Test File](https://github.com/JosephUz/jueue/blob/master/test/index.test.js#L324)
- [CHANGELOG.md](https://github.com/JosephUz/jueue/blob/master/CHANGELOG.md)

### Changed
- Readme updated for "then" and "e.done". [README.md for then](https://github.com/JosephUz/jueue/blob/master/README.md#jueuethencb) [README.md for e.done](https://github.com/JosephUz/jueue/blob/master/README.md#edoneresult)
- Visual Studio launch.json for mocha debug of current test js file. [launch.json](https://github.com/JosephUz/jueue/blob/master/.vscode/launch.json)