const 
    { WebDepartment } = require('./classes/WebDepartment'),
    { MobileDepartment } = require('./classes/MobileDepartment'),
    { TestDepartment } = require('./classes/TestDepartment'),
    { Director } = require('./classes/Director'),
    { Company } = require('./classes/Company');


const 
    // создание отделов
    webDept = new WebDepartment(),
    mobileDept = new MobileDepartment(),
    testDept = new TestDepartment(),

    // создание сомпании
    steve = new Director('Steve Jobs'),
    apple = new Company('Apple', steve, webDept, mobileDept, testDept);

// передача упр-ния компанией директору
steve.manage(apple);
// отделы получают доступ к проектам готовым к тестированию
webDept.getTestingProject(steve.testingProjects);
mobileDept.getTestingProject(steve.testingProjects);
// отдел тестирования получает доступ к завершеным проектам
testDept.getCompletedProjects(steve.completedProjects);


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