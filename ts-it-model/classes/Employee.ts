export class Employee {
    id: number;
    fired: boolean;
    skils: number;
    daysIdle: number;
    currProject: any;
    public static count = 0;
    constructor(public special: string) {
        this.id = Employee.count++;
        this.fired = false;
        this.skils = 0;
        this.special = special;
        this.daysIdle = 0;
        this.currProject = null;
    }
}
