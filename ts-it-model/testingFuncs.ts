export function reduceDayOfWorker() {

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
            // отправляем проект к завершенным
            this.completedProjects.push(project);
            // проект закончен, обнудляем его и
            // отправляем разработчика к незанятым
            this.busyEmployees[i].currProject = null;
            freeArr.push(this.busyEmployees[i]);
        }
    }
    // если сть свободные программисты, то добавляем их
    if (freeArr.length) {
        this.freeEmployees.push(...freeArr);
    }
    this.busyEmployees = busyArr;
}

export function setCompletedProjects(projects) {
    this.completedProjects = projects;
}
