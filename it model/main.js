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
    while (count--) {
        // на следующий день директор нанимает разрабов для вчерашних проетов
        company.director.hireEmployees();
        company.director.getProjects();
        company.director.distributeProjects();
        company.director.reduceDay();
        company.director.fireWorker();
    }
    return company.director.getStatistik();
}

const days = 26;
console.log(simuleteDays(days, apple));
