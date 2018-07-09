const { Department } = require('./Department');


class MobileDepartment extends Department {
    constructor() {
        super();
    }
    // получаем проекты от директора
    distributeProjects(projects) {
        // проходимся по проектам
        while (projects.length) {
            // если свободных разрабов нет выходим
            if (!this.freeEmploees.length) return;

            // отделяем проект и разработчика
            let project = projects.pop(),
                worker = this.freeEmploees.pop();
            
            // добавляем разраба с проектом к занятым
            if (project === undefined) {
                console.log(project);
            }
            worker.currProject = project;
            worker.skils++;
            worker.daysIdle = 0;
            this.busyEmployees.push(worker);
        }
    }
}


module.exports.MobileDepartment = MobileDepartment;