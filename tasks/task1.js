class Answer {
    constructor(title) {
        this.title = title,
        this.correct = true;
    }
}

class Question {
    constructor(title, answer) {
        this.title = title;
        this.answer = answer;
    }
}

class Theme {
    constructor(name, ...questions) {
        this.name = name;
        this.questions = questions;
    }
}

class StudyCourse {
    constructor(title, ...themes) {
        this.title = title;
        this.themes = themes;
    }
}

// создание вопросов для гит
let question = 'Как создать ветку?',
    answer = 'git branch';

const answ1 = new Answer(answer),
    qst1 = new Question(question, answ1);

question = 'Как добавить файл в индекс',
answer = 'git add *';
const answ2 = new Answer(answer),
    qst2 = new Question(question, answ2);

question = 'Как удалить удаленную (на удал. репо.) ветку?',
answer = 'git -d branch';
const answ3 = new Answer(answer),
    qst3 = new Question(question, answ3);

// создание вопросов для bash
question = 'Как создать папку?',
answer = 'mkdir folder';
const answ4 = new Answer(answer),
    qst4 = new Question(question, answ4);

question = 'Как удалить папку?',
answer = 'rm folder';
const answ5 = new Answer(answer),
    qst5 = new Question(question, answ5);


// создание тем с вопросами
const git = new Theme('git', qst1, qst2, qst3),
    bash = new Theme('bash', qst4, qst5);


// создание курса
const newCourse = new StudyCourse('Основы гит и баш', git, bash);


console.log(newCourse);


