class Department {
    constructor() {
        this.projects = [];
        this.freeEmploees = [];
        this.busyEmployees = [];
        this.firedEmployees = [];
    }

    addNewEmployee(worker) {
        this.freeEmploees.push(worker);
    }

    reduceDayOfWorker() {
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
                // дописать код передачи на тестирование
                //
                //************************************ */
                //
                // если проект закончен, обнудляем его и
                // отправляем разработчика к незанятым
                this.busyEmployees[i].currProject = null;
                freeArr.push(this.busyEmployees[i]);
            }
        }
        // если массив не пустой, то расширяем его
        if (freeArr.length) {
            this.freeEmploees.push(...freeArr);
        } 
        this.busyEmployees = busyArr;
    }
}


module.exports.Department = Department;