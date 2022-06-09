app.route("/api/test").get((req: Request, res: Response) => {
  const spawn = require("child_process").spawn;
  const ls = spawn("python", [__dirname + "/getPosts.py"]);
  let inData;
  ls.stdout.on("data", (chunk) => {
    inData = chunk.toString().replace("\n", "").split(",");
  });

  ls.stderr.on("data", (chunk) => {
    console.log(`stderr: ${chunk}`);
  });

  ls.on("close", (code) => {
    res.json(inData[0]); // -> ['True']
  });
});
