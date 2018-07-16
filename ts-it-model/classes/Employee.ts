export class Employee {
    id: Number;
    fired: Boolean;
    skils: Number;
    daysIdle: Number;
    currProject: any;
    public static count = 0;
    constructor(public special: String) {
        this.id = Employee.count++;
        this.fired = false;
        this.skils = 0;
        this.special = special;
        this.daysIdle = 0;
        this.currProject = null;
    }
}
