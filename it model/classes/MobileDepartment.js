const { Department } = require('./Department');


class MobileDepartment extends Department {
    constructor() {
        super();
    }

    // set
    getTestingProject(projects) {
        this.testingProjects = projects;
    }

    distributeProjects(projects) {
        const leftProjects = [];
        // проходимся по проектам
        while (projects.length) {
            // если свободных разрабов нет выходим
            if (!this.freeEmployees.length) break;

            // отделяем проект и разработчика
            let project = projects.pop();
            // если прграммистов хватает для сложности проекта
            if (this.freeEmployees.length >= project.complexity) {
                // то назначаем проект программиста, тносительно сложности
                for (let i = 0; i < project.complexity; i++) {
                    let worker = this.freeEmployees.pop();
                    // добавляем разрабу проект и увеличиваем скил
                    worker.currProject = project;
                    worker.skils++;
                    worker.daysIdle = 0;
                    // добавляем разраба с проектом к занятым
                    this.busyEmployees.push(worker);
                }
            } else {
                // собираем не разданные проекты
                leftProjects.push(project);
            }
            
        }
        // присваиваем проектам, оставшиеся проекты
        projects.length = 0;
        projects.push(...leftProjects);
    }
}


module.exports.MobileDepartment = MobileDepartment;