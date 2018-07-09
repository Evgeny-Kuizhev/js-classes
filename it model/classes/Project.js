class Project {
    constructor(complexity) {
        this.id = Project.count++;
        this.complexity = complexity;
        this.daysLeftToComplete = complexity;
    }
}
Project.count = 0;

module.exports.Project = Project;