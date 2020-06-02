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