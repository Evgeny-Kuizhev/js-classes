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
        const [ webProjects, mobileProjects] = [ [], [] ];

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
                webProjects.push(project)
            } else {
                mobileProjects.push(project)
            }
        }
        //this.projects.push(projects);
    }

    // ф-ция распределения проектов по отделам
    destributeProjects() {
        if ( this.company.webDepartment.employees.lenght > 0 ) {

        }
        
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

const days = 15;
simuleteDays(days, apple);

// console.dir(apple);

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