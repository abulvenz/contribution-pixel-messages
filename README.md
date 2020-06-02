# contribution-pixel-messages
Let's have some fun with the yearly contribution display of a github user.

The result can be viewed on this [page](https://github.com/contribution-pixels).

To run it you need some cronjob running your script. On my machine I edited the crontab using the command
```
crontab -e
```
and placed the content
```
54 0 * * * cd /src/contribution-pixel-messages/ && node index.js
```
which tells the scheduler to run the script on 00:54 each day.

There is also a frontend that can be used to create `plan.json` suiting your needs. It can be used statically [here in this live demo](https://abulvent.github.io/contribution-pixel-messages).

To run and build it locally use 
```
parcel index.html
```
In case you do not have a global installation of [parceljs](https://parceljs.org) you can install it using:
```
npm install -g parcel-bundler
```
In this case visit https://localhost:1234 to see the pixels generator.
