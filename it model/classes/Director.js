const 
    { Project } = require('./Project'),
    { Employee } = require('./Employee');

class Director {
    constructor(name) {
        this.name = name;
        this.mobileProjects = [];
        this.webProjects = [];
        this.completedProjects = [];
        this.testingProjects = [];
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
        // передаем проекты на распределение веб отделу
        this.webDepartment.distributeProjects(this.webProjects);

        this.mobileDepartment.distributeProjects(this.mobileProjects);

        this.testDepartment.distributeProjects(this.testingProjects);
    }    
    // ф-ция, которая нанимает сотрудников
    hireEmployees() {
        // так как на 1 проект приходится 1 и более разработчиков
        // то нанимаем разработчиков относительно сложности проектов
        for (let inx in this.mobileProjects) {
            for (let i = 0; i < this.mobileProjects[inx].complexity; i++){
                let newWorker = new Employee('mobile development');
                this.mobileDepartment.addNewEmployee(newWorker);
            }
        }
        // прямая зависимость 1 проект = 1 разраотчик
        for (let _ in this.webProjects) {
            let newWorker = new Employee('web development');
            this.webDepartment.addNewEmployee(newWorker);
        }
        // тестировщикам на тестирование нужн все 1 день,
        // поэтому их становится очень много, следовательно
        // увольняются только они, чтобы статистика была лучше
        // напимаем тестировщиков, если проектов больше 5
        if (this.testingProjects.length > 5) {
            for (let index in this.testingProjects) {
                let newWorker = new Employee('QA development');
                this.testDepartment.addNewEmployee(newWorker);
                if (index > this.testingProjects.length/3) break;
            }
        }
    }
    // ф-ция уменьшающая дни на реализацию
    reduceDay() {
        this.webDepartment.reduceDayOfWorker();
        this.mobileDepartment.reduceDayOfWorker();
        this.testDepartment.reduceDayOfWorker();
    }
    // удалить сотрудника с самымм низким опытом
    fireWorker() {
        // удаляет сотрудника
        function fire(department, index) {
            const worker = department.freeEmployees.splice(index, 1)[0];
            worker.fired = true;
            department.firedEmployees.push(worker);
        }
        // сравнивает сотрудников
        function compareSkils(dept1, inx1, dept2, inx2) {
            if (dept1.freeEmployees[inx1].skils < dept2.freeEmployees[inx2].skils) {
                return [ dept1, inx1 ];
            } else {
                return [ dept2, inx2 ];
            }
        }

        // проверка сотрудников всех отделов
        const webInx = this.webDepartment.checkWorkers(),
            mobileInx = this.mobileDepartment.checkWorkers(),
            testInx = this.testDepartment.checkWorkers();

        // никого не увольняем
        if (webInx === -1 && mobileInx === -1 && testInx === -1) return;
        
        // если нет сотрудников на увольнение из веб отдела
        if (webInx === -1) {
            // и нет из моб. отдела
            if (mobileInx === -1) {
                // удаляем из отдела тестирования
                fire(this.testDepartment, testInx);
            } else if (testInx === -1) {
                // увольняем из мобильного
                fire(this.mobileDepartment, mobileInx);
            } else {
                //  иначе сравниваем навыки и увольняем
                const worker = compareSkils(this.mobileDepartment, mobileInx, this.testDepartment, testInx);
                fire(...worker);
            }
        }
        // и нет сотрудников на увольнение из мобильного
        else if (mobileInx === -1) {
            if (testInx === -1) {
                fire(this.webDepartment, webInx);
            } else {
                const worker = compareSkils(this.webDepartment, webInx, this.testDepartment, testInx);
                fire(...worker);
            }
        } 
        // и нет сотрудников на увольнение из отдела тестирование
        else if (testInx === -1) {
            const worker = compareSkils(this.webDepartment, webInx, this.mobileDepartment, mobileInx);
            fire(...worker);
        } 
        // иначе есть претенденты на увольнение из всех отделов
        else {
            let worker = compareSkils(this.webDepartment, webInx, this.mobileDepartment, mobileInx);
            worker = compareSkils(...worker, this.testDepartment, testInx);
            fire(...worker);
        }
    }
    // получить статистику на текущий момент
    getStatistik() {
        const firedEmployees = this.webDepartment.freeEmployees.length +
            this.mobileDepartment.firedEmployees.length + 
            this.testDepartment.firedEmployees.length;
        return {
            completedProjects: this.completedProjects.length,
            hiredEmployees: Employee.count,
            firedEmployees
        }
    }
}


module.exports.Director = Director;