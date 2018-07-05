const
    assert = require('assert'),
    {
        Answer,
        Question,
        Theme,
        StudyCourse
    }      = require('../tasks/task1');

describe('task1', () => {
    const ans = new Answer('npm start', true);
    describe('Answer', () => {
        it('создание объекта ответа', () => {
            assert(ans.title === 'npm start' && ans.correct === true);
        });
    });
    
    const qst = new Question('How to start project?', ans);
    describe('Question', () => {
        it('создание объекта вопроса с ответом', () => {
            assert(qst.answer === ans && qst.title === 'How to start project?');
        });
    });

    const express = new Theme('express', qst);
    describe('Theme', () => {
        it('создание объекта темы с вопросом', () => {
            assert(express.name === 'express' && express.questions[0] === qst);
        });
    });

    const newCourse = new StudyCourse('node', express);
    describe('StudyCourse', () => {
        it('создание объекта курса с темой', () => {
            assert(newCourse.title === 'node' && newCourse.themes[0] === express);
        });
    });
});