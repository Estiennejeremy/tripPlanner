function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

describe('All tests', function() {
    importTest("user", './user.js');
});