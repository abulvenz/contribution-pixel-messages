// const GitHub = require('github-api');
// const fs = require('fs');

// const gh = new GitHub(
//     fs.readFileSync('config.json').toJSON()
// );

// const repo = gh.getRepo('abulvenz/contribution-pixel-messages');

// repo.listCommits({}, (err, commits) => {
//     console.log(commits[0].sha);
//     repo.commit()
// });

const { spawn } = require('child_process');
const add = spawn('git', ['add', '.']);

add.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

const i = 0;

const commit = spawn('git', ['commit', '-m', "" + i]);