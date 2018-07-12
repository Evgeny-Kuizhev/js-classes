const 
    { Director } = require('./classes/Director'),
    { Company } = require('./classes/Company'),
    { setTestingProject, distributeProjects } = require('./mobWebFuncs'),
    { setCompletedProjects, reduceDayOfWorker } = require('./testingFuncs');


const
    // создание сомпании
    steve = new Director('Steve Jobs'),
    apple = new Company('Apple', steve);

// создание отделов
apple.createDept('webDepartment', setTestingProject);
apple.createDept('mobileDepartment', setTestingProject, distributeProjects);
apple.createDept('testDepartment', setCompletedProjects, distributeProjectsFunc=null, reduceDayOfWorker );
// передача упр-ния компанией директору
steve.manage(apple);
// отделы получают доступ к проектам готовым к тестированию
apple.webDepartment.setTestingProject(steve.testingProjects);
apple.mobileDepartment.setTestingProject(steve.testingProjects);
// отдел тестирования получает доступ к завершеным проектам
apple.testDepartment.setCompletedProjects(steve.completedProjects);


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