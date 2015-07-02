var Api = require('../wechat/api');

//var myopenid='o5-CDjkrJNC-_MuH_w1mBxjMQnUw';
//Api.getUser(myopenid,function(err,data){
//  
//  console.log(err);
//  console.log(data);
//
//});
//


//获取永二维码
//
//{ ticket: 'gQGd8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL01IV0dsUTdsNWdTZk5XT
//lJUVmtqAAIEx5SUVQMEAAAAAA==',
//  url: 'http://weixin.qq.com/q/MHWGlQ7l5gSfNWNRTVkj' }
  
Api.createLimitQRCode(1,function(err,data){
  console.log(err);
  console.log(data);
  if (data.ticket)
    console.log(Api.showQRCodeURL(data.ticket));
});

Welcome to Git (version 1.9.4-preview20140611)


Run 'git help git' to display the help index.
Run 'git help <command>' to display help for specific commands.

Administrator@PC-201405151126 ~
$ ls
AppData
Application Data
Contacts
Cookies
Desktop
Documents
Downloads
EurekaLog
Favorites
IntelGraphicsProfiles
Links
Local Settings
Music
My Documents
NTUSER.DAT
NTUSER.DAT{a6920b64-dbe0-11e3-8260-3c970e1ca469}.TM.blf
NTUSER.DAT{a6920b64-dbe0-11e3-8260-3c970e1ca469}.TMContainer00000000000000000001
.regtrans-ms
NTUSER.DAT{a6920b64-dbe0-11e3-8260-3c970e1ca469}.TMContainer00000000000000000002
.regtrans-ms
NetHood
Pictures
PrintHood
Recent
Saved Games
Searches
SendTo
Templates
Videos
_viminfo
ntuser.dat.LOG1
ntuser.dat.LOG2
ntuser.ini
ntuser.pol
qzhscmp_ui
regwizard.log
sanct.log
??????????????????

Administrator@PC-201405151126 ~
$ cd d:

Administrator@PC-201405151126 /d
$ cd code

Administrator@PC-201405151126 /d/code
$ cd git

Administrator@PC-201405151126 /d/code/git
$ cd signin/

Administrator@PC-201405151126 /d/code/git/signin (master)
$ ls
README.md  doc   moblie        public     test
admin      home  node_modules  service    upload
config.js  lib   package.json  signin.js  wechat

Administrator@PC-201405151126 /d/code/git/signin (master)
$ git
usage: git [--version] [--help] [-C <path>] [-c name=value]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p|--paginate|--no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]

The most commonly used git commands are:
   add        Add file contents to the index
   bisect     Find by binary search the change that introduced a bug
   branch     List, create, or delete branches
   checkout   Checkout a branch or paths to the working tree
   clone      Clone a repository into a new directory
   commit     Record changes to the repository
   diff       Show changes between commits, commit and working tree, etc
   fetch      Download objects and refs from another repository
   grep       Print lines matching a pattern
   init       Create an empty Git repository or reinitialize an existing one
   log        Show commit logs
   merge      Join two or more development histories together
   mv         Move or rename a file, a directory, or a symlink
   pull       Fetch from and integrate with another repository or a local branch

   push       Update remote refs along with associated objects
   rebase     Forward-port local commits to the updated upstream head
   reset      Reset current HEAD to the specified state
   rm         Remove files from the working tree and from the index
   show       Show various types of objects
   status     Show the working tree status
   tag        Create, list, delete or verify a tag object signed with GPG

'git help -a' and 'git help -g' lists available subcommands and some
concept guides. See 'git help <command>' or 'git help <concept>'
to read about a specific subcommand or concept.

Administrator@PC-201405151126 /d/code/git/signin (master)
$ git add -A

Administrator@PC-201405151126 /d/code/git/signin (master)
$ git commit -m "sss"
[master 507a117] sss
 3 files changed, 19 insertions(+), 4 deletions(-)
 create mode 100644 test/api.js

Administrator@PC-201405151126 /d/code/git/signin (master)
$ git push
Counting objects: 12, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (7/7), 759 bytes | 0 bytes/s, done.
Total 7 (delta 3), reused 0 (delta 0)
To git@github.com:mrlong/signin.git
   ae736af..507a117  master -> master

Administrator@PC-201405151126 /d/code/git/signin (master)
$

Administrator@PC-201405151126 /d/code/git/signin (master)
$ git add -A

Administrator@PC-201405151126 /d/code/git/signin (master)
$ git commit -m 'ss'
[master 4f3c906] ss
 1 file changed, 1 insertion(+), 1 deletion(-)

Administrator@PC-201405151126 /d/code/git/signin (master)
$ git push
Counting objects: 7, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (4/4), 342 bytes | 0 bytes/s, done.
Total 4 (delta 2), reused 0 (delta 0)
To git@github.com:mrlong/signin.git
   507a117..4f3c906  master -> master

Administrator@PC-201405151126 /d/code/git/signin (master)
$ git add -A

Administrator@PC-201405151126 /d/code/git/signin (master)
$ git commit -m 'ss'
[master efe49a5] ss
 2 files changed, 4 insertions(+), 4 deletions(-)

Administrator@PC-201405151126 /d/code/git/signin (master)
$ git push
Counting objects: 13, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (7/7), 718 bytes | 0 bytes/s, done.
Total 7 (delta 5), reused 0 (delta 0)
To git@github.com:mrlong/signin.git
   4f3c906..efe49a5  master -> master

Administrator@PC-201405151126 /d/code/git/signin (master)
$ git add -A

Administrator@PC-201405151126 /d/code/git/signin (master)
$ git commit -m 'sss'
[master a749474] sss
 2 files changed, 3 insertions(+), 2 deletions(-)

Administrator@PC-201405151126 /d/code/git/signin (master)
$ git push
Counting objects: 13, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (7/7), 573 bytes | 0 bytes/s, done.
Total 7 (delta 5), reused 0 (delta 0)
To git@github.com:mrlong/signin.git
   efe49a5..a749474  master -> master

Administrator@PC-201405151126 /d/code/git/signin (master)
$ git add -A

Administrator@PC-201405151126 /d/code/git/signin (master)
$ git commit -m 'sss'
[master 5bdd428] sss
 1 file changed, 1 insertion(+), 1 deletion(-)

Administrator@PC-201405151126 /d/code/git/signin (master)
$ git push
Counting objects: 7, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (4/4), 350 bytes | 0 bytes/s, done.
Total 4 (delta 2), reused 0 (delta 0)
To git@github.com:mrlong/signin.git
   a749474..5bdd428  master -> master

Administrator@PC-201405151126 /d/code/git/signin (master)
$ node test/
module.js:338
    throw err;
          ^
Error: Cannot find module 'd:\code\git\signin\test'
    at Function.Module._resolveFilename (module.js:336:15)
    at Function.Module._load (module.js:278:25)
    at Function.Module.runMain (module.js:501:10)
    at startup (node.js:129:16)
    at node.js:814:3

Administrator@PC-201405151126 /d/code/git/signin (master)
$ cd test/

Administrator@PC-201405151126 /d/code/git/signin/test (master)
$ ls
api.js  cvs.js  mysql.js

Administrator@PC-201405151126 /d/code/git/signin/test (master)
$ node api.js
null
{ ticket: 'gQGd8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL01IV0dsUTdsNWdTZk5XT
lJUVmtqAAIEx5SUVQMEAAAAAA==',
  url: 'http://weixin.qq.com/q/MHWGlQ7l5gSfNWNRTVkj' }

Administrator@PC-201405151126 /d/code/git/signin/test (master)
$ node api.js
null
{ ticket: 'gQGd8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL01IV0dsUTdsNWdTZk5XT
lJUVmtqAAIEx5SUVQMEAAAAAA==',
  url: 'http://weixin.qq.com/q/MHWGlQ7l5gSfNWNRTVkj' }

Administrator@PC-201405151126 /d/code/git/signin/test (master)
$ node api.js
null
{ ticket: 'gQGd8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL01IV0dsUTdsNWdTZk5XT
lJUVmtqAAIEx5SUVQMEAAAAAA==',
  url: 'http://weixin.qq.com/q/MHWGlQ7l5gSfNWNRTVkj' }

Administrator@PC-201405151126 /d/code/git/signin/test (master)
$ node api.js
null
null
d:\code\git\signin\test\api.js:22
  console.log(Api.showQRCodeURL(data.ticket));
                                    ^
TypeError: Cannot read property 'ticket' of null
    at d:\code\git\signin\test\api.js:22:37
    at d:\code\git\signin\node_modules\wechat-api\lib\util.js:18:5
    at done (d:\code\git\signin\node_modules\wechat-api\node_modules\urllib\lib\
urllib.js:346:5)
    at d:\code\git\signin\node_modules\wechat-api\node_modules\urllib\lib\urllib
.js:547:9
    at decodeContent (d:\code\git\signin\node_modules\wechat-api\node_modules\ur
llib\lib\urllib.js:407:14)
    at IncomingMessage.<anonymous> (d:\code\git\signin\node_modules\wechat-api\n
ode_modules\urllib\lib\urllib.js:513:7)
    at IncomingMessage.emit (events.js:129:20)
    at _stream_readable.js:908:16
    at process._tickCallback (node.js:355:11)

Administrator@PC-201405151126 /d/code/git/signin/test (master)
$ node api.js
null
{ ticket: 'gQGd8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL01IV0dsUTdsNWdTZk5XT
lJUVmtqAAIEx5SUVQMEAAAAAA==',
  url: 'http://weixin.qq.com/q/MHWGlQ7l5gSfNWNRTVkj' }
https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQGd8ToAAAAAAAAAASxodHRwOi8vd
2VpeGluLnFxLmNvbS9xL01IV0dsUTdsNWdTZk5XTlJUVmtqAAIEx5SUVQMEAAAAAA==

Administrator@PC-201405151126 /d/code/git/signin/test (master)
$

Administrator@PC-201405151126 /d/code/git/signin/test (master)
$