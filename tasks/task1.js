class Answer {
    constructor(title, correct) {
        this.title = title,
        this.correct = correct;
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


const
    // создание вопросов для гит 
    answer1 = new Answer('git branch', true),
    question1 = new Question('Как создать ветку?', answer1),

    answer2 = new Answer('git add *', true),
    question2 = new Question('Как добавить файл в индекс?', answer2),

    answer3 = new Answer('git -d branch', false),
    question3 = new Question('Как удалить удаленную (на удал. репо.) ветку?', answer3),

    
    // создание вопросов для bash
    answer4 = new Answer('mkdir folder', true),
    question4 = new Question('Как создать папку?', answer4),

    answer5 = new Answer('rm folder', false),
    question5 = new Question('Как удалить папку?', answer5),


    // создание тем с вопросами
    git = new Theme('git', question1, question2, question3),
    bash = new Theme('bash', question4, question5),


    // создание курса
    newCourse = new StudyCourse('Основы гит и баш', git, bash);


// console.log(newCourse);

module.exports = {
    Answer,
    Question,
    Theme,
    StudyCourse
}
