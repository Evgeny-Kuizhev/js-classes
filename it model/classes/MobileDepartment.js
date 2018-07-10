const { Department } = require('./Department');


class MobileDepartment extends Department {
    constructor() {
        super();
    }

    getTestingProject(projects) {
        this.testingProjects = projects;
    }

    // получаем проекты от директора
    distributeProjects(projects) {
        const projectsId = {};
        // проходимся по проектам
        for (let inx in projects) {
            // если свободных разрабов нет выходим
            if (!this.freeEmployees.length) return;
            // проверяем хватает ли сотрудников для сложности проекта
            if (this.freeEmployees.length >= projects[inx].complexity) {
                // назначаем проект сотрудникам
                for (let i = 0; i < projects[inx].complexity; i++) {
                    const worker = this.freeEmployees.pop();
                    worker.currProject = projects[inx];
                    worker.skils++;
                    worker.daysIdle = 0;
                    // добавляем разраба с проектом к занятым
                    this.busyEmployees.push(worker);
                }
                // готовим id проектов для их удаления
                projectsId[projects[inx].id] = true;
            }
        }
        // оставляем только незанятые проекты
        projects = projects.filter(el => !projectsId.hasOwnProperty(el.id));
    }
}


module.exports.MobileDepartment = MobileDepartment;