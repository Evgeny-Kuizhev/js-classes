import { Department } from './Department';
import { Director } from './Director';

export class Company {
    constructor(public name: String, public director: Director) {
        this.name = name;
        this.director = director;
    }

    createDept(name, setProjectsFunc, distributeProjectsFunc=null, reduceDayFunc=null) {
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
}
