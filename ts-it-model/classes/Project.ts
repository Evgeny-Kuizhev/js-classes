export class Project {
    id: number;
    daysLeftToComplete: number;
    public static count = 0;
    constructor(public complexity: number) {
        this.id = Project.count++;
        this.complexity = complexity;
        this.daysLeftToComplete = complexity;
    }
}
