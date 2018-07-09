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

steve.manage(apple);


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
}

const days = 116;
simuleteDays(days, apple);

// console.log(apple.webDepartment.firedEmployees);
// console.log(apple.mobileDepartment.firedEmployees);

console.log('END');
