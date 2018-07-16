import { Director } from './classes/Director';
import { Company } from './classes/Company';
import { setTestingProject, distributeProjects } from './mobWebFuncs';
import { setCompletedProjects, reduceDayOfWorker } from './testingFuncs';


const
    // создание сомпании
    steve = new Director('Steve Jobs'),
    apple = new Company('Apple', steve);

// создание отделов
const [webD, mobD, testD] = ['webDepartment', 'mobileDepartment', 'testDepartment'];
apple.createDept(webD, setTestingProject, null, null);
apple.createDept(mobD, setTestingProject, distributeProjects, null);
apple.createDept(testD, setCompletedProjects, null, reduceDayOfWorker );
// передача упр-ния компанией директору
steve.manage(apple, webD, mobD, testD);
// отделы получают доступ к проектам готовым к тестированию
apple[webD].setTestingProject(steve.testingProjects);
apple[mobD].setTestingProject(steve.testingProjects);
// отдел тестирования получает доступ к завершеным проектам
apple[testD].setCompletedProjects(steve.completedProjects);


const simuleteDays = (count, company) => {
    // сначала директор получает и распределяет проекты
    company.director.getProjects();
    count--;
    company.director.hireEmployees();
    company.director.distributeProjects();
    company.director.reduceDay();
    company.director.fireWorker();
    company.director.getProjects();
    count--;
    while (count--) {
        // на следующий день директор нанимает разрабов для вчерашних проетов
        company.director.distributeProjects();
        company.director.hireEmployees();
        company.director.getProjects();
        company.director.reduceDay();
        company.director.fireWorker();
    }
    // getAllEmployees(company);
    return company.director.getStatistik();
}

const days = 219;

console.log(simuleteDays(days, apple));


function getAllEmployees(company) {
    console.log('-----------FREE EMPLOYEES-------------');
    console.log(company.director.webDepartment.freeEmployees.length);
    console.log(company.director.mobileDepartment.freeEmployees.length);
    console.log(company.director.testDepartment.freeEmployees.length);
    console.log('-----------FIRED EMPLOYEES-------------');
    console.log(company.director.webDepartment.firedEmployees.length);
    console.log(company.director.mobileDepartment.firedEmployees.length);
    console.log(company.director.testDepartment.firedEmployees.length);
    console.log('-----------BUSY EMPLOYEES-------------');
    console.log(company.director.webDepartment.busyEmployees.length);
    console.log(company.director.mobileDepartment.busyEmployees.length);
    console.log(company.director.testDepartment.busyEmployees.length);
}