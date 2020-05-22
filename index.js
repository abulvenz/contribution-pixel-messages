const GitHub = require('github-api');
const fs = require('fs');

const gh = new GitHub(
    fs.readFileSync('config.json').toJSON()
);

const repo = gh.getRepo('abulvenz/contribution-pixel-messages');

repo.listCommits({}, (err, commits) => {
    (commits.map(c => console.log(c.sha)))
})