class Question {
    constructor(title, trueAnswers, answer) {
        this.title = title;
        this.answer = {
            correct: (trueAnswers.indexOf(answer) !== -1),
        };
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
    trueAnswers = ['git branch', 'git checkout -b'],
    answer = 'git branch';
const qst1 = new Question(question, trueAnswers, answer);

question = 'Как добавить файл в индекс',
trueAnswers = ['git add file', 'git add .', 'git add *'],
answer = 'git add *';
const qst2 = new Question(question, trueAnswers, answer);

question = 'Как удалить удаленную (на удал. репо.) ветку?',
trueAnswers = ['git push origin --delete branch', 'git push origin :branch'],
answer = 'git -d branch';
const qst3 = new Question(question, trueAnswers, answer);

// создание вопросов для bash
question = 'Как создать папку?',
trueAnswers = ['mkdir folder', 'mkdir -p folder'],
answer = 'mkdir folder';
const qst4 = new Question(question, trueAnswers, answer);

question = 'Как удалить папку?',
trueAnswers = ['rmdir folder', 'rm -rf folder'],
answer = 'rm folder';
const qst5 = new Question(question, trueAnswers, answer);


// создание темы с вопросами
const git = new Theme('git', qst1, qst2, qst3),
    bash = new Theme('bash', qst4, qst5);

    
// создание курса
const newCourse = new StudyCourse('Основы гит и баш', git, bash);


console.log(newCourse);
