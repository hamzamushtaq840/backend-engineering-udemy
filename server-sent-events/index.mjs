import express from "express";

const app = express();
const port = process.env.PORT || 8888;

app.get("/", (req, res) => res.send("hello!"));

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  send(res);
});

let i = 0;

function send(res) {
  res.write("data: " + `hello from server ---- [${i++}]\n\n`);
  setTimeout(() => send(res), 1000);
}

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

/* Client Code 
let sse = new EventSource("http://localhost:8080/stream");
sse.onmessage = console.log
*/
