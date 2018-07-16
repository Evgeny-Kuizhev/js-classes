import { Project } from './Project';
import { Employee } from './Employee';
import { Department } from './Department';

export class Director {
    mobileProjects: Project[];
    webProjects: Project[];
    completedProjects: Project[];
    testingProjects: Project[];
    private webDepartment: Department;
    private mobileDepartment: Department;
    private testDepartment: Department;
    constructor(public name: String) {
        this.name = name;
        this.mobileProjects = [];
        this.webProjects = [];
        this.completedProjects = [];
        this.testingProjects = [];
    }
    // передача управления компанией директору
    manage(company, ...depts) {  
        this.webDepartment = company[depts[0]];
        this.mobileDepartment = company[depts[1]];
        this.testDepartment = company[depts[2]];
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
        // тестировщикам на тестирование нужен всего 1 день,
        // поэтому их становится очень много, следовательно
        // увольняются только они, чтобы статистика была лучше
        // напимаем тестировщиков, если проектов больше 5
        if (this.testingProjects.length > 5) {
            for (let index in this.testingProjects) {
                let newWorker = new Employee('QA development');
                this.testDepartment.addNewEmployee(newWorker);
                if (+index > this.testingProjects.length/3) break;
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

        // проверка сотрудников всех отделов
        const webInx = this.webDepartment.checkWorkers(),
            mobileInx = this.mobileDepartment.checkWorkers(),
            testInx = this.testDepartment.checkWorkers();
        // подготовка массива для сортировки
        let workers = [
            { index: webInx, dep: this.webDepartment }, 
            { index: mobileInx, dep: this.mobileDepartment },
            { index: testInx, dep: this.testDepartment }
            ];
        // оставляем только претендентов на увольнение
        workers = workers.filter(el => el.index !== -1);
        // если их нет выходим
        if (!workers.length) return;
        // если 1, то увольняем 1 
        if (workers.length === 1) {
            fire(workers[0].dep, workers[0].index);
        } else {
            // иначе выбираем самого неопытного
            workers.sort( (a, b) => {
                // задаем функцию ставнения для метода
                if (a.dep.freeEmployees[a.index].skils > b.dep.freeEmployees[b.index].skils) {
                    return 1;
                } else if (a.dep.freeEmployees[a.index].skils == b.dep.freeEmployees[b.index].skils) {
                    return 0;
                } else {
                    return -1;
                }
            });
            fire(workers[0].dep, workers[0].index);
        }
    }
    // получить статистику на текущий момент
    getStatistik() {
        const firedEmployees = this.webDepartment.firedEmployees.length +
            this.mobileDepartment.firedEmployees.length + 
            this.testDepartment.firedEmployees.length;
        return {
            completedProjects: this.completedProjects.length,
            hiredEmployees: Employee.count,
            firedEmployees
        }
    }
}
