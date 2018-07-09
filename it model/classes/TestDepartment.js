const { Department } = require('./Department');


class TestDepartment extends Department {
    constructor() {
        super();
    }
}


module.exports.TestDepartment = TestDepartment;