class StudyCourse {
    
    constructor() {
        this.themes = {
            git: {
                complete: false,
                questions: [{
                        'Как создать ветку?': {
                            trueAnswers: ['git branch dev', 'git checkout -b dev'],
                            wrongAnswers: ['git branch --add dev', 'git branch add dev']
                        },
                    },
                    {
                        'Как добавить файл в индекс': {
                            trueAnswers: ['git add file', 'git add .', 'git add *'],
                            wrongAnswers: ['git indexing file', 'git commit -m "file indexed"']
                        },
                    },
                    {
                        'Как удалить удаленную (на удал. репо.) ветку?': {
                            trueAnswers: ['git push origin --delete <branchName>', 'git push origin :<branchName>'],
                            wrongAnswers: ['git branch -d branch', 'git push --delete branchNema origin master']
                        },
                    },              
                ],
            },
            bash: {
                complete: false,
                questions: [
                    {
                        'Как создать папку': {
                            trueAnswers: ['mkdir folder', 'mkdir -p folder'],
                            wrongAnswers: ['makedir folder', 'createdir folder']
                        }
                    },
                    {
                        'Как удалить папку': {
                            trueAnswers: ['rmdir folder', 'rm -rf folder'],
                            wrongAnswers: ['deldir folder', 'delete folder']
                        }
                    }
                ]
            }
        }
    }
    done(theme) {
        if (Object.keys(this.themes).indexOf(theme) !== -1){
            this.themes[theme].done = true;
        } else {
            console.error('Такой темы нет!');
        }
    }
    learned() {
        const res = []
        for (let theme in this.themes) {
            if (this.themes[theme].done) res.push(theme);
        }
        return res;
    }

}

const person1 = new StudyCourse();

person1.done('git');

console.log(person1.learned());