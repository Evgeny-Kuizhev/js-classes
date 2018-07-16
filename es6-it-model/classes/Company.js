const { Department } = require('./Department');

class Company {
    constructor(name, director) {
        this.name = name;
        this.director = director;
    }

    createDept(name, setProjectsFunc, distributeProjectsFunc, reduceDayFunc) {
        // cпроверка обязательных параметров
        if (name === undefined || setProjectsFunc === undefined) return null;
        // иначе создаем отдел
        this[name] = new Department();
        this[name][setProjectsFunc.name] = setProjectsFunc;
        // если переданы другие фун-ции, то назначаем их
        if (!!reduceDayFunc) {
            this[name].reduceDayOfWorker = reduceDayFunc;
        }
        if (!!distributeProjectsFunc) {
            this[name].distributeProjects = distributeProjectsFunc;
        }
    }
}


module.exports.Company = Company;