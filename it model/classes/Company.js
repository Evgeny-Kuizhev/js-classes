const { Department } = require('./Department');


class Company {
    constructor(name, director, ...deps) {
        this.name = name;
        this.director = director;
        // this.webDepartment = deps[0];
        this.mobileDepartment = deps[1];
        this.testDepartment = deps[2];
    }

    createDept(name, setProjectsFunc, reduceDayFunc, distributeProjectsFunc) {
        // cпроверка обязательных параметров
        if (name === undefined || setProjectsFunc === undefined) return null;
        // иначе создаем отдел
        this[name] = new Department();
        this[name][setProjectsFunc.name] = setProjectsFunc;
        // если переданы другие фун-ции, то назначаем их
        if (reduceDayFunc !== undefined) {
            this[name].reduceDayOfWorker = reduceDayFunc;
        }
        if (distributeProjectsFunc !== undefined) {
            this[name].distributeProjects = distributeProjectsFunc;
        }
    }
}


module.exports.Company = Company;