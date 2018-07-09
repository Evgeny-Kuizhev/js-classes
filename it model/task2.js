const 
    { Employee } = require('./Employee'),
    { Project } = require('./Project');

class Department {
    constructor() {
        this.projects = [];
        this.freeEmploees = [];
        this.busyEmployees = [];
        this.firedEmployees = [];
    }

    addNewEmployee(worker) {
        this.freeEmploees.push(worker);
    }

    reduceDayOfWorker() {
        let [freeArr, busyArr] = [[], []];
        // проходимся по проектами
        for (let i in this.busyEmployees) {
            let project = this.busyEmployees[i].currProject;
            console.log(this.busyEmployees);
            // если проект еще не завершен
            if (project.daysLeftToComplete > 0) {
                project.daysLeftToComplete--;
                // оствляем только занятых программистов
                busyArr.push(this.busyEmployees[i]);
            } else {
                // если проект закончен
                // отправляем разработчика к незанятым
                freeArr.push(this.busyEmployees[i]);
                // дописать код передачи на тестирование
                //
                //************************************ */
                //
                project = null;
            }
        }
        this.freeEmploees.push(freeArr);
        this.busyEmployees = busyArr;
    }
}

class WebDepartment extends Department {
    constructor() {
        super();
    }

    // получаем проекты от директора
    distributeProjects(projects) {
        // проходимся по проектам
        while (!projects.length) {
            // если свободных разрабов нет выходим
            console.log(this.freeEmploees.length)
            if (!this.freeEmploees.length) return;

            // отделяем проект и разработчика
            let project = projects.pop(),
                worker = this.freeEmploees.pop();
            
            // добавляем разраба с проектом к занятым 
            console.log(project);
            worker.currProject = project;
            worker.skils++;
            worker.daysIdle = 0;
            this.busyEmployees.push(worker);
        }
    }
}

class MobileDepartment extends Department {
    constructor() {
        super();
    }

    // получаем проекты от директора
    distributeProjects(projects) {
        // проходимся по проектам
        while (!projects.length) {
            // если свободных разрабов нет выходим
            if (!this.freeEmploees.length) return;

            // отделяем проект и разработчика
            let project = projects.pop(),
                worker = this.freeEmploees.pop();
            
            // добавляем разраба с проектом к занятым 
            worker.currProject = project;
            worker.skils++;
            worker.daysIdle = 0;
            this.busyEmployees.push(worker);
        }
    }
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
    }

    // передача управления компанией директору
    manage(company) {  
        this.webDepartment = company.webDepartment;
        this.mobileDepartment = company.mobileDepartment;
        this.testDepartment = company.testDepartment;
    }

    // ф-ция генерации проектов
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
        //console.log(this.webProjects)
        // передаем проекты на распределение веб отделу
        this.webDepartment.distributeProjects(this.webProjects);


        // future functional*************************
        this.mobileDepartment.distributeProjects(this.mobileProjects);
    }

    // ф-ция, которая нанимает сотрудников
    hireEmployees() {
       
        for (let _ in this.mobileProjects) {
            let newWorker = new Employee('mobile development');
            this.mobileDepartment.addNewEmployee(newWorker);
        }
        // console.log(this.company.mobileDepartment.employees);

        for (let _ in this.webProjects) {
            let newWorker = new Employee('web development');
            this.webDepartment.addNewEmployee(newWorker);
            //console.log( this.company.webDepartment.employees.lenght);
        }

        // console.log(this.company.webDepartment.employees);
        // console.log(this.company.mobileDepartment.employees);
    }

    // ф-ция уменьшающая дни на реализацию
    reduceDay() {

        this.webDepartment.reduceDayOfWorker();
        this.mobileDepartment.reduceDayOfWorker();
    }

    fireWorker() {
        // ф-ция возвращает возможного кандидата на увольнение
        function checkWorkers(workers) {
            const maxDaysIdle = 3;
            let [minSkils, index] = [10000, -1];
            // проходимся по сотрудникам
            for (let i in workers) {
                // если дни безделия не достигли мах, то увелич.
                if (workers[i].daysIdle < maxDaysIdle) {
                    workers[i].daysIdle++;
                } else {
                    // если сотрудник отдыхает более 3-х дней
                    // то он возможный кандидат на увольнение
                    workers[i].daysIdle++;
                    // ищем разработчика с самым маленьким опытом
                    if (workers[i].skils < minSkils) {
                        minSkils = workers[i].skils;
                        index = i;
                    }
                }
            }
            return index;
        }

        // проверка сотрудников из 2-х отделов
        const webInx = checkWorkers(this.webDepartment.freeEmploees),
            mobileInx = checkWorkers(this.mobileDepartment.freeEmploees);
        // проверка индекса
        if (webInx === -1 && mobileInx === -1) return;
        // увольням з мобильного отдела
        if (webInx === -1) {
            const worker = this.mobileDepartment.freeEmploees.splice(mobileInx, 1);
            worker.fired = true;
            this.mobileDepartment.firedEmployees.push(worker);
        } else {
            // иначе из веб отдела
            const worker = this.webDepartment.freeEmploees.splice(mobileInx, 1);
            worker.fired = true;
            this.webDepartment.firedEmployees.push(worker);
        }

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
        company.director.fireWorker();
    }
}

const days = 10;
simuleteDays(days, apple);

// console.log(apple.webDepartment.employees);

let obj = {
    1: 4,
    2: 8,
    3: 2,
    8: 7
}

console.log(obj)

//console.log(apple.webDepartment.employees);
// console.dir(apple);
