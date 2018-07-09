// приватные переменные с помощью es6 weakmap
const privates = new WeakMap();

class Employee {
    constructor(special) {
        this.id = Employee.count++;
        this.fired = false;
        this.skils = 0;
        this.special = special;
        this.daysIdle = 0;
        this.currProject = null;
        privates.set(this, {
            maxDaysIdle: 3
        });
    }

    get maxDaysIdle() {
        return privates.get(this).maxDaysIdle;
    }
}
Employee.count = 0;


// console.log((new Employee('aaa').maxDaysIdle))


module.exports.Employee = Employee;