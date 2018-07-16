const { Department } = require('./Department');

function Company(name, director) {
    this.name = name;
    this.director = director;
}

Company.prototype.createDept = function(name, setProjectsFunc, distributeProjectsFunc=null, reduceDayFunc=null) {
    // cпроверка обязательных параметров
    if (name === undefined || setProjectsFunc === undefined) return null;
    // иначе создаем отдел
    this[name] = new Department();
    this[name][setProjectsFunc.name] = setProjectsFunc;
    // если переданы другие фун-ции, то назначаем их
    if (reduceDayFunc !== null) {
        this[name].reduceDayOfWorker = reduceDayFunc;
    }
    if (distributeProjectsFunc !== null) {
        this[name].distributeProjects = distributeProjectsFunc;
    }
}


module.exports.Company = Company;
