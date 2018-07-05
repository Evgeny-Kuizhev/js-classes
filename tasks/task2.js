class Employee {
    constructor(special) {
        this.id = Date.now();
        this.fired = false;
        this.skils = 0;
        this.special = special;
        this.daysIdel = 0;
        this.currProject = null;
    }
}

class Department {
    constructor() {
        this.employees = [];
        this.projects = [];
    }
}

class WebDepartment extends Department {
    
}

class MobileDepartment extends Department {
    
}

class TestDepartment extends Department {
    constructor() {
        super();
    }
}

class Director {
    constructor(name) {
        this.name = name;
        this.mobileProjects = [];
        this.webProjects = [];
        // this.employees = [];
    }

    // передача управления компанией директору
    manage(company) {  
        this.company = company;
    }

    // ф-ция генерайии проектов
    getProjects() {
        // функция генерации случайного числа в промежутке
        const randint = (min, max) => Math.floor(min+Math.random()*(max-min+1));
        
        // генерация числа проектов
        const countprojects = randint(0, 4);
        if (!countprojects) return 0;
        
        // отделы которым могут быть присвоенны проекты
        const deps = ['WebDepartment', 'MobileDepartment'];

        // генерация проектов
        for (let i = 0; i < countprojects; i++) {
            let complexity =  randint(1,3),
                department = deps[randint(0,1)],
                project = {
                    'projectHas': department,
                    'complexity': complexity,
                    'daysLeft': complexity
                }
            if (department === 'WebDepartment'){
                this.webProjects.push(project)
            } else {
                this.mobileProjects.push(project)
            }
        }
    }

    // ф-ция распределения проектов по отделам
    destributeProjects() {

        function setEmployees(employees, projects, deptProjects) { 
            // если у отдела есть разработчики
            if ( [employees].lenght > 0 ) {
                // проходимся по ним
                [employees].forEach((el, inx) => {
                // ищем разработчика без проекта
                if (el.currProject === null && this[deptProjects].length > 0) {
                    // назначаем проект разработчику и добавляем проект к веб отделу проектов
                    [employees][inx].currProject = this[deptProjects].pop();
                    [projects].push([employees][inx].currProject);
                }
                }); 
            }
        }
        
        setEmployees('this.company.webDepartment.employees', 'this.company.webDepartment.projects', 'webProjects');
        setEmployees('this.company.mobileDepartment.employees', 'this.company.mobileDepartment.projects', 'mobileProjects');

        // // если у отдела есть разработчики
        // if ( this.company.webDepartment.employees.lenght > 0 ) {
        //     // проходимся по ним
        //    this.company.webDepartment.employees.forEach((el, inx, employees) => {
        //        // ищем разработчика без проекта
        //        if (el.currProject === null && this.webProjects.length > 0) {
        //            // назначаем проект разработчику и добавляем проект к веб отделу проектов
        //            employees[inx].currProject = this.webProjects.pop();
        //            this.company.webDepartment.projects.push(employees[inx].currProject);
        //        }
        //    }); 
        // }

        // if (this.company.mobileDepartment.employees.lenght > 0) {
        //     this.company.mobileDepartment.employees.forEach((el, inx, employees) => {
        //         if (el.currProject === null && this.webProjects.length > 0) {
        //             employees[inx].currProject = this.webProjects.pop();
        //            this.company.mobileDepartment.projects.push(employees[inx].currProject);
        //         }              
        //     });
        // }
        
    }

    // ф-ция, которая нанимает сотрудников
    hireEmployees() {
       
        // console.log(this.projects);



    }
}

class Company {
    constructor(name, director, ...deps) {
        this.name = name;
        this.director = director;
        this.webDepartment = deps[0];
        this.mobileDepartment = deps[1];
        this.testDepartment = deps[2];
    }
}

const 


// создание отделов
webDept = new WebDepartment(),
mobileDept = new MobileDepartment(),
testDept = new TestDepartment(),


// создание сомпании
steve = new Director('Steve Jobs'),
apple = new Company('Apple', steve, webDept, mobileDept, testDept);

steve.manage(apple);
// console.log(steve.company)


const simuleteDays = (count, company) => {
    while (count--) {
        company.director.getProjects();
        company.director.destributeProjects();
        company.director.hireEmployees();
    }
}

const days = 1;
simuleteDays(days, apple);

console.dir(apple);

// // сотрудники для web отдела
// petya = new Employee('Petya'),
// vasya = new Employee('Vasya'),
// dasha = new Employee('Dasha'),

// // сотрудники для отдела моб. разработки
// kolya = new Employee('Kolay'),
// polya = new Employee('Polya'),
// evgeny = new Employee('Evgeny'),

// // сотрудники для QA отдела
// sasha = new Employee('Sasha'),
// marina = new Employee('Marina'),