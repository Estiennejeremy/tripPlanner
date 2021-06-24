function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

describe('All tests', function() {
    importTest("user", './user.js');
    importTest("travel", './travel.js');
    importTest("planning", './planning.js');
    importTest("activity", './activity.js');
});