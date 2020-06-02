# contribution-pixel-messages
Let's have some fun with the yearly contribution display of a github user.

The result can be viewed on this [page](https://github.com/contribution-pixels).

To run it you need some cronjob running your script. On my UNIX-machine I edited the crontab using the command
```
crontab -e
```
and placed the content
```
54 0 * * * cd /src/contribution-pixel-messages/ && node index.js
```
which tells the scheduler to run the script on 00:54 each day.

It is important to have the `git` executable on the path and to have a ssh-key in place such that you do not need to enter your credentials.

At the moment `append.sh` is executed to modify the file `the_file.txt` and append a dot. This makes the assumption that we are running on a Unixoid system. It could be changed to some `fs` commands in the future to support other operating systems.

There is also a frontend that can be used to create `plan.json` suiting your needs. It can be used statically [here in this live demo](https://abulvenz.github.io/contribution-pixel-messages).

Replace the `plan.json` with the downloaded plan. You can select all the pixels on which a commit is posted to github.

To run and build it locally use 
```
parcel index.html
```
In case you do not have a global installation of [parceljs](https://parceljs.org) you can install it using:
```
npm install -g parcel-bundler
```
In this case visit https://localhost:1234 to see the pixels generator.
