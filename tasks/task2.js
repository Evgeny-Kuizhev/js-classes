class Employee {
    constructor(special) {
        this.id = Employee.count++;
        this.fired = false;
        this.skils = 0;
        this.special = special;
        this.daysIdel = 0;
        this.currProject = null;
    }
}
Employee.count = 0;

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

class Project {
    constructor(complexity) {
        this.id = Project.count++;
        this.complexity = complexity;
        this.daysLeftToComplete = complexity;
    }
}
Project.count = 0;

class Director {
    constructor(name) {
        this.name = name;
        this.mobileProjects = [];
        this.webProjects = [];
    }

    // передача управления компанией директору
    manage(company) {  
        this.webDepartment = company.webDepartment;
        this.mobileDepartment = company.mobileDepartment;
        this.testDepartment = company.testDepartment;
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
                project = new Project(complexity);
            
            if (department === 'WebDepartment'){
                this.webProjects.push(project)
            } else {
                this.mobileProjects.push(project)
            }
        }
    }


    // ф-ция распределения проектов по отделам
    distributeProjects() {
        // если у отдела есть разработчики
        if ( this.webDepartment.employees.length > 0 ) {
            // проходимся по ним
            this.webDepartment.employees.some((el, inx, employees) => {
                // если проектов нет, то выходим
                if (!this.mobileProjects.length) return true;
                
                // иначе ищем разработчика без проекта
                if (el.currProject === null) {
                    // назначаем проект разработчику и добавляем проект к веб отделу проектов
                    this.webDepartment.employees[inx].currProject = this.webProjects.pop();
                    this.webDepartment.employees[inx].skils++;
                    // может не пригодится, пока что пусть будет
                    this.webDepartment.projects.push(employees[inx].currProject);
                }
            }); 
        }

        // тоже самое для мобильного отдела***********дописать*********
        if (this.mobileDepartment.employees.length > 0) {
            this.mobileDepartment.employees.some((el, inx, employees) => {
                if (!this.mobileProjects.length) return true;
                
                if (el.currProject === null) {
                    this.mobileDepartment.employees[inx].currProject = this.mobileProjects.pop();
                    this.mobileDepartment.employees[inx].skils++;
                    
                    // может не пригодится, пока что пусть будет
                    this.mobileDepartment.projects.push(employees[inx].currProject);
                }
            });
        }
    }

    // ф-ция, которая нанимает сотрудников
    hireEmployees() {
       
        for (let index in this.mobileProjects) {
            let newWorker = new Employee('mobile development');
            this.mobileDepartment.employees.push(newWorker);
        }
        // console.log(this.company.mobileDepartment.employees);

        for (let index in this.webProjects) {
            this.webDepartment.employees.push(
                new Employee('web development')
            )
            //console.log( this.company.webDepartment.employees.lenght);
        }

        // console.log(this.company.webDepartment.employees);
        // console.log(this.company.mobileDepartment.employees);
    }

    // ф-ция уменьшающая дни на реализацию
    reduceDay() {
        
        this.mobileDepartment.employees.forEach( (el, inx) => {
            if (el.currProject !== null && el.currProject.daysLeftToComplete >= 0) {
                if (el.currProject.daysLeftToComplete === 0) {
                    // добавить код передачи проекта на тестирование
                    
                    el.currProject = null;
                    this.mobileDepartment.employees[inx].currProject = null;
                } else {
                    this.mobileDepartment.employees[inx].currProject.daysLeftToComplete--;
                }
            } else if (el.currProject === null && el.daysIdel < 3) {
                //console.log(this.mobileDepartment.employees[inx]);
                this.mobileDepartment.employees[inx].daysIdel++;
            } else if (el.daysIdel === 3) {
                this.mobileDepartment.employees[inx].fired = true;
            }
        });

        // console.log(this.webDepartment.employees);
        for (let i in this.webDepartment.employees) {
            console.log(this.webDepartment.employees[i])
            if (this.webDepartment.employees[i] !== null &&
                this.webDepartment.employees[i].currProject.daysLeftToComplete >=0) {
                    if (this.webDepartment.employees[i].currProject.daysLeftToComplete === 0) {
                        // добавить код передачи проекта на тестирование
                    
                        this.webDepartment.employees[i].currProject = null;
                    } else {
                        this.webDepartment.employees[i].currProject.daysLeftToComplete--;
                    }
                }
        }
        // this.webDepartment.employees.forEach( (el, inx) => {
        //     console.log(el.currProject);
        //     if (el.currProject !== null && el.currProject.daysLeftToComplete >= 0) {           
        //         if (el.currProject.daysLeftToComplete === 0) {
        //             // добавить код передачи проекта на тестирование
                    
        //             el.currProject = null;
        //             this.webDepartment.employees[inx].currProject = null;
        //         } else {
        //             this.webDepartment.employees[inx].currProject.daysLeftToComplete--;
        //         }
        //     } else if (el.currProject === null && el.daysIdel < 3) {
        //         this.webDepartment.employees[inx].daysIdel++;
        //     } else if (el.daysIdel === 3) {
        //         this.webDepartment.employees[inx].fired = true;
        //     }
        // });
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
    // сначала директор получает и распределяет проекты
    company.director.getProjects();
    company.director.distributeProjects();
    count--;
    while (count--) {
        // на следующий день директор нанимает разрабов для вчерашних проетов
        company.director.hireEmployees();
        company.director.getProjects();
        company.director.distributeProjects();
        company.director.reduceDay();
    }
}

const days = 5;
simuleteDays(days, apple);

console.log(apple.webDepartment.employees);
//console.log(apple.webDepartment.employees);
// console.dir(apple);
