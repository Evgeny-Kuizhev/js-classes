const { Department } = require('./Department');


class WebDepartment extends Department {
    constructor() {
        super();
    }
    getTestingProject(projects) {
        this.testingProjects = projects;
    }
}


module.exports.WebDepartment = WebDepartment;