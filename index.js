const fs = require('fs');
const { spawn } = require('child_process');

const plan = JSON.parse(fs.readFileSync('plan.json')).map(str => new Date(str));

const today = (() => {
    const today_ = new Date();
    // today.setHours(0);
    today_.setMilliseconds(0);
    today_.setUTCHours(0);
    today_.setSeconds(0);
    today_.setMinutes(0);
    today_.toUTCString()
    return today_;
})();

const push_ = () => {
    const push = spawn('git', ['push']);
    push.on('exit', () => console.log('Done pushing.'));
};

const commit_ = () => {
    const commit = spawn('git', ['commit', '-m', "No"]);
    commit.on(
        'exit', push_
    );
};

const add_ = () => {
    const add = spawn('git', ['add', 'the_file.txt']);
    add.on('exit', commit_);
};

console.log(`Today is ${today.toUTCString()}`)

if (plan.some(s => s.toUTCString() === today.toUTCString())) {
    const append = spawn('bash', ['append.sh']);
    append.on('exit', add_);
} else {
    console.log('Today nothing will be committed.');
}