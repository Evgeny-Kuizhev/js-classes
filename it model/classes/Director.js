const 
    { Project } = require('./Project'),
    { Employee } = require('./Employee');


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
        // console.log(this.webProjects)
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

        for (let _ in this.webProjects) {
            let newWorker = new Employee('web development');
            this.webDepartment.addNewEmployee(newWorker);
        }
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
        // никого не увольняем
        if (webInx === -1 && mobileInx === -1) return;
        // увольням из мобильного отдела
        if (webInx === -1) {
            const worker = this.mobileDepartment.freeEmploees.splice(mobileInx, 1)[0];
            worker.fired = true;
            this.mobileDepartment.firedEmployees.push(worker);
        } else {
            // иначе увольняем из веб отдела
            const worker = this.webDepartment.freeEmploees.splice(webInx, 1)[0];
            worker.fired = true;
            this.webDepartment.firedEmployees.push(worker);
        }

    }
}


module.exports.Director = Director;