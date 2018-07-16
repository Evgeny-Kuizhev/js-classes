export class Project {
    id: Number;
    daysLeftToComplete: Number;
    public static count = 0;
    constructor(public complexity) {
        this.id = Project.count++;
        this.complexity = complexity;
        this.daysLeftToComplete = complexity;
    }
}
