function Department() {
    this.freeEmployees = [];
    this.busyEmployees = [];
    this.firedEmployees = [];
}

Department.prototype.addNewEmployee = function(worker) {
    this.freeEmployees.push(worker);
}
// получаем проекты от директора
Department.prototype.distributeProjects = function(projects) {
    // проходимся по проектам
    while (projects.length && this.freeEmployees.length) {
        // отделяем проект и разработчика
        let project = projects.pop(),
            worker = this.freeEmployees.pop();
        
        // добавляем разрабу проект и увеличиваем скил
        worker.currProject = project;
        worker.skils++;
        worker.daysIdle = 0;
        // добавляем разраба с проектом к занятым
        this.busyEmployees.push(worker);
    }
}

Department.prototype.reduceDayOfWorker = function() {
    let [freeArr, busyArr] = [[], []];
    // проходимся по проектами
    for (let i in this.busyEmployees) {
        let project = this.busyEmployees[i].currProject;
        // если проект еще не завершен
        if (project.daysLeftToComplete > 0) {
            project.daysLeftToComplete--;
            // оствляем только занятых программистов
            busyArr.push(this.busyEmployees[i]);
        } else {        
            // отправляем проект на тестирование
            project.daysLeftToComplete = 1;
            this.testingProjects.push(project);
            // проект закончен, обнудляем его и
            // отправляем разработчика к незанятым
            this.busyEmployees[i].currProject = null;
            freeArr.push(this.busyEmployees[i]);
        }
    }
    // если массив не пустой, то расширяем его
    if (freeArr.length) {
        this.freeEmployees.push(...freeArr);
    } 
    this.busyEmployees = busyArr;
}

Department.prototype.checkWorkers = function() {
    // максимальное кол-во дней безделия
    const maxDaysIdle = 3,
        workers = this.freeEmployees;
    let [minSkils, index] = [Infinity, -1];
    // дописать со скилами
    //********************** */
    // проходимся по сотрудникам
    for (let i in workers) {
        // если дни безделия не достигли мах, то увелич.
        if (workers[i].daysIdle < maxDaysIdle) {
            workers[i].daysIdle++;
        } else {
            // если сотрудник отдыхает более 3-х дней
            // то он возможный кандидат на увольнение
            workers[i].daysIdle++;
            // ищем разработчика с самым маленьким опытом
            if (workers[i].skils < minSkils) {
                minSkils = workers[i].skils;
                index = i;
            }
        }
    }
    // изменить ф-цию
    return index;
}


module.exports.Department = Department;
