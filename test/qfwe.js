app.route('/api/test').get((req: Request, res: Response, next: any) => {

    |
    |
    |
    |
   \ /
    .

(1)     // you receive request from front-end.
(2)     // then excute your paython script/

  const spawn = require('child_process').spawn;
  const ls = spawn('python', [__dirname + '/getPosts.py']);
  let inData;

  // start listning to events for stdout. 

  ls.stdout.on('data', (chunk) => {
    inData = chunk.toString().replace('\n', '').split(',');
  });

  ls.stderr.on('data', (chunk) => {
    console.log(`stderr: ${chunk}`);
  });

  ls.on('close', (code) => {
    res.json(inData[0]); // -> ['True']

    (6) I got data here. send it as json
    (7) Huh!!! where is the connection.

  });


(3)    // your callback is waiting you to responed
(4)    // nothing happen 
(5)    // connection closed.

});




         FIX
// npm install --save express-async-handler
// of use this
const asyncUtil = fn =>
function asyncUtilWrap(...args) {
const fnReturn = fn(...args)
const next = args[args.length-1]
return Promise.resolve(fnReturn).catch(next)
}


app.route('/api/test', asyncHandler(async (req, res, next) => {
const inData = await processMydata();
res.json(inData[0])
})) 

async processMydata(){
  const spawn = require('child_process').spawn;
  const ls = spawn('python', [__dirname + '/getPosts.py']);
  const promise  =  new Promise(function(resolve, reject){
    ls.stdout.on('data', (chunk) => {
      const inData = chunk.toString().replace('\n', '').split(',');
      resolve(inData)
    });
  }) 
return await promise;;
}