class Employee {
    constructor(special) {
        this.id = Employee.count++;
        this.fired = false;
        this.skils = 0;
        this.special = special;
        this.daysIdle = 0;
        this.currProject = null;
    }
}
Employee.count = 0;


module.exports.Employee = Employee;