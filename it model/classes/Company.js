class Company {
    constructor(name, director, ...deps) {
        this.name = name;
        this.director = director;
        this.webDepartment = deps[0];
        this.mobileDepartment = deps[1];
        this.testDepartment = deps[2];
    }
}


module.exports.Company = Company;